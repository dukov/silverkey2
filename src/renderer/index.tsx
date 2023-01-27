import React from "react";
import { createRoot } from "react-dom/client";

import Main from "./components/Main/Main";
import Settings from "./components/Settings/Settings";

const app = document.getElementById("app");
if (app == null) throw new Error("app element not found");
const root = createRoot(app);

let isSettings = false;
window.eRPC.isSettings(() => {
  console.log("got event show settings");
  root.render(<Settings />);
});

root.render(<Main />);
