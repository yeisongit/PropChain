import React from 'react';
import AnimateOnViewContext from './AnimateOnViewContext';

export default function useAnimateInView(): boolean | undefined {
  return React.useContext(AnimateOnViewContext);
}
