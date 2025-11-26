export async function callPerplexityAPI(messages: any[], disableWebSearch = false): Promise<string> {
  const apiEndpoint = '/api/completions';

  const requestBody: any = {
    model: 'sonar-pro',
    messages,
  };

  if (disableWebSearch) {
    requestBody.search_domain_filter = [];
    requestBody.web_search = false;
    requestBody.return_images = false;
    requestBody.return_related_questions = false;
  }

  const res = await fetch(apiEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `API error (${res.status})`);
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content ?? JSON.stringify(json);
}
