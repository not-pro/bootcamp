import { useContext } from "react";
import { HomePageContext } from "../HomePageContext";

export function useHomePageContext() {
  const context = useContext(HomePageContext);
  if (!context) {
    throw new Error("useHomePageContext must be used within HomePageProvider");
  }
  return context;
}
