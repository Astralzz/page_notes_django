import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ThemeSliceType } from "../redux/slices/themeSlice";

/**
 * Hook para obtener el estado del tema
 * @return {ThemeSliceType}
 */
export const useThemeApp = (): ThemeSliceType => {
  return useSelector((state: RootState) => state.stateTheme);
};
