import { useState, useContext } from 'react'
import LoginContext from '../context/loginContext/loginContext';
import Toast from 'react-native-toast-message';


const useForm = ( signIn = false) => {
    const loginContext = useContext(LoginContext);
    const { login, register } = loginContext;
 
    const [useForm, setUseForm] =  useState({
        name: '',
        email: '',
    })

    const {name, email} = useForm;

    const handleChange = (value, name) => {
        setUseForm({
            ...useForm,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validationEmail(email)){
            
            Toast.show({
                type: 'error',
                text1: 'Email invalido',
            });
            
            return 
        }

        if(signIn){
            if(name === null || name === undefined){
                Toast.show({
                    type: 'error',
                    text1: 'nombre es requerido',
                });
                
                return 
            }
           register({name, email})
        }else{
          login({email})
        }
        
    }

    const validationEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(email) return re.test(email)

        return false
    }

    return {
        name,
        email,
        handleChange,
        handleSubmit
    }
}

export default useForm;