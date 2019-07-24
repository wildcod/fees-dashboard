import React,{Component} from 'react'
import Header from '../../component/common/header/header';
import { Button } from 'semantic-ui-react'
import './profile.css'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { Dropdown, Table } from 'semantic-ui-react'

//year generator
var min = new Date("03/11/2010").getFullYear(),
    max = new Date().getFullYear();
let years = [];
for (var i = min; i<=max; i++){
    years.push({ key : i, text:i, value:i});
}


class Profile extends Component {

//  constructor(props){
//      super(props)

//      this.state = {
//          classAndStudentId : this.props.match.params["classAndStudentId"]
//      }

//  }

    
 render(){

    // const { classAndStudentId } = this.state ;

    // const [ classId, studentId ] = classAndStudentId.split('$');

    // const studentOfClassId = this.props.students.filter(student => {
    //     return student.class_name == classId
    // })

    // const selectedStudent = studentOfClassId.filter(student => {
    //     return student._id == studentId
    // })

  

    return (
        <div>
            <Header />
            <div className="profile-main">
                <div className="profile-table">
                    <table>
                        <thead>
                            <tr>
                                <td>Name</td>
                                {/* <td>{selectedStudent[0].name}</td> */}
                                <td>Name</td>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>class</td>
                            {/* <td>{selectedStudent[0].class_name}</td> */}
                            <td>Name</td>
                        </tr>
                        <tr>
                            <td>Joining Date</td>
                            {/* <td>{selectedStudent[0].joining_date.substring(0,10)}</td> */}
                            <td>Name</td>
                        </tr>
                        </tbody>
                    </table>
                </div><br/>
                <Button className="profile-edit">Edit Profile</Button>
            </div>
            <div className="profile-fees-status">
                <div className="profile-dropdown">
            <Dropdown
                    placeholder='Select Month'
                    fluid
                    selection
                    options={months}
                    className="profile-month-dropdown"
            />&nbsp;&nbsp;
             <Dropdown
                    placeholder='Select Year'
                    fluid
                    selection
                    options={years}
                    className="profile-month-dropdown"
            />
            </div>
         
                <div className="profile-fees-table">
                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Submit Date</Table.HeaderCell>
                        <Table.HeaderCell>Include</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    <Table.Row>
                        <Table.Cell>Sahil Kanojia</Table.Cell>
                        <Table.Cell>12-10-2019</Table.Cell>
                        <Table.Cell>Manish, Sahil</Table.Cell>
                    </Table.Row>
                    </Table.Body>
                </Table>
                </div>
            </div>
        </div>
    );
 }
}

const mapStateToProps = state => ({
    students: state.authStore.students,
  });


export default withRouter(connect(mapStateToProps)(Profile))

const months = [
	{
        "key": "Jan",
        "text" : "January",
		"value": "January"
	},
	{
        "key": "Feb",
        "text" : "February",
		"value": "February"
	},
	{
        "key": "Mar",
        "text" : "March",
		"value": "March"
	},
	{
        "key": "Apr",
        "text" : "April",
		"value": "April"
	},
	{
        "key": "May",
        "text" : "May",
		"value": "May"
	},
	{
        "key": "Jun",
        "text" : "June",
		"value": "June"
	},
	{
        "key": "Jul",
        "text" : "July",
		"value": "July"
	},
	{
        "key": "Aug",
        "text" : "August",
		"value": "August"
	},
	{
        "key": "Sep",
        "text" : "September",
		"value": "September"
	},
	{
        "key": "Oct",
        "text" : "October",
		"value": "October"
	},
	{
        "key": "Nov",
        "text" : "November",
		"value": "November"
	},
	{
        "key": "Dec",
        "text" : "December",
		"value": "December"
	}
]

const submit_date = [
    {}
]