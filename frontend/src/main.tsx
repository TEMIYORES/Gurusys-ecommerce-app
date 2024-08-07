import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import React from "react";
import { store } from "./services/store.tsx";
import { Provider } from "react-redux";
import Cart from "./pages/Cart.tsx";
import { Toaster } from "sonner";
import Dashboard from "./pages/Dashboard.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/*start- Public routes */}
      <Route index element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
