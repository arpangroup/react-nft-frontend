import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import apiClient from './apiClient';

export function useApiClient() {
  const { token } = useContext(AuthContext);

  // Inject Bearer token if available
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  return {
    get: (endpoint) => apiClient.get(endpoint, authHeaders),
    post: (endpoint, body) => apiClient.post(endpoint, body, authHeaders),
    put: (endpoint, body) => apiClient.put(endpoint, body, authHeaders),
    delete: (endpoint) => apiClient.delete(endpoint, authHeaders),
    patch: (endpoint, body) => apiClient.patch(endpoint, body, authHeaders),
  };
}
