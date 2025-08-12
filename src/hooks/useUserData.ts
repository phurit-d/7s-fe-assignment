import { useCallback, useEffect, useState } from 'react';
import type { TransformedData } from '../types/user';

interface UseUserDataOptions {
  limit?: number;
  skip?: number;
  autoFetch?: boolean;
}

export function useUserData(options: UseUserDataOptions = {}) {
  const { limit = 100, skip = 0, autoFetch = true } = options;

  const [data, setData] = useState<TransformedData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/users?limit=${limit}&skip=${skip}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: TransformedData = await response.json();
      setData(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  }, [limit, skip]);

  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  return {
    data,
    loading,
    error,
    refetch,
    reset,
  };
}
