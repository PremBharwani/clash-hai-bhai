import React from "react";
import { globalContextType } from "./types";

export const GlobalContext = React.createContext<globalContextType | null>(null);

export default GlobalContext;
