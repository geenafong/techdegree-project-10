import React from 'react';

//used to manage React Context API in the global state by using the provider and consumer component
const CoursesContext = React.createContext();
export const Provider = CoursesContext.Provider;
export const Consumer = CoursesContext.Consumer;