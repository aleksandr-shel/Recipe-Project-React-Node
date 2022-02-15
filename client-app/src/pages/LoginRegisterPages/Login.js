import React from "react";
import './LoginRegister.css';
import { useState } from "react";
import axios from 'axios';
import ReactLoading from 'react-loading';
import {useNavigate} from 'react-router-dom';
import { useToken } from "../../Auth/useToken";
import { useEffect } from "react";

export default function Login(){

    const [token, setToken] = useToken();

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


    async function onLoginClicked(){
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
        navigate('/')
    }

    function clearInputs(){
        setEmailValue('');
        setPasswordValue('');
    }

    return(
        <div>
            <h1 style={{textAlign:'center'}}> Login</h1>
            <div className="form-container">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>Email: </label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="email"
                                    value={emailValue}
                                    onChange={(e)=>setEmailValue(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Password: </label>
                            </td>
                            <td>
                                <input
                                type="password"
                                name="password"
                                value={passwordValue}
                                onChange={(e)=>setPasswordValue(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={clearInputs}>
                                    Reset
                                </button>
                            </td>
                            <td>
                                <button onClick={onLoginClicked}>
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
        </div>
    )
}