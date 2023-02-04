import React from "react";
import { createRoot } from "react-dom/client";

import Main from "./components/Main/Main";
import Settings from "./components/Settings/Settings";

import * as setLib from "main/lib/settings";

const app = document.getElementById("app");
if (app == null) throw new Error("app element not found");
const root = createRoot(app);

window.eRPC.isSettings((_, settings: setLib.Settings) => {
  root.render(<Settings settings={settings} />);
});

root.render(<Main />);
