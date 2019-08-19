import React,{Component} from 'react'
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

class Students extends Component {

    state = {
        open : false,
        deleteId:''
    }

    shouldComponentUpdate(nextProps,nexState) {
            const propsDifference = this.props.students !== nextProps.students;
            const stateDifference = this.state !== nexState;
            return stateDifference || propsDifference
    }


    handleDelete = async() =>{
        const { deleteId } = this.state
        await this.props.deleteStudent({deleteId});
        this.close();
    }

    handleName = (studentId) => {
        this.props.history.push('/profile/'+ this.props.match.params.classId + '$' + studentId)
    }

    show = (deleteId) =>{ 
        this.setState({ open:true,deleteId })
       }
    close = () => this.setState({ open: false })
    render(){
        const classId = this.props.match.params.classId;

        const {open} = this.state

        const studentOfClassId = this.props.students.filter(student => {
            return student.class_name == classId
        })
    
        const students = studentOfClassId.map(student => {
            let classStatus = "students-status-false";
            let res = false
            var today = new Date();
            var date = (today.getMonth()+1)+'/'+today.getFullYear();
            
            res = student["submit_date_and_include"].find(function(e){
                var submitDate = new Date(e.submit_date)
                    let modifiedSubmitDate = (submitDate.getMonth() + 1) + '/' + submitDate.getFullYear()
                      return modifiedSubmitDate == date
                    })
            if(res && res.submit_date.length > 0){
                classStatus = "students-status-true"
            }

            return  <div className="students-list-items" key={student._id}>
                            <div className="students-name" onClick={() => this.handleName(student._id)}>{student.name.capitalize()}</div>
                            <div className="students-update">
                            <span className={classStatus}></span>
                            <span className="students-update-icons">
                                    {/* <i className="fas fa-edit"></i>&nbsp; &nbsp;  */}
                                    <i className="fas fa-trash"  onClick={() => { this.show(student._id)}}></i>
                            </span>
                            </div>
                    </div>
        })
    return (
        <div>
            <Header />
            <div className="students-heading">
                <div className="students-heading-content">Class {classId}</div>
            </div>
            <div className="students-main">
                <div className="students-list-container">
                    {students}
                </div>
            </div>
            <Modal size="mini" open={open} onClose={this.close}>
                <Modal.Header>Delete Your Account</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete your account</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.close}>No</Button>
                    <Button positive icon='checkmark' onClick={this.handleDelete} labelPosition='right' content='Yes' />
                </Modal.Actions>
            </Modal>
        </div>
    );
}
}

const mapStateToProps = state => ({
    students: state.authStore.students,
  });

  const mapActionToProps = () => {
    return {
      deleteStudent
    }
}

export default withRouter(connect(mapStateToProps,mapActionToProps())(Students))