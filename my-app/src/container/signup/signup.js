import React, {useEffect, useState} from 'react'
import Header from '../../component/common/header/header'
import './signup.css'

import {connect} from 'react-redux' 
import { withRouter } from "react-router";
import {initiateSignup} from '../../redux/actions/authAction'

const Signup = props => {

    const [ firstName, setFirstName ] = useState('');
    const [ lastName , setLastName ] = useState('');
    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('');
    const [ errorMessageStatus , setErrorMessageStatus ] = useState(false);
    const [ signUpStatus, setSignUpStatus] = useState(false);

    useEffect(() => {
        if(props.signedUp){
            props.history.push('/login');
        }else if(props.errorStatus !== null){
            setErrorMessageStatus(true)
        }
    },[signUpStatus]);


    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrorMessageStatus(false);
        setSignUpStatus(true);
        const name = firstName + ' ' + lastName;
        await props.initiateSignup({name , email, password});
        setSignUpStatus(false);
      };

    return <div>
            {/* <Header /> */}
        { errorMessageStatus &&
        <div className="signup-status">SignUp Failed</div>
        }
            <div className="signup-body">
                <div className="signup-container">
                    <div className="signup-head">Signup</div>
                    <div className="signup-main">
                        <form onSubmit={handleSubmit}>
                            <input type="text" required className="input" name="firstName" value={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
                            <input type="text" required className="input" placeholder="Last Name" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <input type="text" required className="input" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" required className="input" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <input type="submit" value="Submit" className="btn" />
                        </form>
                    </div>
                </div>
             </div>
            </div>
};

const mapStateToProps = state => ({
    signedUp: state.authStore.signedUp,
    errorStatus : state.errorStore.status
  });


const mapActionToProps = () => {
    return {
      initiateSignup
    }
};

export default withRouter(connect(mapStateToProps,mapActionToProps())(Signup))