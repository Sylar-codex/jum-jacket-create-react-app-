import { useState, createContext } from "react";

const RegionContext = createContext(null);

const { Provider } = RegionContext;

const RegionProvider = ({ children }) => {
  const [region, setRegion] = useState("NG");
  return <Provider value={{ region, setRegion }}>{children}</Provider>;
};

export { RegionContext, RegionProvider };
