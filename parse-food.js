export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { input } = await req.json();

  const prompt = `You are a nutrition expert. The user described food they ate.
Look up accurate nutrition info and parse it into individual items with macros.
User input: "${input}"
Respond ONLY with a JSON array. No markdown, no explanation.
Example: [{"name":"Bagel (1 medium)","cal":270,"protein":10,"carbs":53,"fat":1}]
Rules: cal/protein/carbs/fat are integers. name includes quantity. Be accurate.`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'web-search-2025-03-05',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return new Response(JSON.stringify({ error: err }), { status: 500 });
  }

  const data = await res.json();
  const textBlock = data.content?.find(b => b.type === 'text');
  const text = textBlock?.text || '[]';

  return new Response(text.replace(/```json|```/g, '').trim(), {
    headers: { 'Content-Type': 'application/json' },
  });
}
