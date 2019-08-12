import React, {Component} from 'react'
import Header from '../../component/common/header/header'
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { Modal, Form, Button, Input} from 'semantic-ui-react'
import { createStudent} from '../../redux/actions/studentAction'
import './all-class.css'

class AllCLass extends Component {

    state = {
        selectValue : "",
        open : false,
        firstName : '',
        lastName : '',
        joiningDate : '',
        classOfStudent : ''
    }

    componentDidMount(){
        console.log(this.props)
    }

    handleChange = (e) => {  
        this.props.history.push('/students/'+ e.target.value)
    }

    changeHandler = (e) => {
        const { name, value } = e.target;
        this.setState({[name] : value});
    }

    createStudentHandler = async(e) => {
        const {firstName,lastName,joiningDate,classOfStudent} = this.state;
        const { userId} = this.props
        const name = firstName + ' ' + lastName;
        if(name.length > 0 && lastName.length > 0 && joiningDate.length > 0 && classOfStudent.length > 0
            && userId.length > 0){
       await this.props.createStudent({name,joiningDate,classOfStudent,userId});
        this.close();
            }
    }

    show = () => this.setState({open: true })
    close = () => this.setState({ open: false })


    render(){ 

        const { firstName, lastName, joiningDate, classOfStudent, open} = this.state

    return (
        <div>
            <Header />
            <div className="class-nav">
                  <div className="class-nav-heading">Classes</div>    
            </div>
            <button className="class-nav-btn" onClick={this.show} ><span className="class-nav-btn-content">create +</span></button>
            <div className="class-main">
                <div className="class-main-content">
                        <select className="class-dropdown-field"
                                value={this.state.selectValue} 
                                onChange={this.handleChange} 
                        >
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    <div>
                        <button className="class-btn">Submit</button>
                    </div>
                </div>
            </div>
            <Modal size="tiny" open={open} onClose={this.close}>
            <Modal.Header>Create Student</Modal.Header>
            <Modal.Content>
                <Form>
                    <Input type="text" placeholder="first name" name="firstName"
                            className="profile-input-modal" value={firstName} onChange={this.changeHandler} required/>
                    <Input type="text" placeholder="last name" name="lastName"
                            className="profile-input-modal" value={lastName} onChange={this.changeHandler} required/>
                    <Input type="date" placeholder="joining date" name="joiningDate"
                            className="profile-input-modal" value={joiningDate} onChange={this.changeHandler} required/>
                    <Input type="number" placeholder="class" name="classOfStudent" min="1" max="12"
                             className="profile-input-modal" value={classOfStudent} onChange={this.changeHandler} required /><br/>
                    <Button style={{ background : "#21ba45", color : "#fff", marginLeft : "24px"}}
                      onClick={this.createStudentHandler}>Submit</Button> &nbsp;&nbsp;
                    <Button onClick={this.close} style={{ background : "#db2828", color : "#fff"}}>Cancel</Button>
                </Form>
               </Modal.Content> 
            </Modal>
        </div>
    );
    }
}

const mapStateToProps = state => ({
    userId: state.authStore._id,
  });

const mapActionToProps = () => {
    return {
        createStudent
    }
}

export default withRouter(connect(mapStateToProps,mapActionToProps())(AllCLass))