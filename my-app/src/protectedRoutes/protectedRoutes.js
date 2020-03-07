import React from 'react';
import { Route, Redirect } from 'react-router-dom'


const ProtectedRoutes = ({ component : Component, loggedIn , ...rest}) => {
  return (
    <Route 
        {...rest}
        render={props => {
            if(loggedIn){
                return <Component {...props} />
            }
            else{
                return <Redirect to={
                    {
                        pathname : '/login',
                        state : {
                            from : props.location
                        }
                    }
                }
                />
            }
        }}
    />
  );
};

export default ProtectedRoutes;