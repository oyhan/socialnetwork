import cookieCutter from 'cookie-cutter';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';



export default function PrivateRoute (props) {


    const jwt = cookieCutter.get("jwt")
    if (jwt)
      return (

        <Route {...props} path={props.path} >
            {props.children} 
        </Route>
      )
      else return (
          <Redirect to="/start" />
      )

    
}








