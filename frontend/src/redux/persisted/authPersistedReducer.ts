import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice, AuthSliceType } from "../slices/authSlice";

// Configuración de persistencia para Redux
const persistConfig = {
  key: "auth-persist-reducer",
  storage,
  whitelist: ["tokens", "recordingAuth"], // Datos a guardar
};

// Reducer persistente para la autenticación
const persistedAuthReducer = persistReducer<AuthSliceType>(
  persistConfig,
  authSlice.reducer
);

export default persistedAuthReducer;
