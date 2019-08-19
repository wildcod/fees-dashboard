import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { initiateLogout } from '../../../redux/actions/authAction'
import { withRouter } from "react-router";
import './header.css'

class Header extends React.Component  {

  logOutHandler = async() => {
    await this.props.initiateLogout();
    this.props.history.push('/login')
  }
      render(){

        const options = [
      
          // { key: 'profile', text: 'Your Profile' },
          // { key: 'settings', text: 'Settings' },
          { key: 'sign-out', text: 'Sign Out'  },
        ]


   const  trigger = (
      <span >
        <Icon name='user' /> Hello, {this.props.name}
      </span>
    )

          return (
            <div className="header">
              <span className="header-name">AK Tutor</span>
              <Dropdown trigger={trigger} options={options} onChange={this.logOutHandler}  className="header-signedIn"/>
            </div>
          );
      }
}

const mapStateToProps = state => ({
   name: state.authStore.name,
 });

 const mapActionToProps = () => {
  return {
     initiateLogout
  }
}


export default withRouter(connect(mapStateToProps,mapActionToProps())(Header))
