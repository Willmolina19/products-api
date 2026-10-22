const API_URL = "http://localhost:3000";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error en la solicitud");
  }

  return data;
}

export function getProducts() {
  return request("/products");
}

export function loginUser(credentials) {
  return request("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function createProduct(product, token) {
  return request("/products", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
}