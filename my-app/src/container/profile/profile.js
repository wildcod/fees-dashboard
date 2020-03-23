import React, { useState } from 'react'
import Header from '../../component/common/header/header';
import { Button } from 'semantic-ui-react'
import './profile.css'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { Dropdown, Table, Modal, Form ,Input} from 'semantic-ui-react'
import { updateStudent ,submitFees} from '../../redux/actions/studentAction'
import { reformatDate, months, yearGenerator, stateOptions} from '../../utils/utilFunc'



const Profile = props => {

    const [ classAndStudentId, setClassAndStudentId ] = useState(props.match.params["classAndStudentId"]);
    const [ month, setMonth ] = useState(null);
    const [ monthAndYear, setMonthAndYear ] = useState(null);
    const [ checkAll, setCheckAll ] = useState(false);
    const [ dateFilter, setDateFilter ] = useState(false);
    const [ open, setOpen ] = useState(false);
    const [ name, setName ] = useState('');
    const [ date, setDate ] = useState('');
    const [ updateClass, setUpdateClass ] = useState(props.match.params["classAndStudentId"].split('$')[0]);
    const [ feesOpen, setFeesOpen ] = useState(false);
    const [ submit_date, setSubmit_date ] = useState('');
    const [ include, setInclude ] = useState('');


    const show = () => setOpen(true);
    const close = () => setOpen( false);

    const feesShow = () => setFeesOpen(true);
    const feesClose = () => setFeesOpen(false);

 const profileUpdateHandler = async(studentId) => {
     await props.updateStudent({name,date,updateClass,studentId});
     close();
 };

 const submitFeesHandler = async(studentId) => {
    if(submit_date.length > 0 && include.length > 0){
    await props.submitFees({submit_date,include,studentId});
    feesClose();
    }
 };


const [ classId, studentId ] = classAndStudentId.split('$');

const studentOfClassId = props.students.filter(student => {
    return student.class_name === classId
});

const selectedStudent = studentOfClassId.filter(student => {
    return student._id === studentId
});
   
const years = yearGenerator();
console.log(submit_date);

    return (
        <div>
            <Header />
            <div className="profile-main">
                <div className="profile-table">
                    <table>
                        <thead>
                            <tr>
                                <td>Name</td>
                                {/* <td >{selectedStudent[0].name}</td> */}
                                {selectedStudent[0] && <td>{selectedStudent[0].name}</td>   }
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>class</td>
                             {/* <td>{selectedStudent[0].class_name}</td> */}
                         {selectedStudent[0] && <td>{selectedStudent[0].class_name}</td>   }
                        </tr>
                        <tr>
                            <td>Joining Date</td>
                            <td>{ selectedStudent[0] &&  reformatDate(selectedStudent[0].joining_date.substring(0,10))}</td>
                        </tr>
                        </tbody>
                    </table>
                </div><br/>
                <div>
                <Button className="profile-edit" onClick={show}>Edit Profile</Button>
                <Button className="profile-edit" onClick={feesShow}>Submit Fees</Button>
                </div>
            </div>
            <div className="profile-fees-status">
                <div className="profile-dropdown">
            <Dropdown
                    placeholder='Select Month'
                    fluid
                    selection
                    options={months}
                    className="profile-month-dropdown"
                    name="month"
                    onChange={(e,data) => {
                        setMonth(data.value)
                    }}
            />&nbsp;&nbsp;
             <Dropdown
                    placeholder='Select Year'
                    fluid
                    selection
                    options={years}
                    name="year"
                    className="profile-month-dropdown"
                    onChange={(e,data) => {
                                     setMonthAndYear(month + '/' +  data.value);
                                     setCheckAll(false);
                                     setDateFilter(true);
                             }}
            />
            &nbsp;&nbsp;
            <Button onClick={() => {
                setCheckAll(true);
                setDateFilter(false);
            }}>All</Button>
            </div>
         
                <div className="profile-fees-table">
                <Table celled >
                    <Table.Header>
                    <Table.Row id="rw">
                        <Table.HeaderCell>Serial No</Table.HeaderCell>
                        <Table.HeaderCell>Submit Date</Table.HeaderCell>
                        <Table.HeaderCell>Include</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { (checkAll &&  (selectedStudent[0].submit_date_and_include.length > 0)) && selectedStudent[0].submit_date_and_include.map((record,i) => {
                            
                            return  <Table.Row key={record._id} id="rw">
                                        <Table.Cell>{i+1}</Table.Cell>
                                        <Table.Cell>{ reformatDate(record.submit_date.substring(0,10))}</Table.Cell>
                                        <Table.Cell>{record.include.toString()}</Table.Cell>
                                    </Table.Row>
                            
                        })}
                        { (dateFilter && (selectedStudent[0].submit_date_and_include.length > 0)) && selectedStudent[0].submit_date_and_include.filter(record => {
                            const date  = reformatDate(record.submit_date.substring(0,10));
                            return date.substring(3) === monthAndYear
                            
                        }).map((record,i) => { 
                            return  <Table.Row key={record._id} id="rw">
                                        <Table.Cell>{i+1}</Table.Cell>
                                        <Table.Cell>{reformatDate(record.submit_date.substring(0,10))}</Table.Cell>
                                        <Table.Cell>{record.include.toString()}</Table.Cell>
                                    </Table.Row>
                            
                        })
                     }
                    </Table.Body>
                </Table>
                </div>
            </div>
            <Modal size="tiny" open={open} onClose={close}>
            <Modal.Header>Edit Profile</Modal.Header>
            <Modal.Content>
                <Form  >
                    <Input type="text" placeholder="first name" name="name" 
                            className="profile-input-modal" value={name} onChange={(e) => setName(e.target.value)}/>
                    <Input type="date" placeholder="joining date" name="date" 
                            className="profile-input-modal" value={date} onChange={(e) => setDate(e.target.value)} />
                    <Input type="text" placeholder="class" name="updateClass" 
                             className="profile-input-modal" value={updateClass}  /><br/>
                    <Button style={{ background : "#21ba45", color : "#fff", marginLeft : "24px"}}
                      onClick={() => profileUpdateHandler(selectedStudent[0]._id)}>Submit</Button> &nbsp;&nbsp;
                    <Button onClick={close} style={{ background : "#db2828", color : "#fff"}}>Cancel</Button>
                </Form>
               </Modal.Content> 
            </Modal>
            <Modal size="tiny" open={feesOpen} onClose={feesClose}>
            <Modal.Header>Submit Fees</Modal.Header>
            <Modal.Content>
                <Form  >
                    <Input type="date" placeholder="joining date" name="submit_date" required
                            className="profile-input-modal" value={submit_date} onChange={(e) => setSubmit_date(e.target.value)} />
                    <Dropdown
                            placeholder='State'
                            fluid
                            multiple
                            search
                            selection
                            required
                            options={stateOptions}
                            onChange={(e,data) => setInclude(data.value)}
                            className="profile-dropdown-modal"
                        /><br/>
                    <Button style={{ background : "#21ba45", color : "#fff", marginLeft : "24px"}}
                      onClick={() => submitFeesHandler(selectedStudent[0]._id)}>Submit</Button> &nbsp;&nbsp;
                    <Button onClick={feesClose} style={{ background : "#db2828", color : "#fff"}}>Cancel</Button>
                </Form>
               </Modal.Content> 
            </Modal>
        </div>
    );
};

const mapStateToProps = state => ({
    students: state.authStore.students,
  });

  const mapActionToProps = () => {
    return {
        updateStudent,submitFees
    }
};


export default React.memo(withRouter(connect(mapStateToProps,mapActionToProps())(Profile)));




