import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { setupStore } from "./store/store.ts";
import { Provider } from "react-redux";
import App from "./App.tsx";
import Loader from "@components/loader/Loader.tsx";
import "./index.css";
import "./i18n.ts";

export const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </Provider>
);
