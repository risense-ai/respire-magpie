import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, readdirSync, lstatSync, mkdirSync, copyFileSync, rmSync, existsSync, realpathSync } from 'node:fs';
import { resolve, relative, dirname, isAbsolute } from 'node:path';
import { execFileSync } from 'node:child_process';

const [sourceArg, marketArg] = process.argv.slice(2);
assert(sourceArg && marketArg, 'Usage: node scripts/sync-community.mjs <release source> <community repository>');
const source = resolve(sourceArg), target = resolve(marketArg, 'packages/respire-memory');
assert(!execFileSync('git', ['status', '--porcelain', '--', 'packages/respire-memory'], { cwd: resolve(marketArg), encoding: 'utf8' }).trim(), 'Community package must be clean before syncing');
assert(!relative(realpathSync(resolve(marketArg)), realpathSync(target)).startsWith('..'), 'Community package escapes repository');
const raw = readFileSync(resolve(target, 'package.json'), 'utf8');
const upstream = JSON.parse(readFileSync(resolve(source, 'package.json'), 'utf8'));
const community = JSON.parse(raw);
assert.equal(upstream.name, '@rsrsai/magpie');
assert.equal(community.name, '@magpie-community/gateway-respire-memory');
const version = value => {
  assert(/^\d+\.\d+\.\d+$/.test(value), 'Only stable versions can enter the community store');
  return value.split('.').map(Number);
};
const current = version(community.version), next = version(upstream.version);
const difference = next.map((part, i) => part - current[i]).find(part => part !== 0) ?? 0;
assert(difference >= 0, 'Refusing to downgrade the community package');
const owned = name => name !== 'README.md' && name !== 'docs';
const inside = (root, name) => {
  assert(typeof name === 'string' && name && !/[\\*?\[\]{}]/.test(name), 'Payload paths must be literal relative paths');
  const path = resolve(root, name), rel = relative(root, path);
  assert(rel && !isAbsolute(rel) && rel !== '..' && !rel.startsWith('../') && !rel.startsWith('..\\'), 'Payload path escapes package');
  for (let parent = dirname(path); parent !== root; parent = dirname(parent)) {
    if (existsSync(parent)) assert(!lstatSync(parent).isSymbolicLink(), 'Symlink parents require explicit review');
  }
  return path;
};
const files = upstream.files.filter(owned);
const payload = [];
const collect = name => {
  const from = inside(source, name), stat = lstatSync(from);
  assert(!stat.isSymbolicLink(), 'Symlinks require explicit review');
  if (stat.isDirectory()) {
    for (const child of readdirSync(from)) collect(name + '/' + child);
  } else {
    assert(stat.isFile(), 'Unsupported payload type');
    payload.push(name);
  }
};
for (const name of [...files, 'scripts/check.mjs', 'respire-memory.test.mjs']) collect(name);
// Replace only package-owned payloads so deleted release assets do not linger.
for (const name of new Set([...community.files.filter(owned), ...files])) {
  rmSync(inside(target, name), { recursive: true, force: true });
}
for (const name of payload) {
  const to = inside(target, name);
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(inside(source, name), to);
}
const manifest = { ...upstream, name: community.name, repository: community.repository,
  scripts: community.scripts, files: upstream.files.filter(name => name !== 'docs') };
assert(manifest.files.includes('README.md'), 'Preserve the community README in the package');
assert.equal(manifest.repository.directory, 'packages/respire-memory');
const eol = raw.includes('\r\n') ? '\r\n' : '\n';
writeFileSync(resolve(target, 'package.json'), JSON.stringify(manifest, null, 2).replace(/\n/g, eol) + eol, 'utf8');
console.log(JSON.stringify({ version: manifest.version, payloads: files.length, communityMetadataPreserved: true }));
