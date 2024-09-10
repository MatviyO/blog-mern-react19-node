import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { postsSliceAction } from "../redux/slices/postsSlice";
import { userSliceActions } from "../redux/slices/userSlice";

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...postsSliceAction,
      ...userSliceActions,
    },
    dispatch,
  );
};

export default useActions;
