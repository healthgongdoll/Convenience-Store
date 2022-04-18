import React from 'react'
import { Route,Navigate } from "react-router-dom";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export default function ProtectedRoute({isAuth: isAuth, component:component, ...rest}) {
  const userId = localStorage.getItem("UserID");
  const token = localStorage.getItem("Token");

  function isAuthAdmin(){
    if (userId && token) {
        axios({
          method: 'get',
          url: baseUrl + '/api/user/' + userId,
          headers: { "Authorization": "Bearer " + token},  
        }).then((response) => {
          console.log(response);
          if(response.status === 200 && response.data.admin === 1) {
            return true;
          }
        });
      }
}
  return (
    <Route
    {...rest}
    render = {
        (props) =>{
            if(isAuth){ return <component/>;}
            else if(isAuthAdmin){
                alert("you are not the admin");
                return (<Navigate to =  "/"/>);
            }
            else{ 
                alert("you are not logged in!");
                return (<Navigate to =  "/login"/>);}

        }
    }
    />
  )
}
