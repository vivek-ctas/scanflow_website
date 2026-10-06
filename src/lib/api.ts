/**
 * Central API configuration for the marketing site.
 *
 * Only public endpoints are called from the browser (plan list, country list,
 * guest lead), so no auth token is attached. Set NEXT_PUBLIC_API_BASE_URL in
 * .env.local to point at a running scanFlow_api; the default matches the
 * API's own local port.
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

/** Thrown for non-2xx responses so callers can surface `message` directly. */
export class ApiRequestError extends Error {}

export async function apiFetch<T = unknown>(
  path: string,
  options?: RequestInit,
): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        data: null,
        error: json?.message || `Request failed with status ${res.status}`,
      };
    }
    return { data: json as T, error: null };
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Network error. Please check your connection and try again.";
    return { data: null, error: message };
  }
}

/** Standard envelope every scanFlow_api response uses. */
export interface ApiEnvelope<T> {
  status: number;
  message: string;
  data: T;
}
