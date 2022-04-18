import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import style from "./RegisterStyle.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL;

function Register() {
    /**
     * Registration State Variables
     */
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [state, setState] = useState("ON");
    const [zip, setZip] = useState("");
    /*
    * password validation message
    */
    // const passwordValidationMessage = ["*The password length must be in length 8-16",
    //     "*The password must contain one or more uppercase characters",
    //     "*The password must contain one or more lowercase characters",
    //     "*The password must contain one or more numeric values"] // handle it

    /**
     * Error handle:
     * 1. control changes when a focus is hovered in the password block or
     * when a user inputs two passwords that do not match
     * 2. errorMsg is an array with two possible errors. Either the email already
     * exists in the database or the passwords do not match.
     */
    const [control, setControl] = useState(true);
    const navigate = useNavigate();



    const onSubmit = async (e) => {
        e.preventDefault();
        if (firstName.length === 0 || lastName === 0) {
            setControl(false);
            alert("first name and last name can not be empty");
            return false;
        }


        if (phone.length === 0) {
            setControl(false);
            alert("phone can not be empty");
            return false;
        }

        if (email.length === 0) {
            setControl(false);
            alert("email can not be empty");
            return false;
        }

        if (password.length < 8 || password.length > 16) {
            setControl(false);
            alert("password length should be in 8-16");
            return false;
        }
        else if (!/[A-Z]/.test(password)) {
            setControl(false);
            alert("password length should have at least one uppercase character");
            return false;
        }
        else if (!/[a-z]/.test(password)) {
            setControl(false);
            alert("password length should have at least one lowercase character");
            return false;
        }
        else if (!/[0-9]/.test(password)) {
            setControl(false);
            alert("password length should have at least one number");
            return false;
        }
        else if (password != password2) {
            setControl(false);
            alert("passwords does not match");
            return false;
        }

        if (firstName.length === 0 || lastName === 0) {
            setControl(false);
            alert("first name or last name can not be empty");
            return false;
        }

        if (city.length === 0 || street.length === 0 || zip.length === 0) {
            setControl(false);
            alert("city, street and zip can not be empty");
            return false;
        }

        if (zip.length != 6) {
            setControl(false);
            alert("Zip style incorrect, should be in 6 digits");
            return false;
        }

        const config3 = {
            method: 'get',
            url: baseUrl + "/api/user"
        }
        
        const res3 = await axios(config3);
        const records = res3.data;
      
        for (var i = 0; i < Number(records.data.length); i++) {
            if(records.data[i]['email'] === email){
                alert("email already exist");
                return false;
            }
          }
        

        const config = {
            method: 'post',
            url: baseUrl + "/api/user",
            data: {
                email: email,
                pw: password,
                fname: firstName,
                lname: lastName,
                admin: 0
            }
        }

        const config2 = {
            method: 'post',
            url: baseUrl + "/api/user/address",
            data: {
                street: street, province: state, zip: zip, phone: phone, userEmail: email
            }
        }

       
        
        const res1 = await axios(config);

        const res2 = await axios(config2);

        if (res1.data.success === 1 && res2.data.success === 1) {
            alert("You are registered!");
            navigate("/login"); 
        }

        if (res1.status === '500' || res2.status === '500') {
            alert("database connection problem");
        }

        return true;
    }

    return (
        <div className={style.formContent}>
            <Form onSubmit={onSubmit}>
                <h2 className={style.title}>Create Account</h2>
                <Row className="mb-3 mx-auto w-75 ">
                    <Form.Group as={Col} controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="Text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="Text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </Form.Group>
                </Row>

                <Row className="mb-3 mx-auto w-75">
                    <Form.Group controlId="Phone" className="w-100">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </Form.Group>
                </Row>

                <Row className="mb-3 mx-auto w-75">
                    <Form.Group controlId="Email" className="w-100">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                </Row>

                <Row className="mb-3 mx-auto w-75">
                    <Form.Group controlId="formGridPassword" className="w-100">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Form.Text id="passwordHelp" muted>
                            Your password must be 8-16 characters long, must contain uppercase and lowercase letters and numbers, and
                            must not contain spaces, special characters, or emoji.
                        </Form.Text>
                    </Form.Group>
                </Row>

                <Row className="mb-3 mx-auto w-75">
                    <Form.Group controlId="formGridPassword2" className="w-100">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                    </Form.Group>
                </Row>

                <Row className="mb-3 mx-auto w-75">
                    <Form.Group as={Col} controlId="formGridStreet">
                        <Form.Label>Street</Form.Label>
                        <Form.Control type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
                    </Form.Group>



                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                    </Form.Group>
                </Row>

                <Row className="mb-3 mx-auto w-75">
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Select value={state} onChange={(e) => setState(e.target.value)}>
                            <option value="ON">Ontario</option>
                            <option value="BC">British Columbia</option>
                            <option value="PQ">Quebec</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
                    </Form.Group>
                </Row>

                <div className="text-center mb-3">
                    <div className="mb-3">Already a member?
                        <a href="./login">Click here to login!</a>
                    </div>

                    <Button variant="primary" type="submit" size="lg">
                        Register
                    </Button>
                </div>
            </Form>
        </div>


    )

}

export default Register