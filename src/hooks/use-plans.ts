"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchPublicPlans } from "@/services/plan.service";
import type { Plan } from "@/types";

interface UsePlansResult {
  plans: Plan[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePlans(): UsePlansResult {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  // Which request last settled. Anything older than `tick` is still in flight,
  // so `loading` is derived rather than set imperatively.
  const [settled, setSettled] = useState(-1);

  useEffect(() => {
    let cancelled = false;

    fetchPublicPlans().then(({ plans: fetched, error: err }) => {
      if (cancelled) return;
      setPlans(err ? [] : fetched);
      setError(err);
      setSettled(tick);
    });

    return () => {
      cancelled = true;
    };
  }, [tick]);

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  return { plans, loading: settled !== tick, error, refetch };
}
