import { AxiosError } from "axios";
import { apiInstance } from "./axiosConfig";

export const sendMail = async (formData: FormData) => {
  try {
    const res = await apiInstance.post("/emails/send", formData);
    return res?.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    console.error("Error message:", axiosError);
    const errorMessage =
      axiosError.response?.data?.message ||
      "Hubo un error al enviar el correo. Por favor, intenta nuevamente.";

    throw new Error(errorMessage);
  }
};
