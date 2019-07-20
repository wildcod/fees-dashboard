import React, {Component} from 'react'
import Header from '../../component/common/header/header'
import { withRouter } from "react-router";
import './all-class.css'

class AllCLass extends Component {

    state = {
        selectValue : "",
    }

    handleChange = (e) => {  
        this.props.history.push('/students/'+ e.target.value)
    }

    render(){ 

    return (
        <div>
            <Header />
            <div className="class-nav">
                  <div className="class-nav-heading">Classes</div>    
            </div>
            <button className="class-nav-btn" ><span className="class-nav-btn-content">create +</span></button>
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
        </div>
    );
    }
}
export default withRouter(AllCLass)