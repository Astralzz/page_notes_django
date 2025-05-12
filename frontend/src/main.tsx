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

// Styles
import "./main.css";

// Providers
import Initializer from "./providers/Initializer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Initializer>
          <RouterProvider router={router} />
        </Initializer>
      </PersistGate>
    </ReduxProvider>
  </StrictMode>
);
