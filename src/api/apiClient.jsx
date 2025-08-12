
import { mockResponses } from "../mocks/mockResponses";
import { findMockResponse } from "../mocks/findMockResponse";

const isMockMode = false; // or from env config

class ApiClient {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
  }

  async _mockResponse(method, endpoint, body = null) {
    // Separate path and query
    const [baseUrl, queryString] = endpoint.split("?");
    const queryParams = new URLSearchParams(queryString || "");

    console.log(`[MOCK] ${method}: ${endpoint}`, body);

    let key = endpoint;
    if (method !== "GET") {
      key = `${baseUrl}|${method}`;
    }

    let handler = mockResponses[key];
    let params = {};

    if (!handler) {
      // Try dynamic pattern match
      const match = findMockResponse(baseUrl, mockResponses, method);
      if (match) {
        handler = match.handler;
        params = match.params;
      }
    }

    if (typeof handler === "function") {
      // For GET: pass queryParams; for others: pass body + params
      if (method === "GET") {
        return await handler({ ...params, queryParams });
      } else {
        return await handler({ ...params, body });
      }
    }

    throw new Error(`No mock handler found for ${method} ${endpoint}`);
  }

  async _request(endpoint, options = {}) {
    // Mock call
    if (isMockMode) {
      const method = (options.method || 'GET').toUpperCase();
      let body = null;
      if (options.body) {
        try {
          body = JSON.parse(options.body);
        } catch {
          body = options.body;
        }
      }
      return this._mockResponse(method, endpoint, body);
    }

    // Normal fetch call
    const url = this.baseURL + endpoint;
    const response = await fetch(url, options);

    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const error = new Error(data?.message || 'Network response was not ok');
      error.response = data;
      throw error;
    }

    return data;
  }




  get(endpoint, headers = {}) {
    return this._request(endpoint, { method: 'GET', headers });
  }

  post(endpoint, body, headers = {}) {
    return this._request(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(body),
    });
  }

  put(endpoint, body, headers = {}) {
    return this._request(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(body),
    });
  }

  delete(endpoint, headers = {}) {
    return this._request(endpoint, { method: 'DELETE', headers });
  }

  patch(endpoint, body, headers = {}) {
    return this._request(endpoint, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(body),
    });
  }
}

const apiClient = new ApiClient();

export default apiClient;
