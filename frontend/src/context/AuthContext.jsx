import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8080';

const AuthContext = createContext();

const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  user: localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')).sub : null,
  error: null,
  loading: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.LOGIN_SUCCESS:
      const user = jwtDecode(action.payload.token).sub;
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: user,
        error: null,
        loading: false,
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: null,
        loading: false,
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
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

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (username, password) => {
    dispatch({ type: actionTypes.SET_LOADING });
    try {
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
      
      return true;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Usuário ou senha incorretos.';
      dispatch({ type: actionTypes.SET_ERROR, payload: { error: errorMsg } });
      return false;
    }
  };

  const register = async (username, email, password) => {
    dispatch({ type: actionTypes.SET_LOADING });
    try {
      await axios.post(`${API_URL}/users/register`, {
        username: username,
        email: email,
        password: password,
      });

      dispatch({ type: actionTypes.REGISTER_SUCCESS });
      return true;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Erro ao registrar. Verifique os dados.';
      dispatch({ type: actionTypes.SET_ERROR, payload: { error: errorMsg } });
      return false;
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};