import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { initiateLogout } from '../../../redux/actions/authAction'
import { withRouter } from "react-router";
import './header.css'

const Header = props => {

  const logOutHandler = async() => {
    await props.initiateLogout();
    props.history.push('/login')
  };

    const options = [
      // { key: 'profile', text: 'Your Profile' },
      // { key: 'settings', text: 'Settings' },
      { key: 'sign-out', text: 'Sign Out'  },
    ];


   const  trigger = (
      <span >
        <Icon name='user' /> Hello, {props.name.split(' ')[0]}
      </span>
    );

      return (
        <div className="header">
          <span className="header-name" onClick={() => props.history.push('/classes')}>AK Tutor</span>
          <Dropdown trigger={trigger} options={options} onChange={logOutHandler}  className="header-signedIn"/>
        </div>
      );

};

const mapStateToProps = state => ({
   name: state.authStore.name,
 });

 const mapActionToProps = () => {
  return {
     initiateLogout
  }
};


export default withRouter(connect(mapStateToProps,mapActionToProps())(Header))
