import { useContext } from "react";
import { EditedStationsContext } from "../context/createContext";

export const useEditStationsContext = () => {
  const context = useContext(EditedStationsContext);
  if (!context) {
    throw new Error("useEditStationsContext must be used within an EditedStationsProvider");
  }
  return context;
};