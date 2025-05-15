import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// React redux
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "./redux/store";

// Redux persist
import { PersistGate } from "redux-persist/integration/react";

// Router
import { RouterProvider } from "react-router-dom";
import router from "./router";

// Detector de errores
import { ErrorBoundary } from "react-error-boundary";

// Styles
import "./main.css";

// Providers
import Initializer from "./providers/Initializer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      fallback={
        <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-800 p-4">
          <h1 className="text-3xl font-semibold mb-2">¡Algo salió mal! 😢</h1>
          <p className="text-lg mb-4">
            Por favor, recarga la página o intenta más tarde.
          </p>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={() => window.location.reload()}
          >
            Recargar página
          </button>
        </div>
      }
    >
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Initializer>
            <RouterProvider router={router} />
          </Initializer>
        </PersistGate>
      </ReduxProvider>
    </ErrorBoundary>
  </StrictMode>
);
