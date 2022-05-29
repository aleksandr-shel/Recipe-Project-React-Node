import React from "react";
import {useState } from "react";
import {useNavigate} from 'react-router-dom';
import ReactLoading from 'react-loading';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector, setLoading, setTokenAndUser, setToken, loadCurrentUser } from "../../slice/usersReducer";
import agent from "../../Api/agent";

export default function Register(){

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const {loading} = useSelector(usersSelector);

    const dispatch = useDispatch()

    const navigate = useNavigate();


    function clearInputs(){
        setEmailValue('')
        setPasswordValue('')
        setFirstName('')
        setLastName('')
    }
    async function onRegisterClicked(){
        dispatch(setLoading(true))
        try{
            const {token} = await agent.User
                .register({
                    email: emailValue,
                    password: passwordValue,
                    firstName,
                    lastName
                })
            dispatch(setToken(token))
            dispatch(loadCurrentUser())
            dispatch(setLoading(false))
            navigate('/')
            
        }catch(error){
            dispatch(setLoading(false))
            throw error
        }
    }
    return (
        <RegisterForm>
            <h1 style={{textAlign:'center'}}>Register</h1>
            <div className="form-container"
                onKeyPress={(e)=>{if(e.key === 'Enter'){onRegisterClicked()}}}>
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
                <div style={{display:'flex', justifyContent:'center'}}>{loading && <ReactLoading type="spinningBubbles" height={'50%'} color="#3cab54"/>}</div>
            </div>
        </RegisterForm>
    )
}


const RegisterForm = styled.div`
    .form-container{
        padding: 10vh;
    }

    .form-container > table{
        margin: 0px auto;
    }

    .form-container input {
        margin: 5px;
    }

    td{
        text-align: center;
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