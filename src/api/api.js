const API_URL = "http://127.0.0.1:8000";

/*
  Sends questionnaire answers to the backend
  and returns the AI grant recommendations.
*/
export async function findFunding(data) {
  console.log("Sending request to backend:", data);

  const response = await fetch(`${API_URL}/find-funding`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Backend request failed: ${response.status} ${errorText}`);
  }

  return response.json();
}

/*
  Sends compliance request to backend.
  Backend expects: industry, location, stage, idea_description
*/
export async function searchCompliance(data) {
  console.log("Sending compliance request:", data);

  const response = await fetch(`${API_URL}/legal/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Compliance request failed: ${response.status} ${errorText}`);
  }

  return response.json();
}