import toast from "react-hot-toast";

const defaultOptions = {
  duration: 3000,
};

export const showSuccess = (message) =>
  toast.success(message, defaultOptions);

export const showError = (message) =>
  toast.error(message, defaultOptions);

export const showLoading = (message = "Loading...") =>
  toast.loading(message);

export const dismissToast = (toastId) =>
  toast.dismiss(toastId);

export const promiseToast = (promise, messages) =>
  toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error,
  });