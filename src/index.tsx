import React from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./app/store";
import StarMatch from "./app/StarMatch";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@mui/material/styles";
import theme from "./theme";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <StarMatch/>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
);
