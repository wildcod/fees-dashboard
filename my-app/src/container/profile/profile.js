import React,{Component} from 'react'
import Header from '../../component/common/header/header';
import { Button } from 'semantic-ui-react'
import './profile.css'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { Dropdown, Table, Modal, Form ,Input} from 'semantic-ui-react'
import { updateStudent ,submitFees} from '../../redux/actions/studentAction'
import { reformatDate, months, yearGenerator, stateOptions} from '../../utils/utilFunc'



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
         updateClass : '',
         feesOpen : false,
         submit_date: '',
         include : ''
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

 includeHandler = (e,data) => {
    const {  value } = data;
    this.setState({include : value})
 }

 profileUpdateHandler = async(studentId) => {
     const { name,date,updateClass } = this.state;
     await this.props.updateStudent({name,date,updateClass,studentId})
     this.close();
 }

 submitfeesChandler = async(studentId) => {
    const { submit_date, include } = this.state;
    if(submit_date .length > 0 && include.length > 0){
    await this.props.submitFees({submit_date,include,studentId})
    this.feesClose();
    }
 }

 show = () => this.setState({open: true })
 close = () => this.setState({ open: false })

 feesShow = () => this.setState({feesOpen: true })
 feesClose = () => this.setState({ feesOpen: false })

    
 render(){

    const { classAndStudentId ,checkAll, dateFilter,monthAndYear,open,
            name,date,updateClass,feesOpen,submit_date
    } = this.state ;

    const [ classId, studentId ] = classAndStudentId.split('$');

    const studentOfClassId = this.props.students.filter(student => {
        return student.class_name == classId
    })

    const selectedStudent = studentOfClassId.filter(student => {
        return student._id == studentId
    })
   
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
                <Button className="profile-edit" onClick={this.feesShow}>Submit Fees</Button>
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
            <Modal size="tiny" open={feesOpen} onClose={this.feesClose}>
            <Modal.Header>Submit Fees</Modal.Header>
            <Modal.Content>
                <Form  >
                    <Input type="date" placeholder="joining date" name="submit_date" required
                            className="profile-input-modal" value={submit_date} onChange={this.profileChangeHandler} />
                    <Dropdown
                            placeholder='State'
                            fluid
                            multiple
                            search
                            selection
                            required
                            options={stateOptions}
                            onChange={this.includeHandler}
                            className="profile-dropdown-modal"
                        /><br/>
                    <Button style={{ background : "#21ba45", color : "#fff", marginLeft : "24px"}}
                      onClick={() => this.submitfeesChandler(selectedStudent[0]._id)}>Submit</Button> &nbsp;&nbsp;
                    <Button onClick={this.feesClose} style={{ background : "#db2828", color : "#fff"}}>Cancel</Button>
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
        updateStudent,submitFees
    }
}


export default withRouter(connect(mapStateToProps,mapActionToProps())(Profile))




