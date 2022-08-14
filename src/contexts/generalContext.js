import React, { useState, createContext } from "react";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(true);
  return (
    <GeneralContext.Provider
      value={{
        isProjectInfoOpen: isProjectInfoOpen,
        setIsProjectInfoOpen: setIsProjectInfoOpen,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
