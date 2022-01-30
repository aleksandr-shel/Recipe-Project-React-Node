import React from "react";
import './LoginRegister.css';
import { useState } from "react";

export default function Login(){

    const baseUrl = "https://localhost:5000/";
    const [inputs, setInputs] = useState({})


    const handleChanges = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleLogin = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        
        Object.keys(inputs).forEach((key)=>{
            formData.append(key, inputs[key])
        })
        fetch(baseUrl + 'api/users/login', {
            method:'POST',
            body:formData
        }).then(response =>{
            return response.json()
        }).then(data =>{
            console.log(data);
        }).catch(error =>{
            console.log(error);
        })
        setInputs({})
    }

    return(
        <div>
            <h1 style={{textAlign:'center'}}> Login</h1>
            <form className="form-container" onSubmit={handleLogin}>
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
                            <input
                            type="reset"
                            value="Cancel"
                            onClick={()=>{setInputs({})}}
                            />
                        </td>
                        <td>
                            <input
                            type="submit"
                            value="Login"
                            />
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    )
}