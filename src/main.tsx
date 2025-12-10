import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import AppRouter from "./routes/AppRouter";
// axios-global
import "./services/axios-global.js";
import { Provider } from "react-redux";
import { persistor, store } from "@store/index";

// redux-persist
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}></PersistGate>
    <AppRouter />
  </Provider>
);
