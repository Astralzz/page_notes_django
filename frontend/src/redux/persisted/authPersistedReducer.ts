import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice, AuthSliceType } from "../slices/authSlice";

// Configuración de persistencia para Redux
const persistConfig = {
  key: "auth-persist-reducer",
  storage,
  whitelist: ["tokens"], // Solo los tokens se guardarán en el almacenamiento local
};

// Reducer persistente para la autenticación
const persistedAuthReducer = persistReducer<AuthSliceType>(
  persistConfig,
  authSlice.reducer
);

export default persistedAuthReducer;
