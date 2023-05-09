import React, {useReducer } from 'react';
import axios from 'axios';
import LoginContext from './loginContext';
import loginReducer from './loginReducer';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '@env';

const LoginState = (props) => {
    const initialState = {
        token: null,
        orders: null,
        loading: null,
    }

    const [state, dispatch] = useReducer(loginReducer, initialState);


    const login = async (data) => {
        try {
            const response = await axios.post(`${URL}/auth/login`, data);
            await AsyncStorage.setItem('token', response.data.access_token)
            Toast.show({
                type: 'success',
                text1: 'Usuario logueado',
            });
            

            dispatch({
                type: 'AUTHENTICATED',
                payload: response.data.access_token
            })

        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                Toast.show({
                    type: 'error',
                    text1: 'Usuario incorrecto',
                });
               console.log(error.response?.data.message)
            }
        }    
    }

    const register = async (data) => {
        try {
            const response = await axios.post(`${URL}/auth/register`, data);
            await AsyncStorage.setItem('token', response.data.access_token)
            
            Toast.show({
                type: 'success',
                text1: 'Usuario creado',
             });

            dispatch({
                type: 'AUTHENTICATED',
                payload: response.data.access_token
            })
        } catch (error) {
            if (axios.isAxiosError(error)) { 
                console.log(error.response?.data.message)
                console.log(error.response?.data.message[0])    
            }   
        }
      
    }

    const sendOrder = async (sendData) => {
        
        try {
            const tk = localStorage.getItem('token')
            const getProfile = await axios.get(`${URL}/auth/profile`, {
                headers: {
                    ' Authorization': `Bearer ${tk}`
                }
            });

            const order = sendData.map((e) => { 
               return { catalogueId: e.id, userId: getProfile.data.sub}
            })

           await axios({
                method: 'post',
                url: `${URL}/order/order-multiple`,
                data: order,
                headers: {'Authorization': `Bearer ${tk}`}
              })
           
              Toast.show({
                type: 'success',
                text1: 'Pedido enviado',
              });

        } catch (error) {
            if (axios.isAxiosError(error)) { 
                console.log(error.response?.data.message)
                console.log(error.response?.data.message[0])    
            }   
        }
    }

    const getOrders = async() => {
        dispatch({
            type: 'LOADING',
            payload: true
        })
        try {
            const tk = await AsyncStorage.getItem('token')
            const {data} = await axios.get(`${URL}/auth/profile`, {
                headers: {
                    ' Authorization': `Bearer ${tk}`
                }
            });
           
            const orders = await axios.get(`${URL}/order/user/${data.sub}`, {
                headers: {
                    ' Authorization': `Bearer ${tk}`
                }
            });

            dispatch({
                type: 'ORDERS',
                payload: orders.data
            })
            
        } catch (error) {
            if (axios.isAxiosError(error)) { 
                console.log(error.response?.data.message)
                console.log(error.response?.data.message)    
            }   
        }

        dispatch({
            type: 'LOADING',
            payload: false
        })
    }

    const loadUser = async () => {
        dispatch({
            type: 'LOADING',
            payload: true
        })
        const token =  await AsyncStorage.getItem('token')
        if (token) {
            dispatch({
                type: 'AUTHENTICATED',
                payload: token
            })
        }

        dispatch({
            type: 'LOADING',
            payload: false
        })
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token')
        dispatch({
            type: 'AUTHENTICATED',
            payload: null
        })

        dispatch({
            type: 'LOADING',
            payload: true
        })
    }


    return (
        <LoginContext.Provider
            value={{
                token:state.token,
                orders: state.orders,
                loading: state.loading,
                login,
                register,
                sendOrder,
                loadUser,
                getOrders,
                logout,
            }}
        >
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginState;