import React, { createContext, useState } from "react";

export const SortingContext = createContext();

export const SortingProvider = ({ children }) => {
  const [sortMethod, setSortMethod] = useState("date");
  const [isAscending, setIsAscending] = useState(false);

  return (
    <SortingContext.Provider
      value={{ sortMethod, setSortMethod, isAscending, setIsAscending }}
    >
      {children}
    </SortingContext.Provider>
  );
};
