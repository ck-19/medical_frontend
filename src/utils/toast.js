import toast from 'react-hot-toast';

export const showSuccess = (message) => toast.success(message);
export const showError = (message) => toast.error(message);

export const getApiErrorMessage = (err, fallback = 'Something went wrong') => {
  return err?.response?.data?.error || err?.message || fallback;
};
