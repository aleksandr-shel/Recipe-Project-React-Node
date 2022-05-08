import React from "react";
import { useState } from "react";
import axios from 'axios';
import ReactLoading from 'react-loading';
import {useNavigate} from 'react-router-dom';
import { useToken } from "../../Auth/useToken";
import { useEffect } from "react";
import styled from 'styled-components';
import { useLoggedInContext } from "../../Context/LoggedInContext";
import getPayloadFromToken from './../../Auth/GetPayloadFromToken';

export default function Login({link}){

    const [, setToken] = useToken();

    const loggedInContext = useLoggedInContext()

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isLoadingLogin, setLoadingLogin] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    
    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(() => {
            setShowErrorMessage(false);
        }, 5000);
    }, [showErrorMessage])

    async function onLogin(){
        setLoadingLogin(true);

        const result = await axios.post('/api/users/login',{
            email: emailValue,
            password: passwordValue
        }).catch(err=>{
            setLoadingLogin(false);
            setShowErrorMessage(true);
            return;
        })
        const {token} = result.data;
        setToken(token);
        setLoadingLogin(false);
        loggedInContext.setLoggedIn(true);
        loggedInContext.setUser(getPayloadFromToken(token));
        if (link){
            navigate(link)
        } else {
            navigate('/')
        }
    }

    function clearInputs(){
        setEmailValue('');
        setPasswordValue('');
    }

    return(
        <LoginForm>
            <h1 style={{textAlign:'center'}}> Login</h1>
            <div className="form-container"
                onKeyPress={(e)=>{if(e.key === 'Enter'){onLogin()}}}>
                    <table>
                        <tbody>
                            
                            <tr>
                                <td>
                                    <label>Email: </label>
                                </td>
                                <td>
                                    <input
                                        required
                                        autoComplete='on'
                                        type="text"
                                        name="email"
                                        value={emailValue}
                                        onChange={(e)=>setEmailValue(e.target.value)}
                                        />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Password: </label>
                                </td>
                                <td>
                                    <input
                                        required
                                        type="password"
                                        name="password"
                                        value={passwordValue}
                                        onChange={(e)=>setPasswordValue(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr  className="form-btns">
                                <td>
                                    <button onClick={clearInputs}>
                                        Reset
                                    </button>
                                </td>
                                <td>
                                    <button onClick={onLogin} >
                                        Login
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button onClick={()=>navigate('/register')}>
                                        Don't have an account? Register
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                <div style={{display:'flex', justifyContent:'center'}}>{showErrorMessage && <span style={{color:'red'}}>Login failed</span>}</div>
                <div style={{display:'flex', justifyContent:'center'}}>{isLoadingLogin && <ReactLoading type="spinningBubbles" height={'50%'} color="#3cab54"/>}</div>
            </div>
        </LoginForm>
    )
}




const LoginForm = styled.div`
    .form-container{
        padding: 10vh;
    }

    .form-container  table{
        margin: 0px auto;
    }

    .form-container input {
        margin: 5px;
    }

    td{
        text-align:center;
    }

    input{
        border: 1px solid black;
        border-radius: 8px;
        display: inline-block;
        font-size: 16px;
        margin: 8px auto;
        padding: 8px;
    }

    button {
        cursor: pointer;
        margin: auto;
        padding: 8px 16px;
        border: none;
        background: #333;
        color: #f2f2f2;
        text-transform: uppercase;
        letter-spacing: .09em;
        border-radius: 6px;
    }
`