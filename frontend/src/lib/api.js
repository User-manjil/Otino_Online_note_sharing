export const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleJson(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || data.message || `HTTP ${res.status}`);
  }
  return data;
}

function buildUrl(path, params = {}) {
  const base = API_BASE || "";
  const url = new URL(path.startsWith("http") ? path : `${base}${path}`, window.location.origin);
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    url.searchParams.set(k, String(v));
  });
  return url.toString();
}

export async function apiGet(path, params = {}) {
  const res = await fetch(buildUrl(path, params), {
    method: "GET",
    headers: { ...authHeaders() },
  });
  return handleJson(res);
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE || ""}${path.startsWith("http") ? path : path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(body),
  });
  return handleJson(res);
}


