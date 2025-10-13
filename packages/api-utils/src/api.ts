import axios from "axios";
import type { CommonResponse } from "./common-response";

export function initApi(baseURL: string) {
  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export class API {
  private api: ReturnType<typeof initApi>;

  constructor(baseURL: string) {
    const api = initApi(baseURL);

    this.api = api;
  }

  public async applyAuthInterceptor(token: string) {
    this.api.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  public async get<T>(endpoint: string, params?: Record<string, string>) {
    const response = await this.api.get<
      CommonResponse<T>,
      axios.AxiosResponse<CommonResponse<T>, unknown>
    >(endpoint, {
      params,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  public async post<T, D>(endpoint: string, data: D) {
    const response = await this.api.post<
      CommonResponse<T>,
      axios.AxiosResponse<CommonResponse<T>, unknown>,
      D
    >(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  public async put<T, D>(endpoint: string, data: D) {
    const response = await this.api.put<
      CommonResponse<T>,
      axios.AxiosResponse<CommonResponse<T>, unknown>,
      D
    >(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  public async delete<T, D>(endpoint: string, data: D) {
    const response = await this.api.delete<
      CommonResponse<T>,
      axios.AxiosResponse<CommonResponse<T>, unknown>,
      D
    >(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });

    return response;
  }

  public async patch<T, D>(endpoint: string, data: D) {
    const response = await this.api.patch<
      CommonResponse<T>,
      axios.AxiosResponse<CommonResponse<T>, unknown>,
      D
    >(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }
}
