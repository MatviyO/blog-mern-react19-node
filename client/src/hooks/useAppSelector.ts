import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

const useAppSelector: () => AppDispatch = useDispatch;

export default useAppSelector;
