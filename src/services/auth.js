import api from "@/services/api";

export async function login(email, password) {
  const response = await api.post("/users/sign_in", {
    user: { email, password },
  });

  const authHeader = response.headers["authorization"];
  console.log("Response headers:", response.headers);
  console.log("Authorization header:", authHeader);
  let token = null;

  if (authHeader) {
    token = authHeader.replace("Bearer ", "").trim();
    console.log("Token:", token);
  }
  return {
    token,
    user: response.data?.user || null,
  };
}

export async function signup(email, password) {
  return api.post("/users", {
    user: {
      email,
      password,
      password_confirmation: password,
    },
  });
}
