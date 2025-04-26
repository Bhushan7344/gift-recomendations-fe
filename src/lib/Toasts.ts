// utils/toast.ts
import { toast } from "sonner";

export const showToast = {
  success: (message: string, description?: string) =>
    toast.success(message, {
      description,
    }),

  error: (message: string, description?: string) =>
    toast.error(message, {
      description,
    }),

  info: (message: string, description?: string) =>
    toast.message(message, {
      description,
    }),

  warning: (message: string, description?: string) =>
    toast.warning(message, {
      description,
    }),

  promise: <T>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string }
  ) =>
    toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    }),
};
