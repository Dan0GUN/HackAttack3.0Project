import { auth } from "../firebase";

const API_URL = "http://127.0.0.1:8000";

export async function findFunding(data) {
  const user = auth.currentUser;
  const token = await user.getIdToken();

  const response = await fetch(`${API_URL}/funding/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}