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
//YYYY-MM-DD to DD-MM-YYYY
function reformatDate(dateStr)
{
  let dArr = dateStr.split("-");  // ex input "2010-01-18"
  return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0]; //ex out: "18/01/10"
}


class Profile extends Component {

 constructor(props){
     super(props)

     this.state = {
         classAndStudentId : this.props.match.params["classAndStudentId"],
         month : null,
         year : null,
         monthAndYear: null,
         checkAll : null
     }

 }

 changeHandler = (e,data) => {
     const {name,value} = data
     this.setState({[name] : value})
 }

 checkStatusHandler = () => {
     const {month,year} = this.state;
     const monthAndYear = month + '/' + year;
     this.setState({monthAndYear : monthAndYear})  
 }

 checkAllHandler = () => {
     this.setState({ checkAll : true})
 }


    
 render(){

    const { classAndStudentId , monthAndYear, checkAll} = this.state ;

    const [ classId, studentId ] = classAndStudentId.split('$');

    const studentOfClassId = this.props.students.filter(student => {
        return student.class_name == classId
    })

    const selectedStudent = studentOfClassId.filter(student => {
        return student._id == studentId
    })
    let studentFeesRecord;

   console.log(monthAndYear)
    if(monthAndYear || checkAll){
        if(monthAndYear){
                studentFeesRecord = selectedStudent[0].submit_date_and_include.filter(records => {
                    return records.submit_date.substring(2) == monthAndYear
                }).map((record,i) => {
                    return  <Table.Row key={record._id}>
                                <Table.Cell>{i+1}</Table.Cell>
                                <Table.Cell>{reformatDate(record.submit_date.substring(0,10))}</Table.Cell>
                                <Table.Cell>{record.include.toString()}</Table.Cell>
                            </Table.Row>
               })
        }
        else if(checkAll){
               studentFeesRecord = selectedStudent[0].submit_date_and_include.map((record,i) => {
                return  <Table.Row key={record._id}>
                            <Table.Cell>{i+1}</Table.Cell>
                            <Table.Cell>{reformatDate(record.submit_date.substring(0,10))}</Table.Cell>
                            <Table.Cell>{record.include.toString()}</Table.Cell>
                        </Table.Row>
    })
        }
    }
  

    return (
        <div>
            <Header />
            <div className="profile-main">
                <div className="profile-table">
                    <table>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>{selectedStudent[0].name}</td>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>class</td>
                            <td>{selectedStudent[0].class_name}</td>
                        </tr>
                        <tr>
                            <td>Joining Date</td>
                            <td>{reformatDate(selectedStudent[0].joining_date.substring(0,10))}</td>
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
                    name="month"
                    onChange={this.changeHandler}
            />&nbsp;&nbsp;
             <Dropdown
                    placeholder='Select Year'
                    fluid
                    selection
                    options={years}
                    name="year"
                    className="profile-month-dropdown"
                    onChange={this.changeHandler}
            />
            &nbsp;&nbsp;
            <Button onClick={this.checkStatusHandler}>Check</Button>
            &nbsp;&nbsp;
            <Button onClick={this.checkAllHandler}>All</Button>
            </div>
         
                <div className="profile-fees-table">
                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Serial No</Table.HeaderCell>
                        <Table.HeaderCell>Submit Date</Table.HeaderCell>
                        <Table.HeaderCell>Include</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {studentFeesRecord}
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
		"value": "01"
	},
	{
        "key": "Feb",
        "text" : "February",
		"value": "02"
	},
	{
        "key": "Mar",
        "text" : "March",
		"value": "03"
	},
	{
        "key": "Apr",
        "text" : "April",
		"value": "04"
	},
	{
        "key": "May",
        "text" : "May",
		"value": "05"
	},
	{
        "key": "Jun",
        "text" : "June",
		"value": "06"
	},
	{
        "key": "Jul",
        "text" : "July",
		"value": "07"
	},
	{
        "key": "Aug",
        "text" : "August",
		"value": "08"
	},
	{
        "key": "Sep",
        "text" : "September",
		"value": "09"
	},
	{
        "key": "Oct",
        "text" : "October",
		"value": "10"
	},
	{
        "key": "Nov",
        "text" : "November",
		"value": "11"
	},
	{
        "key": "Dec",
        "text" : "December",
		"value": "12"
	}
]
