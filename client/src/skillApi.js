
const API_BASE = "http://localhost:5000/api/skills";

function getToken() {
  return sessionStorage.getItem("skillswap_token");
}

async function request(url, options = {}) {
  const token = getToken();

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

// Get available skills
export async function getSkills(params = {}) {
  const query = new URLSearchParams(params);

  return request(`${API_BASE}?${query.toString()}`);
}

// Create a new skill
export async function createSkill(skillData) {
  return request(API_BASE, {
    method: "POST",
    body: JSON.stringify(skillData),
  });
}

// Update an existing skill
export async function updateSkill(skillId, skillData) {
  return request(`${API_BASE}/${skillId}`, {
    method: "PATCH",
    body: JSON.stringify(skillData),
  });
}

// Deactivate an existing skill
export async function deactivateSkill(skillId) {
  return request(`${API_BASE}/${skillId}/deactivate`, {
    method: "PATCH",
  });
}
