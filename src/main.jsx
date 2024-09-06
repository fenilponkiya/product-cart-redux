import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { store } from "./components/redux/store.jsx";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import { getTheme } from "./theme/theme.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={getTheme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
