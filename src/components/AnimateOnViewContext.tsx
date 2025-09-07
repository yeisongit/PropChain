import React from 'react';

const AnimateOnViewContext = React.createContext<boolean | undefined>(undefined);
export const AnimateOnViewProvider = AnimateOnViewContext.Provider;

export default AnimateOnViewContext;
