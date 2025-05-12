import User from "@/models/User";
import { AuthResponse } from "@/types/apiTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definimos el estado
export type AuthSliceType = {
  user: null | User;
  tokens: null | AuthResponse;
};

// Definimos datos iniciales
const initialState: AuthSliceType = {
  user: null,
  tokens: null,
};

// Creamos un slice
export const authSlice = createSlice({
  name: "auth", // Nombre del slice
  initialState, // Datos iniciales
  reducers: {
    // * UPDATE

    // Actualizar todo el estado de auth
    updateAuthAll: (state, action: PayloadAction<AuthSliceType>) => {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
    },
    // Actualizar el usuario
    updateUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    // Actualizar los tokens
    updateTokens: (state, action: PayloadAction<AuthResponse | null>) => {
      state.tokens = action.payload;
    },
    // Actualizar el token de acceso
    updateAccessToken: (state, action: PayloadAction<string | null>) => {
      if (state?.tokens) {
        state.tokens.access = action?.payload ?? undefined;
      }
    },
    // Actualizar el token de refresco
    updateRefreshToken: (state, action: PayloadAction<string | null>) => {
      if (state?.tokens) {
        state.tokens.refresh = action?.payload ?? undefined;
      }
    },

    // ! DELETE

    // Eliminar todos los datos de autenticación
    removeAuthAll: (state) => {
      state.user = null;
      state.tokens = null;
    },
    // Eliminar el token de acceso y refresco
    removeTokens: (state) => {
      if (state?.tokens) {
        state.tokens.access = undefined;
        state.tokens.refresh = undefined;
      }
    },
    // Eliminar el token de acceso
    removeAccessToken: (state) => {
      if (state?.tokens) state.tokens.access = undefined;
    },
    // Eliminar el token de refresco
    removeRefreshToken: (state) => {
      if (state?.tokens) state.tokens.refresh = undefined;
    },
    // Eliminar usuario
    removeUser: (state) => {
      state.user = null;
    },
  },
});

// Exportamos
export const {
  updateAuthAll,
  updateUser,
  updateTokens,
  updateAccessToken,
  updateRefreshToken,
  removeAuthAll,
  removeTokens,
  removeAccessToken,
  removeRefreshToken,
  removeUser,
} = authSlice.actions;

export default authSlice.reducer;
