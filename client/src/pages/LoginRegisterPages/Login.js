import React from "react";
import { useState } from "react";
import ReactLoading from 'react-loading';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { setLoading, usersSelector,setToken, loadCurrentUser } from "../../slice/usersReducer";
import agent from "../../Api/agent";

export default function Login({link}){

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    
    const {loading} = useSelector(usersSelector);

    const dispatch = useDispatch()

    const navigate = useNavigate();


    async function onLogin(){
        dispatch(setLoading(true))
        try{
            const {token} = await agent.User.login({email:emailValue, password: passwordValue})
            dispatch(setToken(token))
            dispatch(loadCurrentUser())
            dispatch(setLoading(false))
            if (link){
                navigate(link)
            } else {
                navigate('/')
            }
        }catch(error){
            dispatch(setLoading(false))
            throw error
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
                <div style={{display:'flex', justifyContent:'center'}}>{loading && <ReactLoading type="spinningBubbles" height={'50%'} color="#3cab54"/>}</div>
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