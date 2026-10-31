import { useEffect, useState } from 'react';

export interface RegionOption {
  id: string;
  name: string;
  postal_code?: string | null;
}

interface RegionResponse { data?: unknown; }
interface RegionOptionsResult {
  data: RegionOption[];
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

const API_BASE = 'https://www.emsifa.com/api-wilayah-indonesia/v2';
const regionCache = new Map<string, RegionOption[]>();

/** Load one administrative level on demand; cache successful responses for this page session. */
export function useIndonesiaRegionOptions(endpoint: string | null, enabled: boolean): RegionOptionsResult {
  const [data, setData] = useState<RegionOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryIndex, setRetryIndex] = useState(0);

  useEffect(() => {
    if (!enabled || !endpoint) {
      setData([]);
      setIsLoading(false);
      setError(null);
      return;
    }
    const cached = regionCache.get(endpoint);
    if (cached) {
      setData(cached);
      setIsLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    let active = true;
    setData([]);
    setIsLoading(true);
    setError(null);

    fetch(`${API_BASE}${endpoint}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = (await response.json()) as RegionResponse;
        if (!Array.isArray(payload.data)) throw new Error('Invalid region response');
        return payload.data.filter((item): item is RegionOption => {
          if (!item || typeof item !== 'object') return false;
          const candidate = item as Partial<RegionOption>;
          return typeof candidate.id === 'string' && typeof candidate.name === 'string';
        });
      })
      .then((options) => {
        regionCache.set(endpoint, options);
        if (active) setData(options);
      })
      .catch(() => {
        if (active && !controller.signal.aborted) {
          setData([]);
          setError('Daftar wilayah belum dapat dimuat. Periksa koneksi lalu coba lagi.');
        }
      })
      .finally(() => { if (active) setIsLoading(false); });

    return () => { active = false; controller.abort(); };
  }, [endpoint, enabled, retryIndex]);

  return { data, isLoading, error, retry: () => setRetryIndex((current) => current + 1) };
}
