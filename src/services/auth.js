import api from "@/services/api";

export async function login(email, password) {
  const response = await api.post("/users/sign_in", {
    user: { email, password },
  });

  const authHeader = response.headers["authorization"];

  if (authHeader) {
    const token = authHeader.replace("Bearer ", "").trim();
    localStorage.setItem("jwt", token);
    console.log("Saved JWT:", token);
  }

  return response;
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
