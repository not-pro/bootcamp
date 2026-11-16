import { createContext } from "react";
import type { HomePageState } from "./types";

export const HomePageContext = createContext<HomePageState | null>(null);
