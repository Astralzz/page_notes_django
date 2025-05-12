import { configureStore } from "@reduxjs/toolkit";
import persistedAuthReducer from "./persisted/authPersistedReducer";
import persistedThemeReducer from "./persisted/themePersistedReducer";
import persistStore from "redux-persist/es/persistStore";

// TODO - STORE REDUX
export const store = configureStore({
  // Proveedores redux
  reducer: {
    // Estado del tema
    stateTheme: persistedThemeReducer,
    // Estado de autenticación
    stateAuth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Tipos
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Persistencia
export const persistor = persistStore(store);
