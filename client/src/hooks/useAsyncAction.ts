import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

export const useAsyncAction = <T>() => {
  const dispatch = useDispatch<AppDispatch>();

  const executeAction = async (action: any): Promise<T> => {
    const res = await dispatch(action);
    return res;
  };

  return { executeAction };
};
