import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createServer } from 'node:http';
import { onRequest, reset } from '../respire.hooks.mjs';
import { options } from '../runtime.mjs';
for (const file of [...readdirSync('.').filter(f => f.endsWith('.mjs')), 'page/settings.js']) execFileSync(process.execPath, ['--check', file]);
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
assert.deepEqual(Buffer.from(pkg.magpie.icon.split(',')[1], 'base64'), readFileSync(pkg.magpie.page.icon));
for (const path of pkg.files) assert(existsSync(path), path);
for (const runtimeUrl of ['http://example.com', 'http://u:x@127.0.0.1', 'http://127.0.0.1/path']) assert.throws(() => options({ runtimeUrl }));
const id = '11111111-1111-4111-8111-111111111111';
let calls = 0;
const server = createServer(async (req, res) => {
  let body = ''; for await (const chunk of req) body += chunk;
  const r = JSON.parse(body); calls++;
  assert(r.queue_wait_ms > 0);
  const command = r.args[1];
  const envelope = { status: 'ok', summary: {}, details: command === 'recall' ? [{ id }] : { entry: { id, title: 'Example', content: 'Historical evidence', project: '' } } };
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ v: 1, id: r.id, ok: true, exit: 0, envelope }));
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
try {
  for (const protocol of ['chat', 'responses', 'anthropic', 'gemini']) {
    reset(); const ctx = { protocol, origin: 'local', session: 'check', state: {}, signal: AbortSignal.timeout(5000), options: { runtimeUrl: `http://127.0.0.1:${server.address().port}`, capture: false } };
    const body = protocol === 'gemini' ? { contents: [{ role: 'user', parts: [{ text: 'project question' }] }] } : protocol === 'responses' ? { input: 'project question' } : { messages: [{ role: 'user', content: 'project question' }] };
    const before = structuredClone(body); const result = await onRequest(body, ctx);
    assert(JSON.stringify(result).includes('Historical evidence')); assert.deepEqual(body, before);
    const count = calls; await onRequest(body, ctx); assert.equal(calls, count);
    assert.equal(await onRequest(body, { ...ctx, origin: 'gateway-key' }), undefined);
  }
} finally { await new Promise(resolve => server.close(resolve)); }
console.log('Package checks passed: protocol recall, cache, caller boundary, URL and icon assets.');
