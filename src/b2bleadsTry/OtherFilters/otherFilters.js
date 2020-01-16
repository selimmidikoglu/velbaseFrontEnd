import React, { Component } from 'react'
import AnnEmpRange from '../Ann-Emp-Range/annEmpRange'
import EmpRange from '../EmpRange/empRange'
class OtherFilters extends Component {
    
    render() {
        return (
            <div className="row" style={{marginTop:'20px'}}>
                <div className="col-xl-6 col-md-12" style={{display:'flex',alignItems:'center',justifyContent:'center'}}><AnnEmpRange/></div>
                <div className="col-xl-6 col-md-12" style={{display:'flex',alignItems:'center',justifyContent:'center'}}><EmpRange/></div>
            </div>
        );
    }
}

export default OtherFilters;