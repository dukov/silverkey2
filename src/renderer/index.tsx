import React from "react";
import { createRoot } from "react-dom/client";

import Main from "./components/Main/Main";

const app = document.getElementById("app");
if (app == null) throw new Error("app element not found");
const root = createRoot(app);
root.render(<Main />);
