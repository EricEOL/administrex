import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../config/api';
import { useRouter } from 'next/router';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [userLogged, setUserLogged] = useState([]);
    const [error, setError] = useState('');
    const route = useRouter();

    useEffect(() => {
        const userStorage = localStorage.getItem("@Sistem_mar21:user");

        if (userStorage) {
            setUserLogged(userStorage);
        } else {
            setUserLogged(undefined);
        }
    }, [])

    const Login = async ({email, password}) => {
        try {
            const { data } = await api.post('/user/login', { email, password });
            const { user, token } = data;

            localStorage.setItem('@Sistem_mar21:token', token);
            localStorage.setItem('@Sistem_mar21:user', user);
            
            setUserLogged(user);

            route.push('/process');

        } catch (error) {
            setError(error.response.data);
        }
    }

    const Logout = useCallback(() => {

        localStorage.removeItem('@Sistem_mar21:token');
        localStorage.removeItem("@Sistem_mar21:user");

        setUserLogged([]);

        route.push('/');
    }, []);

    return (
        <AuthContext.Provider
            value={{ userLogged, Logout, Login, LoginError: error }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);