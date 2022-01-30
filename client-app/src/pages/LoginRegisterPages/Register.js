import React from "react";
import { useState } from "react";
import './LoginRegister.css';

export default function Register(){
    const baseUrl = "https://localhost:5000/";
    const [inputs, setInputs] = useState({});

    const handleChanges = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleRegistration = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        
        Object.keys(inputs).forEach((key)=>{
            formData.append(key, inputs[key])
        })
        fetch(baseUrl + 'api/users/register', {
            method:'POST',
            body:formData
        }).then(response =>{
            return response.json()
        }).then(data =>{
            console.log(data);
        })

        setInputs({})

    }

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Register</h1>
            <form className="form-container" onSubmit={handleRegistration}>
                <table>
                    <tr>
                        <td>
                            <label>Username: </label>
                        </td>
                        <td>
                            <input
                            type="text"
                            name="Username"
                            value={inputs.username || ""}
                            onChange={handleChanges}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Password: </label>
                        </td>
                        <td>
                            <input
                            type="password"
                            name="Password"
                            value={inputs.password || ""}
                            onChange={handleChanges}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Email: </label>
                        </td>
                        <td>
                            <input
                            type="email"
                            name="Email"
                            value={inputs.email || ""}
                            onChange={handleChanges}/>
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
                            value={inputs.firstname || ""}
                            onChange={handleChanges}/>
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
                            value={inputs.lastname || ""}
                            onChange={handleChanges}/>
                        </td>
                    </tr>
                    <tr className="form-btns">
                        <td>
                            <input
                            type="reset"
                            value="Cancel"
                            onClick={()=>{setInputs({})}}
                            />
                        </td>
                        <td>
                            <input
                            type="submit"
                            value="Register"
                            />
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    )
}