import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AuthSliceType } from "../redux/slices/authSlice";

/**
 * Hook para obtener el estado del la autenticación
 * @return {AuthSliceType}
 */
export const useAuthApp = (): AuthSliceType => {
  return useSelector((state: RootState) => state.stateAuth);
};
