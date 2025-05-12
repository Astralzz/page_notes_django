import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { themeSlice, ThemeSliceType } from "../slices/themeSlice";

// Configuración
const persistConfig = {
  key: "theme-persist-reducer",
  storage,
  whitelist: ["theme", "isThemeDark"],
};

// Reducer persistente para el tema
const persistedThemeReducer = persistReducer<ThemeSliceType>(
  persistConfig,
  themeSlice.reducer
);

export default persistedThemeReducer;
