import User from "@/models/User";
import { AuthResponse } from "@/types/apiTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definimos el estado
export type AuthSliceType = {
  user: null | User;
  tokens: null | AuthResponse;
  recordingAuth: boolean;
};

// Definimos datos iniciales
const initialState: AuthSliceType = {
  user: null,
  tokens: null,
  recordingAuth: true,
};

// Creamos un slice
export const authSlice = createSlice({
  name: "auth", // Nombre del slice
  initialState, // Datos iniciales
  reducers: {
    // * UPDATE

    // Actualizar todo el estado de auth
    updateAuthAllAuth: (state, action: PayloadAction<AuthSliceType>) => {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.recordingAuth = action.payload.recordingAuth;
      // Actualizamos foto
      if (state.user?.profile) {
        const foto = state.user?.profile?.foto_url ?? state.user?.profile?.foto;
        state.user.profile = {
          ...state.user.profile,
          foto_url: foto,
        };
      }
    },
    // Actualizar el usuario
    updateUserAuth: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      // Actualizamos foto
      if (state.user?.profile) {
        const foto = state.user?.profile?.foto_url ?? state.user?.profile?.foto;
        state.user.profile = {
          ...state.user.profile, // Spread the existing profile properties
          foto_url: foto, // Update foto_url
        };
      }
    },
    // Actualizar el recording
    updateRecordingAuth: (state, action: PayloadAction<boolean>) => {
      state.recordingAuth = action.payload;
    },
    // Actualizar los tokens
    updateTokensAuth: (state, action: PayloadAction<AuthResponse | null>) => {
      state.tokens = action.payload;
    },
    // Actualizar el token de acceso
    updateAccessTokenAuth: (state, action: PayloadAction<string | null>) => {
      if (state?.tokens) {
        state.tokens.access = action?.payload ?? undefined;
      }
    },
    // Actualizar el token de refresco
    updateRefreshTokenAuth: (state, action: PayloadAction<string | null>) => {
      if (state?.tokens) {
        state.tokens.refresh = action?.payload ?? undefined;
      }
    },

    // ! DELETE

    // Eliminar todos los datos de autenticación
    removeAllDataAuth: (state) => {
      state.user = null;
      state.tokens = null;
      state.recordingAuth = false;
    },
    // Eliminar el token de acceso y refresco
    removeTokensAuth: (state) => {
      if (state?.tokens) {
        state.tokens = null;
      }
    },
    // Eliminar el token de acceso
    removeAccessTokenAuth: (state) => {
      if (state?.tokens) state.tokens.access = undefined;
    },
    // Eliminar el token de refresco
    removeRefreshTokenAuth: (state) => {
      if (state?.tokens) state.tokens.refresh = undefined;
    },
    // Eliminar usuario
    removeUserAuth: (state) => {
      state.user = null;
    },
  },
});

// Exportamos
export const {
  updateAuthAllAuth,
  updateUserAuth,
  updateRecordingAuth,
  updateTokensAuth,
  updateAccessTokenAuth,
  updateRefreshTokenAuth,
  removeAllDataAuth,
  removeTokensAuth,
  removeAccessTokenAuth,
  removeRefreshTokenAuth,
  removeUserAuth,
} = authSlice.actions;

export default authSlice.reducer;
