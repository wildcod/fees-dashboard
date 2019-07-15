import React from 'react'
import Header from '../../component/common/header/header';
import './students.css'
const Students = () => {
    return (
        <div>
            <Header />
            <div className="students-heading">
                <div className="students-heading-content">Class 1</div>
            </div>
            <div className="students-main">
                <div className="students-list-container">
                    <div className="students-list-items">
                            <div className="students-name">Sahil Kanojia</div>
                            <div className="students-update">
                               <span class="students-status"></span>
                               <span className="students-update-iocns">
                                     <i class="fas fa-edit"></i>&nbsp; &nbsp; 
                                     <i class="fas fa-trash"></i>
                              </span>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Students