// app-entry.jsx
import React from "react";
import { createRoot } from "react-dom/client";

// Import your JSX app module. We’ll be flexible about how it's exported.
import * as Mod from "./rental-inspection-app.jsx";

// Pick the best available export: default or named `App`
const App = Mod.default || Mod.App || (() =>
  React.createElement("div", { style: { padding: 16 } }, "App component not found. Export default or named `App` from rental-inspection-app.jsx.")
);

// Ensure there’s a mount point
let rootEl = document.getElementById("root");
if (!rootEl) {
  rootEl = document.createElement("div");
  rootEl.id = "root";
  document.body.appendChild(rootEl);
}

// Render
createRoot(rootEl).render(React.createElement(App));
