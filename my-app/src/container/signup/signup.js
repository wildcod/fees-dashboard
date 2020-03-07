import React, {useState} from 'react'
import Header from '../../component/common/header/header'
import './signup.css'

import {connect} from 'react-redux' 
import { withRouter } from "react-router";
import {initiateSignup} from '../../redux/actions/authAction'

const Signup = props => {

    const { firstName, setFirstName } = useState('');
    const { lastName , setLastName } = useState('');
    const { email , setEmail } = useState('');
    const { password , setPassword } = useState('');


    const allChangeHandler = (e) => {
        const { name, value } = e.target;
        switch(name){
            case "firstName" : setFirstName(value);
                               return;
            case "lastName" : setLastName(value);
                                return;
            case "email" : setEmail(value);
                                return;
            case "password" : setPassword(value);
                                return;
            default : return;
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const name = firstName + ' ' + lastName;
        await props.initiateSignup({name , email, password});
        props.history.push('/login');
      };

    return <div>
            {/* <Header /> */}
            <div className="signup-body">
                <div className="signup-container">
                    <div className="signup-head">Signup</div>
                    <div className="signup-main">
                        <form onSubmit={handleSubmit}>
                            <input type="text" required className="input" name="firstName" value={firstName} placeholder="First Name" onChange={allChangeHandler}/>
                            <input type="text" required className="input" placeholder="Last Name" name="lastName" value={lastName} onChange={allChangeHandler} />
                            <input type="text" required className="input" placeholder="Email" name="email" value={email} onChange={allChangeHandler}/>
                            <input type="password" required className="input" placeholder="Password" name="password" value={password} onChange={allChangeHandler}/>
                            <input type="submit" value="Submit" className="btn" />
                        </form>
                    </div>
                </div>
             </div>
            </div>
};

const mapStateToProps = state => ({
    signedUp: state.authStore.signedUp,
  });


const mapActionToProps = () => {
    return {
      initiateSignup
    }
}

export default withRouter(connect(mapStateToProps,mapActionToProps())(Signup))