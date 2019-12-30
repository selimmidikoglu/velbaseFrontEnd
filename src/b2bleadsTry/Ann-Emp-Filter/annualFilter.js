import React, { Component } from 'react'
//bootstrap
import Button from 'react-bootstrap/Button'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, insertChoosenStates,getCitiesInState, getTotalData, update_other_filter} from '../../actions/fetchActions'


//url
import {apiUrl} from '../../consts/consts'
class AnnEmpFilter extends Component {
    
    render() {
        let annual_revenue = null
        let valueArray = [{ value: 0, text: "None" }, { value: 1, text: "Less than 10.000$" }, { value: 2, text: "10.000$-100.000$" }, { value: 3, text: "100.000$-1.000.000$" },
        { value: 4, text: "1.000.000$-10.000.000$" }, { value: 5, text: "10.000.000$-100.000.000$" },
        { value: 6, text: "100.000.000$-1 billion $" }, { value: 7, text: "1 billion $-10 billion $" }, { value: 8, text: "10 billion $-100 billion $" }, { value: 9, text: "More than 100 billion $" }]
        let employeeArray = [
            {value:0,text:"None"},
            {value:1,text:"Less than 100"},
            {value:2,text:"100-1000"},
            {value:3,text:"1000-10.000"},
            {value:4,text:"10.000-100.000"},
            {value:5,text:"More than 100.000"},
        ]
        let count = 0
        for (let i = 0; i < this.props.totalFilters.scaleAnnualRevenue.length; i++) {
            const element = this.props.totalFilters.scaleAnnualRevenue[i];
            if(element === true)
                count ++;
        }
        if(count !== 1){
            console.log("sıçış")
            annual_revenue = 
            <div className = "row" style={{marginTop:'10px',borderRadius:'5px',backgroundColor:'#416268',width:'100%'}}>
                <div  className="col-12" style={{textAlign:'center',alignItems:'center',justifyContent:'center'}}><h2 style={{color:'#fff',textAlign:'center',fontSize:'12px',fontWeight:'bold'}}>Annual revenue</h2></div>
                {this.props.totalFilters.scaleAnnualRevenue.map((scaleAnnRevenue,index) => {
                    if(scaleAnnRevenue === true && index !== 0)
                        return (
                            <div className= "col-12" style={{height:'auto'}}> 
                                <div className = "row" style={{marginTop:'5px',placeContent:'center'}}>
                                    <div className = "col-md-8 state-text-container" style={{display:'flex',justifyContent:'left',alignItems:'center',height:'20px',margin:0}}>
                                        <h1 className= "state-text-filter" style={{margin:0}}>{valueArray[index].text}</h1>
                                    </div>
                                    <div className="col-md-4" style={{display:'flex',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                                        <div>
                                            <button  className="close-button pull-right " onClick={(event) => {
                                                this.props.setSpinner()
                                                this.props.update_other_filter(true,'annual_revenue',index)
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
            <div className="col-12">
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