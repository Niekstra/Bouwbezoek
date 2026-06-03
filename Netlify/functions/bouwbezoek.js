exports.handler = async (event) => {
  // Alleen POST toestaan
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const flowUrl = process.env.FLOW_URL;
  if (!flowUrl) {
    // FLOW_URL stellen we later in, bij de flow-stap
    return { statusCode: 503, body: "FLOW_URL nog niet ingesteld" };
  }

  try {
    const res = await fetch(flowUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: event.body, // payload onveranderd doorsturen
    });
    if (!res.ok) {
      return { statusCode: 502, body: `Flow-fout: ${res.status}` };
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: String(err) }) };
  }
};
