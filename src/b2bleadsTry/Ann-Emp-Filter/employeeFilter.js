import React, { Component } from 'react'
//bootstrap
import Button from 'react-bootstrap/Button'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, insertChoosenStates,getCitiesInState, getTotalData, update_other_filter} from '../../actions/fetchActions'


//url
import {apiUrl} from '../../consts/consts'
class EmpFilter extends Component {
    
    render() {
        let emp_count = null
        let employeeArray = [
            {value:0,text:"None"},
            {value:1,text:"Less than 100"},
            {value:2,text:"100-1000"},
            {value:3,text:"1000-10.000"},
            {value:4,text:"10.000-100.000"},
            {value:5,text:"More than 100.000"},
        ]
        let count = 0
        for (let i = 0; i < this.props.totalFilters.scaleEmployeeCount.length; i++) {
            const element = this.props.totalFilters.scaleEmployeeCount[i];
            if(element === true)
                count ++;
        }
        if(count !== 1){
            emp_count = 
            <div className = "row every-filter-container">
                <div  className="col-12" style={{marginBottom:'5px',textAlign:'center',alignItems:'center',justifyContent:'center'}}><h2 className="categories-header-filter-text-1">Employee Count</h2></div>
                {this.props.totalFilters.scaleEmployeeCount.map((scaleEmpCount,index) => {
                    if(scaleEmpCount === true && index !== 0)
                        return (
                            <div className= "col-12" style={{width:'100%',marginTop:'3px'}}> 
                                <div className = "col-10 col-md-8 col-lg-11 filter-info-container">
                                    <div className = "col-md-10 state-text-container">
                                        <span className= "category-text-span">{employeeArray[index].text}</span>
                                    </div>
                                    <div className="col-2 col-md-4 col-lg-1 category-remove-button-con">
                                        <div>
                                            <button  className="close-button" onClick={(event) => {
                                                this.props.setSpinner()
                                                this.props.update_other_filter(true,'employee_count',index)
                                                this.props.getTotalData(this.props.totalFilters,apiUrl)
                                            }} ></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                })}
            </div>
        }
        return( 
            <div className="col-12" style={{display:'flex',alignItems:'flex-start',justifyContent:'center'}}>
                {emp_count}
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