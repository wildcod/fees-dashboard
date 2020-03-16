import React, { useState, useEffect } from 'react'
import './login.css'

import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { initiateLogin } from '../../redux/actions/authAction'

const Login = props => {
    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('');
    const [ errorMessageStatus , setErrorMessageStatus ] = useState(false);

    console.log('>>>>>>>>>>13',props);


   const handleLogin = async(e) => {
        e.preventDefault();
       setErrorMessageStatus(false);
        await props.initiateLogin({email, password});
        if(props.loggedIn){
           props.history.push('/classes')
        }else{
            setErrorMessageStatus(true);
        }
    };

   return <div>
            { errorMessageStatus &&
             <div className="login-status">Login Failed</div>
            }
            <div className="login-body">
                <div className="login-container">
                    <div className="login-head">Login</div>
                    <div className="login-main">
                        <form onSubmit={handleLogin}>
                            <input type="text" required className="input"name="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" required className="input" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <input type="submit" value="Submit" className="btn" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
};

const mapStateToProps = state => ({
    loggedIn: state.authStore.loggedIn
  });


const mapActionToProps = () => {
    return {
      initiateLogin
    }
};

export default withRouter(connect(mapStateToProps,mapActionToProps())(Login));