import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import POKEMONS from "./pokemons.json"
import COLOR from "./typeColor.json"

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App POKEMONS={POKEMONS} COLOR={COLOR}/>
  </StrictMode>
);