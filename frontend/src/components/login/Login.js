import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import style from "./LoginStyle.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL;

function Login() {
    /**
     * Registration State Variables
     */
    const [login, setLogin] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    // function onChange(e) {
    //     e.preventDefault();
    //     console.log("email: " + login.email + "\n" +
    //         "password: " + login.password)
    // }

    function onSubmit(e) {
        e.preventDefault();
        if(login.email.length === 0){
            alert("email can not be empty");
            return false;
        }

        if (login.password.length === 0) {
            alert("password can not be empty");
            return false;
        }

        
        axios.post(baseUrl + "/api/user/login",{
            email: login.email,
            pw: login.password
        }).then((res) => {  if(res.data.success === 1){
            alert(res.data.message);
            localStorage.setItem("Token", res.data.token);
            localStorage.setItem("UserID", login.email);
            navigate("/"); 
            window.location.reload();
            }
        })
        .catch((error) => {
            alert("invalid email or password");
          });
    }

    return (
        <div className={style.formContent} onSubmit={onSubmit}>
            <Form>
                <h2 className={style.title}>Login</h2>

                <Form.Group controlId="Email" className="mb-3 mx-auto w-75 shadow-sm">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={login.email} onChange={e => setLogin({ email: e.target.value, password : login.password})} />
                </Form.Group>

                <Form.Group controlId="Password" className="mb-3 mx-auto w-75 shadow-sm">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={login.password} onChange={e => setLogin({ email: login.email, password : e.target.value})} />
                </Form.Group>

                <div className="text-center mb-3">
                    <div className="mb-3">Don't have account yet?
                        <a href="./register">Click here to register!</a>
                    </div>

                    <Button variant="primary" type="submit" size="lg">
                        Login
                    </Button>
                </div>
            </Form>
        </div>


    )

}

export default Login