export async function submitLead(payload) {
  const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    const error = new Error("LEAD_WEBHOOK_MISSING");
    error.code = "LEAD_WEBHOOK_MISSING";
    throw error;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = new Error("LEAD_REQUEST_FAILED");
    error.code = "LEAD_REQUEST_FAILED";
    throw error;
  }

  return response;
}
