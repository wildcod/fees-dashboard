import React, {Component, useState} from 'react'
import Header from '../../component/common/header/header';
import './students.css'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { Button,Modal } from 'semantic-ui-react'
import { deleteStudent } from '../../redux/actions/studentAction'

let studentOfClassId;

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

const Students = props => {

    const [ open, setOpen ] = useState(false);
    const [ deleteId, setDeleteId ] = useState('');

    // shouldComponentUpdate(nextProps,nexState) {
    //         const propsDifference = this.props.students !== nextProps.students;
    //         const stateDifference = this.state !== nexState;
    //         return stateDifference || propsDifference
    // }

    const close = () => setOpen(false);

   const handleDelete = async() =>{
        await props.deleteStudent({deleteId});
        close();
    };

   const handleName = (studentId) => {
        props.history.push('/profile/'+ props.match.params.classId + '$' + studentId)
    };

   const show = (deleteId) => {
        setOpen(true);
        setDeleteId(deleteId);
       };

    const classId = props.match.params.classId;

    const studentOfClassId = props.students.filter(student => {
            return student.class_name === classId;
        });
    
        const students = studentOfClassId.map(student => {
            let classStatus = "students-status-false";
            let res = false;
            var today = new Date();
            var date = (today.getMonth()+1)+'/'+today.getFullYear();
            
            res = student["submit_date_and_include"].find(function(e){
                var submitDate = new Date(e.submit_date);
                    let modifiedSubmitDate = (submitDate.getMonth() + 1) + '/' + submitDate.getFullYear();
                      return modifiedSubmitDate === date
                    });
            if(res && res.submit_date.length > 0){
                classStatus = "students-status-true"
            }

            return  <div className="students-list-items" key={student._id}>
                            <div className="students-name" onClick={() => handleName(student._id)}>{student.name.capitalize()}</div>
                                    <div className="students-update">
                                    <span className={classStatus}></span>
                                    <span className="students-update-icons">
                                    <i className="fas fa-trash"  onClick={() => show(student._id)} />
                                    </span>
                            </div>
                    </div>
        });
    return (
        <div>
            <Header />
            <div className="students-heading">
                <div className="students-heading-content">Class{classId}</div>
            </div>
            <div className="students-main">
                <div className="students-list-container">
                    {students}
                </div>
            </div>
            <Modal size="mini" open={open} onClose={close}>
                <Modal.Header>Delete Your Account</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete your account</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={close}>No</Button>
                    <Button positive icon='checkmark' onClick={handleDelete} labelPosition='right' content='Yes' />
                </Modal.Actions>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => ({
    students: state.authStore.students,
  });

  const mapActionToProps = () => {
    return {
      deleteStudent
    }
};

export default React.memo(withRouter(connect(mapStateToProps,mapActionToProps())(Students)));