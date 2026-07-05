export default async function handler(req, res) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return res.status(500).json({ error: 'Upstash credentials missing from Vercel Environment Variables.' });
  }

  const { key } = req.query;

  if (!key) {
    return res.status(400).json({ error: 'Missing key parameter.' });
  }

  // GET Request (Read Data)
  if (req.method === 'GET') {
    try {
      const response = await fetch(`${url}/get/${key}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      
      // Upstash stores JSON as a string, so we parse it back into an array/object
      let parsedValue = null;
      if (data.result) {
        try {
          parsedValue = JSON.parse(data.result);
        } catch (e) {
          parsedValue = data.result;
        }
      }
      return res.status(200).json({ data: parsedValue });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // POST Request (Save Data)
  if (req.method === 'POST') {
    try {
      const value = JSON.stringify(req.body);
      const response = await fetch(`${url}/set/${key}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: value
      });
      const data = await response.json();
      return res.status(200).json({ success: true, result: data.result });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
