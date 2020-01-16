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
    "10.000$",
    "100.000$",
    "1.000.000$",
    "10.000.000$",
    "100.000.000$",
    "1 billion $",
    "10 billion $",
    "100 billion $",
    "More than 100 billion $"
]


class AnnEmpFilter extends Component {
    
    render() {
        let annual_revenue = null
        if(this.props.totalFilters.scaleAnnualRevenue.last !== 0 )
            annual_revenue = 
            <div className = "row" style={{marginTop:'10px',borderRadius:'5px',backgroundColor:'#81d4fa',width:'100%',padding:'20px'}}>
                <div  className="col-12" style={{textAlign:'center',alignItems:'center',justifyContent:'center'}}><h2 style={{color:'#fff',textAlign:'center',fontSize:'12px',fontWeight:'bold'}}>Annual revenue</h2></div>
                <div className= "col-12" style={{width:'100%'}}> 
                    <div className = "row">
                        <div className = "col-md-10 state-text-container" style={{display:'flex',justifyContent:'left',alignItems:'center',height:'20px',margin:0}}>
                            <h1 className= "state-text-filter" style = {{color:'#fff',fontSize:'13px'}}>{valueArray[this.props.totalFilters.scaleAnnualRevenue.first] + "-" + valueArray[this.props.totalFilters.scaleAnnualRevenue.last] }</h1>
                        </div>
                        <div className="col-md-2" style={{display:'flex',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                            <div>
                                <button  className="close-button pull-right " onClick={(event) => {
                                    this.props.setSpinner()
                                    this.props.update_other_filter(true,'annual_revenue',{first:0,last:0})
                                    this.props.getTotalData(this.props.totalFilters,apiUrl)
                                }} ></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        return( 
            <div className="col-12" style={{display:'flex',alignItems:'flex-start',justifyContent:'center'}}>
                {annual_revenue}
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
export default connect(mapStateToProps, mapDispatchToProps)(AnnEmpFilter);