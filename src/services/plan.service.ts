import { apiFetch } from "@/lib/api";
import type {
  CountriesApiResponse,
  CountryOption,
  Plan,
  PublicPlansApiResponse,
} from "@/types";

/**
 * Fetches the active, self-serve plans rendered on the pricing page.
 * Public — no auth required.
 * Endpoint: GET /plans/public/plans
 * Response shape: { data: { plans: [...] } }
 */
export async function fetchPublicPlans(): Promise<{
  plans: Plan[];
  error: string | null;
}> {
  const { data, error } = await apiFetch<PublicPlansApiResponse>(
    "/plans/public/plans",
  );
  if (error || !data) {
    return { plans: [], error: error ?? "Could not load pricing plans." };
  }
  return { plans: data.data?.plans ?? [], error: null };
}

/**
 * Fetches the country list for the checkout form dropdown.
 * Public — no auth required.
 * Endpoint: GET /countries (paginated, 250 per page)
 */
export async function fetchCountries(): Promise<{
  countries: CountryOption[];
  error: string | null;
}> {
  const { data, error } = await apiFetch<CountriesApiResponse>(
    "/countries?limit=250&sort_by=country_name:asc",
  );
  if (error || !data) {
    return { countries: [], error: error ?? "Could not load countries." };
  }
  return { countries: data.data?.results ?? [], error: null };
}
