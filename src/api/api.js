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

export async function searchCompliance(ideaDescription) {
  console.log("Searching compliance for:", ideaDescription);

  const response = await fetch(`${API_URL}/legal_info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idea_description: ideaDescription }),
  });

  return response.json();
}

export async function saveQuestionnaireAnswers(userId, answers) {
  console.log("Saving questionnaire answers for user:", userId);

  const response = await fetch(`${API_URL}/questionnaire`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      answers: answers,
    }),
  });

  return response.json();
}

export async function getQuestionnaireStatus(userId) {
  console.log("Fetching questionnaire status for user:", userId);

  const response = await fetch(`${API_URL}/questionnaire/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}