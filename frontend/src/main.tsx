
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { SocketProvider } from "./providers/SocketProvider";
import { ErrorBoundary } from "./components/feedback/ErrorBoundary";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);
  