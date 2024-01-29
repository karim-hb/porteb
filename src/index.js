import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//برای تست کار من میتونید این قسمت رو جایگزین اپ اصلی کنید
// import App from "./App-test";
import App from "./App";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";


const root = ReactDOM.createRoot(document.getElementById("root"));
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope:', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}

root.render(
  <>
    <CacheProvider value={cacheRtl}>
      <App />
    </CacheProvider>
  </>
);
serviceWorkerRegistration.register();