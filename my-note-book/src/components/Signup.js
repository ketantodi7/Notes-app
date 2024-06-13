import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credential, setcredential] = useState({name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const handle_singup = async (e) => {
        e.preventDefault();
        // fetch("http://localhost:5000/api/auth/login")
        const {name, email,password} = credential;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email,password}),
        });
        const json = await response.json();
        if(json.success){
        console.log(json);
            localStorage.setItem('token', json.auth_key);
            navigate("/");
            props.showAlert("Account Created successful", "success");
    }
    else{
    props.showAlert("invalid credential", "danger");
    }
    }

    const onChange = (e) => {
        setcredential({
            ...credential, [e.target.name]: e.target.value
        })
    }

    return (
        <div className='container mt-3'>
            <h1 >Create Your Account On My Notes</h1>
            <form onSubmit={handle_singup}>
                <div className="my-3">
                    <label htmlFor="text" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name"  id="name" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="my-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="my-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onChange} minLength={6} required/>
                </div>
                <div className="my-3">
                    <label htmlFor="con_password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="conpassword" id="con_password" onChange={onChange} minLength={6} required />
                </div>
                <button type="submit" className="btn btn-primary" disabled={credential.password.length<5}>Submit</button>
            </form>
        </div>
    )
}

export default Signup
