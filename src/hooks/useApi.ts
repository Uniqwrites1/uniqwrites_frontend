import { useState, useEffect, useCallback } from 'react';
import { APIError } from '../utils/errorHandler';

interface UseApiOptions<T> {
  defaultData?: T;
  dependencies?: unknown[];
  skipInitialCall?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  hasData: boolean;
}

/**
 * Custom hook for making API calls with loading and error states
 */
export function useApi<T, P extends unknown[]>(
  apiMethod: (...args: P) => Promise<T>,
  options: UseApiOptions<T> = {}
) {
  const {
    defaultData = null,
    dependencies = [],
    skipInitialCall = false,
    onSuccess,
    onError
  } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: defaultData,
    loading: !skipInitialCall,
    error: null,
    hasData: defaultData !== null
  });

  const execute = useCallback(async (...args: P) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await apiMethod(...args);
      setState({
        data: result,
        loading: false,
        error: null,
        hasData: true
      });
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (error) {
      const apiError = error instanceof Error 
        ? error 
        : new APIError('An unexpected error occurred');
        
      setState({
        data: defaultData,
        loading: false,
        error: apiError,
        hasData: defaultData !== null
      });
      
      if (onError) {
        onError(apiError);
      }
      
      throw apiError;
    }
  }, [apiMethod, onSuccess, onError, defaultData]);
  // Make the initial API call when the component mounts
  useEffect(() => {
    if (!skipInitialCall) {
      execute(...([] as unknown as P));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  return {
    ...state,
    execute,
    // Helper method to refresh data
    refresh: () => execute(...([] as unknown as P)),
  };
}

/**
 * Usage examples:
 * 
 * const { data, loading, error, refresh } = useApi(
 *   () => apiService.user.getProfile(),
 *   { 
 *     onSuccess: (data) => console.log('Profile loaded', data),
 *     onError: (error) => toast.error(error.message)
 *   }
 * );
 * 
 * // With parameters and manual execution
 * const { data, loading, error, execute } = useApi(
 *   (id: string) => apiService.teacher.getJobDetails(id),
 *   { skipInitialCall: true }
 * );
 * 
 * // Execute with parameters when needed
 * const handleViewJob = (jobId: string) => {
 *   execute(jobId);
 * };
 */
