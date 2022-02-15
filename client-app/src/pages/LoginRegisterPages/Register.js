import React from "react";
import {useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import './LoginRegister.css';
import ReactLoading from 'react-loading';
import { useToken } from './../../Auth/useToken';
import axios from "axios";

export default function Register(){

    const [token, setToken] = useToken();
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [isLoadingRegister, setLoadingRegister] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(() => {
            setShowErrorMessage(false);
        }, 5000);
    }, [showErrorMessage])

    function clearInputs(){
        setEmailValue('')
        setPasswordValue('')
        setFirstName('')
        setLastName('')
    }
    async function onRegisterClicked(){
        setLoadingRegister(true);
        const response = await axios.post('/api/users/register',{
            email: emailValue,
            password: passwordValue,
            firstName,
            lastName
        })
        .catch(err=>{
            setLoadingRegister(false);
            setShowErrorMessage(true);
            return;
        })

        console.log(response);
        const {token} = response.data;
        setToken(token);
        setLoadingRegister(false);
        navigate('/')
    }
    return (
        <>
            <h1 style={{textAlign:'center'}}>Register</h1>
            <div className="form-container">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>Email: </label>
                            </td>
                            <td>
                                <input
                                type="email"
                                name="Email"
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
                                <label>Firstname: </label>
                            </td>
                            <td>
                                <input
                                type="text"
                                name="Firstname"
                                value={firstName}
                                onChange={(e)=>setFirstName(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Lastname: </label>
                            </td>
                            <td>
                                <input
                                type="text"
                                name="Lastname"
                                value={lastName}
                                onChange={(e)=>setLastName(e.target.value)}/>
                            </td>
                        </tr>
                        <tr className="form-btns">
                            <td>
                                <button onClick={()=>{clearInputs()}}>
                                    Reset
                                </button>
                            </td>
                            <td>
                                <button onClick={onRegisterClicked}>
                                    Register
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button onClick={()=>navigate('/login')}>
                                    Already have an account? Login
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={{display:'flex', justifyContent:'center'}}>{showErrorMessage && <span style={{color:'red'}}>Registration failed</span>}</div>
                <div style={{display:'flex', justifyContent:'center'}}>{isLoadingRegister && <ReactLoading type="spinningBubbles" height={'50%'} color="#3cab54"/>}</div>
            </div>
        </>
    )
}