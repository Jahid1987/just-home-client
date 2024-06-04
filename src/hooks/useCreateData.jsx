import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useCreate = (
  endpoint,
  onSuccessCallback,
  onErrorCallback,
  queryKeysToInvalidate = []
) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (newDoc) => {
      return axios.post(endpoint, newDoc);
    },
    onSuccess: (data) => {
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
      queryKeysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries(key);
      });
    },
    onError: (error) => {
      if (onErrorCallback) {
        onErrorCallback(error);
      } else {
        console.error("Mutation error:", error);
      }
    },
  });

  return { create: mutateAsync, isLoading };
};

export default useCreate;
