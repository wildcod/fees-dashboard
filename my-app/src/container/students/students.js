import React,{Component} from 'react'
import Header from '../../component/common/header/header';
import './students.css'
import { connect } from 'react-redux'
import { withRouter } from "react-router";

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

class Students extends Component {

    handleDelete = (delteId) =>{
        
    }

    render(){
        const classId = this.props.match.params.classId;


        const studentOfClassId = this.props.students.filter(student => {
            return student.class_name == classId
        })
    
        const students = studentOfClassId.map(student => {
            let classStatus = "students-status-false";
    
            if(student.status){
                classStatus = "students-status-true"
            }
            return  <div className="students-list-items" key={student._id}>
                            <div className="students-name">{student.name.capitalize()}</div>
                            <div className="students-update">
                            <span className={classStatus}></span>
                            <span className="students-update-icons">
                                    <i className="fas fa-edit"></i>&nbsp; &nbsp; 
                                    <i className="fas fa-trash"  onClick={() => { this.handleDelete(student._id)}}></i>
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
        </div>
    );
}
}

const mapStateToProps = state => ({
    students: state.authStore.students,
  });

export default withRouter(connect(mapStateToProps)(Students))