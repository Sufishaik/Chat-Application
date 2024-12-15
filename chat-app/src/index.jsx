import React from "react";
import { createRoot } from "react-dom/client";
import './App.css'
import App from "./App";
import { Toaster } from "sonner";
import { SocketProvider } from "./store/Socket.jsx";
import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from "react-redux";
import { store, persistor } from "./store";

const container = document.getElementById("root");
const root = createRoot(container);
console.log('Initial State:', store.getState());

root.render(
  // <React.StrictMode>
  <>


    <Provider store={store}>

      <SocketProvider>
        <PersistGate loading={null} persistor={persistor} onBeforeLift={() => {
          console.log('Persisted State on Load:', store.getState().chat.contacts);
        }}>
          <App />
        </PersistGate>
      </SocketProvider>

    </Provider>
    <Toaster closeButton />
  </>

  // </React.StrictMode>
);
