"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { fetchWebSettings } from "@/services/web-settings.service";
import type { WebSettings } from "@/types";

interface WebSettingsState {
  settings: WebSettings | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const WebSettingsContext = createContext<WebSettingsState>({
  settings: null,
  loading: true,
  error: null,
  refetch: () => {},
});

export function useWebSettings(): WebSettingsState {
  return useContext(WebSettingsContext);
}

interface WebSettingsProviderProps {
  children: ReactNode;
}

export function WebSettingsProvider({ children }: WebSettingsProviderProps) {
  const [settings, setSettings] = useState<WebSettings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const id = requestId;

    fetchWebSettings().then((fetched) => {
      if (cancelled || id !== requestId) return;
      setSettings(fetched);
      setError(null);
    });

    return () => {
      cancelled = true;
    };
  }, [requestId]);

  const refetch = useCallback(() => {
    setRequestId((r) => r + 1);
  }, []);

  const value = useMemo(
    () => ({ settings, loading: settings === null, error, refetch }),
    [settings, error, refetch],
  );

  return (
    <WebSettingsContext.Provider value={value}>
      {children}
    </WebSettingsContext.Provider>
  );
}
