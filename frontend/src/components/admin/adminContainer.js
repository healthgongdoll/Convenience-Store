import React from 'react'
import style from "./adminStyle.module.css";
import Admin from "./admin"

function AdminContainer() {
    return (
        <div>
        <div className = {style.background}>
        <div className={style.formContainer}>
           <Admin></Admin>
        </div>
        </div>
        </div>
    )
}

export default AdminContainer