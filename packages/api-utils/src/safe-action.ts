import { AxiosError } from "axios";
import { CommonResponse } from "./common-response";
import axios from "axios";

export async function safeAction<T>(
  action: () => Promise<axios.AxiosResponse<CommonResponse<T>, unknown>>,
  messageError?: string
): Promise<CommonResponse<T>> {
  try {
    const res = await action();

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }

    return {
      statusCode: 500,
      message: messageError || "Error desconocido",
    };
  }
}
