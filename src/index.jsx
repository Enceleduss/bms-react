import "@fontsource/inter";
import "@fontsource/poppins";

import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { myTheme } from "@/styles/theme.js";
import { Provider } from "react-redux"
import { store } from "@/store/index"
ReactDOM.createRoot(document.getElementById("root")).render(
  
  <ChakraProvider theme={myTheme}>
    <Provider store={store}>
    <App />
    </Provider>
  </ChakraProvider>
  
);
