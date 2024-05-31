import React, { createContext, useContext, useReducer } from 'react';

// Crée le contexte
const MyContext = createContext();

// Actions possibles pour modifier l'état
const SET_USERNAME = 'SET_USERNAME';
const SET_GRID = 'SET_GRID';

// Définit le fournisseur du contexte
export const MyContextProvider = ({ children }) => {
    const initialState = {
        user: '',
        grid: '',
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case SET_USERNAME:
                return { ...state, user: action.payload };
            case SET_GRID:
                return { ...state, grid: action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MyContext.Provider value={{ state, dispatch }}>
        {children}
        </MyContext.Provider>
    );
};

// Utilise un hook personnalisé pour accéder au contexte
export const useMyContext = () => {
    return useContext(MyContext);
};
