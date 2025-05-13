import { useDispatch } from "react-redux";
import {
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
} from "@/redux/slices/authSlice";
import { AuthSliceType } from "@/redux/slices/authSlice";
import User from "@/models/User";
import { AuthResponse } from "@/types/apiTypes";

/**
 * Reusable hook for actions by authSlice
 *
 * @returns {Functions}
 */
const useAuthActions = () => {
  // Dispatch redux
  const dispatch = useDispatch();

  const updateAuth = (data: AuthSliceType) => {
    dispatch(updateAuthAllAuth(data));
  };

  const updateUser = (user: User | null) => {
    dispatch(updateUserAuth(user));
  };

  const updateRecording = (recording: boolean) => {
    dispatch(updateRecordingAuth(recording));
  };

  const updateTokens = (tokens: AuthResponse | null) => {
    dispatch(updateTokensAuth(tokens));
  };

  const updateAccessToken = (accessToken: string | null) => {
    dispatch(updateAccessTokenAuth(accessToken));
  };

  const updateRefreshToken = (refreshToken: string | null) => {
    dispatch(updateRefreshTokenAuth(refreshToken));
  };

  const removeAllData = () => {
    dispatch(removeAllDataAuth());
  };

  const removeTokens = () => {
    dispatch(removeTokensAuth());
  };

  const removeAccessToken = () => {
    dispatch(removeAccessTokenAuth());
  };

  const removeRefreshToken = () => {
    dispatch(removeRefreshTokenAuth());
  };

  const removeUser = () => {
    dispatch(removeUserAuth());
  };

  return {
    dispatch,
    updateAuth,
    updateUser,
    updateRecording,
    updateTokens,
    updateAccessToken,
    updateRefreshToken,
    removeAllData,
    removeTokens,
    removeAccessToken,
    removeRefreshToken,
    removeUser,
  };
};

export default useAuthActions;
