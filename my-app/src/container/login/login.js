import React, {Component} from 'react'
import Header from '../../component/common/header/header'
import './login.css'

import { connect } from 'react-redux'
import { initiateLogin } from '../../redux/actions/authAction'

class Login extends Component {
   
    render(){
        return <div>
                    <Header />
                    <div className="login-body">
                        <div className="login-container">
                            <div className="login-head">Login</div>
                            <div className="login-main">
                                    <input type="text" required className="input" placeholder="Email"/>
                                    <input type="password" required className="input" placeholder="Password"/>
                                    <input type="button" value="Submit" className="btn" /> 
                            </div>
                        </div>
                    </div>
                </div>
        }

}

const mapStateToProps = state => ({
    loggedIn: state.authStore.loggedIn,
  });


const mapActionToProps = () => {
    return {
      initiateLogin
    }
}

export default connect(mapStateToProps,mapActionToProps())(Login)