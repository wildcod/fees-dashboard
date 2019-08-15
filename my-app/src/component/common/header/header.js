import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import './header.css'

const Header = (props) => {

   const trigger = (
      <span >
        <Icon name='user' /> Hello, {props.name}
      </span>
    )

   const options = [
      
      // { key: 'profile', text: 'Your Profile' },
      // { key: 'settings', text: 'Settings' },
      { key: 'sign-out', text: 'Sign Out' },
    ]

      return (
        <div className="header">
           <span className="header-name">AK Tutor</span>
           <Dropdown trigger={trigger} options={options}  className="header-signedIn"/>
        </div>
      );
}

const mapStateToProps = state => ({
   name: state.authStore.name,
 });



export default connect(mapStateToProps)(Header)
