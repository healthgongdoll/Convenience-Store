import React from 'react';
import {Button,Row} from 'react-bootstrap';
import style from "./adminStyle.module.css";
import {useNavigate} from "react-router-dom";

function Admin() {
    const navigate = useNavigate();
    return (
        <div className={style.formContent}>
        <h2 className={style.title}>Welcome Admin</h2>
        <div className="text-center mb-5 mt-3">   
        <Button variant="primary" size="lg" onClick= {() => {navigate("/adminEventTable");}}>
            Check webusage
        </Button>
        </div>  
        <div className="text-center mb-3 mt-3">   
        <Button variant="primary" size="lg" onClick= {() => {navigate("/adminOrdersTable");}}>
            Check order history
        </Button>
        </div>    
        </div>
    )


}

export default Admin