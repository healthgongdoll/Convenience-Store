import React from 'react'
import Register from './Register'
import style from "./RegisterStyle.module.css";


function RegisterContainer() {
    return (
        <div>
        <div className = {style.background}>
        <div className={style.formContainer}>
            <Register></Register>
        </div>
        </div>
        </div>
    )
}

export default RegisterContainer