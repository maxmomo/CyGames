import React, { createContext, useContext, useReducer } from 'react';

// Crée le contexte
const MyContext = createContext();

// Actions possibles pour modifier l'état
const SET_USERNAME = 'SET_USERNAME';
const SET_GRID = 'SET_GRID';
const SET_RIDERS = 'SET_RIDERS';
const SET_USER_RIDERS = 'SET_USER_RIDERS';
const SET_CROSSWORD = 'SET_CROSSWORD'; 

// Définit le fournisseur du contexte
export const MyContextProvider = ({ children }) => {
    const initialState = {
        user: '',
        grid: '',
        crossWord: '',
        riders: [],
        user_riders: [],
        ip_adress: '192.168.1.125'
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case SET_USERNAME:
                return { ...state, user: action.payload };
            case SET_GRID:
                return { ...state, grid: action.payload };
            case SET_CROSSWORD:
                    return { ...state, crossWord: action.payload };
            case SET_RIDERS:
                return { ...state, riders: action.payload };
            case SET_USER_RIDERS:
                return { ...state, user_riders: action.payload };
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
