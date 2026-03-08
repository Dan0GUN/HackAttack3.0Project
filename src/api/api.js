const API_URL = "http://127.0.0.1:8000";

export async function findFunding(data) {
  console.log("Sending request to backend:", data);

  const response = await fetch(`${API_URL}/funding`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}