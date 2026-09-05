// Cloudflare Pages Function: GET /api/health

export async function onRequestGet() {
  return new Response(
    JSON.stringify({ 
      status: 'ok', 
      platform: 'cloudflare-pages', 
      timestamp: new Date().toISOString() 
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}
