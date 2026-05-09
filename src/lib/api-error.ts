import { AxiosError } from "axios";

type ApiErrorPayload = {
  message?: string;
  errors?: {
    formErrors?: string[];
    fieldErrors?: Record<string, string[] | undefined>;
  };
};

export const getApiErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (error instanceof AxiosError) {
    const payload = error.response?.data as ApiErrorPayload | undefined;
    const formError = payload?.errors?.formErrors?.[0];

    if (formError) {
      return formError;
    }

    const fieldErrors = payload?.errors?.fieldErrors;

    if (fieldErrors) {
      const firstFieldMessage = Object.values(fieldErrors)
        .flat()
        .find((message): message is string => Boolean(message));

      if (firstFieldMessage) {
        return firstFieldMessage;
      }
    }

    if (payload?.message) {
      return payload.message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
};
