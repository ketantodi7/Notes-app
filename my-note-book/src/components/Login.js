import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    
    const [credential, setcredential] = useState({email:"", password:""})
    let navigate = useNavigate();
    const handle_login = async (e) => {
        e.preventDefault();
        // fetch("http://localhost:5000/api/auth/login")
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credential.email, password: credential.password}),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //redirect
            localStorage.setItem('token', json.auth_key);
            navigate("/");
            props.showAlert("Login Successful", "success");
        }

        else{
            props.showAlert("invalid credential", "danger");
        }
    } 

    const onChange = (e) =>{
        setcredential({
            ...credential, [e.target.name] : e.target.value
        })
    }

    return (
        <div className='container mt-3'>
            <h1 >Login To Continue To My Notes</h1>
            <form onSubmit={handle_login}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credential.email} id="email" onChange={onChange} name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credential.password} name="password" id="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
