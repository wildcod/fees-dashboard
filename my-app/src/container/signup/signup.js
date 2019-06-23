import React, {Component} from 'react'
import Header from '../../component/common/header/header'
import './signup.css'

class Signup extends Component {

    state = {
        firstname : '',
        lastname : '',
        email : '',
        password : ''
    }

    allChangeHandler = (e) => {
        const {name,value} = e.target
        this.setState({ [name] : value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
      }

   
    render(){
        return <div>
                <Header />
                <div className="signup-body">
                    <div className="signup-container">
                        <div className="signup-head">Signup</div>
                        <div className="signup-main">
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" required className="input" name="firstname" value={this.state.firstname} placeholder="First Name" onChange={this.allChangeHandler}/>
                                <input type="text" required className="input" placeholder="Last Name" name="lastname" value={this.state.lastname} onChange={this.allChangeHandler} />
                                <input type="text" required className="input" placeholder="Email" name="email" value={this.state.email} onChange={this.allChangeHandler}/>
                                <input type="password" required className="input" placeholder="Password" name="password" value={this.state.password} onChange={this.allChangeHandler}/>
                                <input type="submit" value="Submit" className="btn" /> 
                            </form>
                        </div>
                    </div>
                 </div>
                </div>
        }

}

export default Signup