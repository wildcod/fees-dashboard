import React, {Component} from 'react'
import './login.css'

import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { initiateLogin } from '../../redux/actions/authAction'

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            errorMessageStatus : false
        }
    }

    componentDidMount(){
        console.log(this.props)
    }


    allChangeHandler = (e) => {
        const {name,value} = e.target
        this.setState({ [name] : value})
    }

    handleLogin = async(e) => {
        e.preventDefault();
        this.setState({errorMessageStatus : false})
        const { email, password } = this.state
        await this.props.initiateLogin({email, password})
        if(this.props.loggedIn){
           this.props.history.push('/classes')
        }else{
            this.setState({errorMessageStatus : true})
        }
    }
   
    render(){
        return <div>
                    { this.state.errorMessageStatus &&
                     <div className="login-status">Login Failed</div>
                    }
                    <div className="login-body">
                        <div className="login-container">
                            <div className="login-head">Login</div>
                            <div className="login-main">
                                <form onSubmit={this.handleLogin}>
                                    <input type="text" required className="input"name="email" value={this.state.email} placeholder="Email" onChange={this.allChangeHandler}/>
                                    <input type="password" required className="input" placeholder="Password" name="password" value={this.state.password} onChange={this.allChangeHandler}/>
                                    <input type="submit" value="Submit" className="btn" /> 
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        }
    }

const mapStateToProps = state => ({
    loggedIn: state.authStore.loggedIn
  });


const mapActionToProps = () => {
    return {
      initiateLogin
    }
}

export default withRouter(connect(mapStateToProps,mapActionToProps())(Login))