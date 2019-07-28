import React,{Component} from 'react'
import Header from '../../component/common/header/header';
import { Button } from 'semantic-ui-react'
import './profile.css'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { Dropdown, Table, Modal, Form ,Input} from 'semantic-ui-react'
import { updateStudent} from '../../redux/actions/studentAction'

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
         monthAndYear: null,
         checkAll : false,
         dateFilter : false,
         open : false,
         name : '',
         date : '',
         updateClass : ''
     }

 }

 changeHandler = (e,data) => {
     const {name,value} = data
     const { month } = this.state
     if(name == "year" && month && value){ 
         
       const updateMonthAndYear = month + '/' + value;
        this.setState({ monthAndYear : updateMonthAndYear, checkAll : false, dateFilter:true }) 
     }else{
        this.setState({[name] : value})
     }
 }

 checkStatusHandler = () => {
     const {month,year} = this.state;
     const monthAndYear = month + '/' + year;
     this.setState({ monthAndYear : monthAndYear , checkAll : false })  
 }

 shouldComponentUpdate(nextProps,nexState) {
    const propsDifference = this.props.students !== nextProps.students;
    const stateDifference = this.state !== nexState;
    return stateDifference || propsDifference
}

 checkAllHandler = () => {
     this.setState({ dateFilter : false,checkAll : true})
 }

 profileChangeHandler = (e) => {
        const { name, value } = e.target;
        this.setState({[name] : value});
 }

 profileUpdateHandler = async(studentId) => {
     const { name,date,updateClass } = this.state;
     await this.props.updateStudent({name,date,updateClass,studentId})
     this.close();
 }


 show = () => this.setState({open: true })
 close = () => this.setState({ open: false })

    
 render(){

    const { classAndStudentId ,checkAll, dateFilter,monthAndYear,open,
            name,date,updateClass
    } = this.state ;

    const [ classId, studentId ] = classAndStudentId.split('$');

    const studentOfClassId = this.props.students.filter(student => {
        return student.class_name == classId
    })

    const selectedStudent = studentOfClassId.filter(student => {
        return student._id == studentId
    })
    console.log(name,date,updateClass)

    return (
        <div>
            <Header />
            <div className="profile-main">
                <div className="profile-table">
                    <table>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td >{selectedStudent[0].name}</td>
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
                <div>
                <Button className="profile-edit" onClick={this.show}>Edit Profile</Button>
                <Button className="profile-edit" onClick={this.show}>Submit Fees</Button>
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
                        {checkAll && selectedStudent[0].submit_date_and_include.map((record,i) => {
                            return  <Table.Row key={record._id}>
                                        <Table.Cell>{i+1}</Table.Cell>
                                        <Table.Cell>{reformatDate(record.submit_date.substring(0,10))}</Table.Cell>
                                        <Table.Cell>{record.include.toString()}</Table.Cell>
                                    </Table.Row>
                        })}
                        {dateFilter && selectedStudent[0].submit_date_and_include.filter(record => {
                            const date  = reformatDate(record.submit_date.substring(0,10))
                            return date.substring(3) == monthAndYear
                        }).map((record,i) => {
                            return  <Table.Row key={record._id}>
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
            <Modal size="tiny" open={open} onClose={this.close}>
            <Modal.Header>Edit Profile</Modal.Header>
            <Modal.Content>
                <Form  >
                    <Input type="text" placeholder="first name" name="name"
                            className="profile-input-modal" value={name} onChange={this.profileChangeHandler}/>
                    <Input type="date" placeholder="joining date" name="date"
                            className="profile-input-modal" value={date} onChange={this.profileChangeHandler} />
                    <Input type="text" placeholder="class" name="updateClass"
                             className="profile-input-modal" value={updateClass} onChange={this.profileChangeHandler} /><br/>
                    <Button style={{ background : "#21ba45", color : "#fff", marginLeft : "24px"}}
                      onClick={() => this.profileUpdateHandler(selectedStudent[0]._id)}>Submit</Button> &nbsp;&nbsp;
                    <Button onClick={this.close} style={{ background : "#db2828", color : "#fff"}}>Cancel</Button>
                </Form>
               </Modal.Content> 
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
        updateStudent
    }
}


export default withRouter(connect(mapStateToProps,mapActionToProps())(Profile))

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


