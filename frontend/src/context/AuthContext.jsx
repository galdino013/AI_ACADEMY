// frontend/src/context/AuthContext.jsx (Corrigido)

import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Garanta que 'jwt-decode' está instalado

// Define a URL da nossa API (do arquivo .env do Vite)
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8080';

// 1. Cria o Contexto (o "cofre" em si)
const AuthContext = createContext();

// 2. Define as "ações" que podemos fazer (Login, Logout, etc.)
const actionTypes = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// 3. Define o estado inicial
const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  user: localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')).sub : null,
  error: null,
};

// 4. O "Reducer" gerencia como o estado muda
const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      // Decodifica o token no login
      const user = jwtDecode(action.payload.token).sub;
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: user, // Salva o usuário
        error: null,
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null, // Limpa o usuário
        error: null,
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case actionTypes.CLEAR_ERROR:
       return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// 5. O "Provider" é o componente que envolve nosso App
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Funções que nossas páginas (Login, Register) vão chamar
  
  const login = async (username, password) => {
    try {
      dispatch({ type: actionTypes.CLEAR_ERROR });
      
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);

      const response = await axios.post(`${API_URL}/token`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: { token: access_token },
      });
      
      return true; // Sucesso
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Erro ao fazer login.';
      dispatch({ type: actionTypes.SET_ERROR, payload: { error: errorMsg } });
      return false; // Falha
    }
  };

  const register = async (username, password) => {
    try {
      dispatch({ type: actionTypes.CLEAR_ERROR });
      
      await axios.post(`${API_URL}/users/register`, {
        username: username,
        password: password,
      });

      dispatch({ type: actionTypes.REGISTER_SUCCESS });
      return true; // Sucesso
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Erro ao registrar.';
      dispatch({ type: actionTypes.SET_ERROR, payload: { error: errorMsg } });
      return false; // Falha
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: actionTypes.LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 6. O "Hook" é como os componentes vão acessar o cofre
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};