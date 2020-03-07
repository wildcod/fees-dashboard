import React, { useState } from 'react'
import Header from '../../component/common/header/header'
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { Modal, Form, Button, Input} from 'semantic-ui-react'
import { createStudent} from '../../redux/actions/studentAction'
import './all-class.css'

const AllCLass = props => {

    const { firstName, setFirstName } = useState('');
    const { lastName , setLastName } = useState('');
    const { selectValue , setSelectValue } = useState('');
    const { joiningDate , setJoiningDate } = useState('');
    const { classOfStudent , setClassOfStudent } = useState('');
    const { open , setOpen } = useState(false);


    const handleChange = (e) => {
       props.history.push('/students/'+ e.target.value)
    };

   const changeHandler = (e) => {
        const { name, value } = e.target;
       switch(name){
           case "firstName" : setFirstName(value);
               return;
           case "lastName" : setLastName(value);
               return;
           case "joiningDate" : setJoiningDate(value);
               return;
           case "classOfStudent" : setClassOfStudent(value);
               return;
           default : return;
       }
    };

    const show = () => setOpen(true);
    const close = () => setOpen(false);

   const createStudentHandler = async(e) => {
        const { userId } = props;
        const name = firstName + ' ' + lastName;
        if(name.length > 0 && lastName.length > 0 && joiningDate.length > 0 && classOfStudent.length > 0 && userId.length > 0)
           {
               await props.createStudent({name,joiningDate,classOfStudent,userId});
                       close();
            }
    };

    return (
        <div>
            <Header />
            <div className="class-nav">
                  <div className="class-nav-heading">Classes</div>    
            </div>
            <div className="class-main">
                <div className="class-main-content">
                        <select className="class-dropdown-field"
                                value={selectValue}
                                onChange={handleChange}
                        >
                            {
                                [4, 5, 6, 7, 8, 9, 10, 11, 12].map((data,i) => {
                                             return <option value={data} key={i}>{data}</option>
                                })
                            }
                        </select>
                    <div>
                        <button className="class-btn">Submit</button>
                    </div>
                </div>
            </div>
            <br/>
            <div className="class-nav-create-btn">
            <button className="class-nav-btn" onClick={show} ><span className="class-nav-btn-content">Create +</span></button>
            </div>
            <Modal size="tiny" open={open} onClose={close}>
            <Modal.Header>Create Student</Modal.Header>
            <Modal.Content>
                <Form>
                    <Input type="text" placeholder="first name" name="firstName"
                            className="profile-input-modal" value={firstName} onChange={changeHandler} required/>
                    <Input type="text" placeholder="last name" name="lastName"
                            className="profile-input-modal" value={lastName} onChange={changeHandler} required/>
                    <Input type="date" placeholder="joining date" name="joiningDate"
                            className="profile-input-modal" value={joiningDate} onChange={changeHandler} required/>
                    <Input type="number" placeholder="class" name="classOfStudent" min="1" max="12"
                             className="profile-input-modal" value={classOfStudent} onChange={changeHandler} required /><br/>
                    <Button style={{ background : "#21ba45", color : "#fff", marginLeft : "24px"}}
                      onClick={createStudentHandler}>Submit</Button> &nbsp;&nbsp;
                    <Button onClick={close} style={{ background : "#db2828", color : "#fff"}}>Cancel</Button>
                </Form>
               </Modal.Content> 
            </Modal>
        </div>
    );
};


const mapStateToProps = state => ({
    userId: state.authStore._id,
  });

const mapActionToProps = () => {
    return {
        createStudent
    }
};

export default withRouter(connect(mapStateToProps,mapActionToProps())(AllCLass))