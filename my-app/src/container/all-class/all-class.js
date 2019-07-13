import React from 'react'
import Header from '../../component/common/header/header'
import './all-class.css'

const AllCLass = () => {
    return (
        <div>
            <Header />
            <div className="class-nav">
                  <div className="class-nav-heading">Classes</div>    
            </div>
            <button className="class-nav-btn" ><span className="class-nav-btn-content">create +</span></button>
            <div className="class-main">
                <div className="class-main-content">
                        <select className="class-dropdown-field">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                    <div>
                        <button className="class-btn">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllCLass