import React, { Component } from 'react'
//bootstrap
import Button from 'react-bootstrap/Button'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, insertChoosenStates,getCitiesInState, getTotalData, update_other_filter} from '../../actions/fetchActions'
import {apiUrl} from '../../consts/consts'

let valueArray= [
    "0",
    "100",
    "1000",
    "10.000",
    "100.000",
    "More than 100.000",
]


class EmpFilter extends Component {
    
    render() {
        let employee_count = null
        if(this.props.totalFilters.scaleEmployeeCount.last !== 0 )
            employee_count = 
            <div className = "row every-filter-container">
                <div  className="col-12" style={{marginBottom:'5px',textAlign:'center',alignItems:'center',justifyContent:'center'}}><h2 className="categories-header-filter-text-1">Employee Count</h2></div>
                <div className= "col-12" style={{width:'100%',marginTop:'3px'}}> 
                    <div className = "row category-filter-con">
                        <div className = "col-10 col-md-8 col-lg-11 filter-info-container">
                            <span className= "category-text-span">{valueArray[this.props.totalFilters.scaleEmployeeCount.first]} - {valueArray[this.props.totalFilters.scaleEmployeeCount.last]}</span>
                        </div>
                        <div className="col-2 col-md-4 col-lg-1 category-remove-button-con">
                                <button  className="close-button" onClick={(event) => {
                                    this.props.setSpinner()
                                    this.props.update_other_filter(true,'employee_count',{first:0,last:0})
                                    this.props.getTotalData(this.props.totalFilters,apiUrl)
                                }} ></button>
                        </div>
                    </div>
                </div>
            </div>
        
        return( 
            <div className="col-12" style={{display:'flex',alignItems:'flex-start',justifyContent:'center'}}>
                {employee_count}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
    return {
        setSpinner:bindActionCreators(setSpinner,dispatch),
        update_other_filter: bindActionCreators(update_other_filter,dispatch),
        getTotalData: bindActionCreators(getTotalData,dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(EmpFilter);