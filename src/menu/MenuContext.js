import React from 'react';
export const MenuContext = React.createContext({});
export function addPropsIndex(children, index){
    return React.Children.map(children, (child, i) => {
        return React.cloneElement(child, {index: `${index}-${i}`})
    });
}