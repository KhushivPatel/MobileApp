// ExamContext.js
import React, {createContext, useContext, useState} from 'react';

const ExamContext = createContext();

export const ExamProvider = ({children}) => {
  const [examDetails, setExamDetails] = useState([]);

  return (
    <ExamContext.Provider value={{examDetails, setExamDetails}}>
      {children}
    </ExamContext.Provider>
  );
};

export const useExamContext = () => useContext(ExamContext);
