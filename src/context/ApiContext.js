import React, {useContext} from 'react';

// noinspection JSCheckFunctionSignatures
const ApiContext = React.createContext();

const ApiContextProvider = ({children, ...props}) => {
    const state = {
        ...props
    };

    return (
        <ApiContext.Provider value={state}>
            {children}
        </ApiContext.Provider>
    );
};

export default ApiContextProvider;

export const useApiContext = () => useContext(ApiContext);