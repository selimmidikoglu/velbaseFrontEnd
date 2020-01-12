import React, { Component } from 'react'
//bootstrap
import Button from 'react-bootstrap/Button'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, insertChoosenStates,getCitiesInState, getTotalData} from '../../actions/fetchActions'
import './statesFilter.css'

//url
import {apiUrl} from '../../consts/consts'
class StatesFilter extends Component {
    
    render() {
        let stateHolder = []
        Object.values(this.props.totalFilters.cities).map(data => {
            if(!stateHolder.includes(data.state))
                stateHolder.push(data.state)
        })
        console.log(stateHolder)
        let states = null
        if(Object.keys(this.props.totalFilters.states).length > stateHolder.length){
            states = 
            <div className = "row" style={{marginTop:'10px',borderRadius:'5px',backgroundColor:'#81d4fa',width:'100%',padding:'20px'}}>
                <div  className="col-12" style={{textAlign:'center',alignItems:'center',justifyContent:'center'}}><h2 style={{color:'#fff',textAlign:'center',fontSize:'12px',fontWeight:'bold'}}>States</h2></div>
                {Object.keys(this.props.totalFilters.states).map((state,index) => {
                    console.log(this.props.totalFilters.states[state])
                    if(!stateHolder.includes(this.props.totalFilters.states[state].abbreviation)){
                        return (
                            <div className= "col-12" style={{height:'auto'}}> 
                                <div className = "row" style={{marginTop:'5px',placeContent:'center'}}>
                                    <div className = "col-md-10 state-text-container" style={{display:'flex',justifyContent:'left',alignItems:'center',height:'20px',margin:0}}>
                                        <h1 className= "state-text-filter" style = {{color:'#fff',fontSize:'13px'}}>{this.props.totalFilters.states[state].state}</h1>
                                    </div>
                                    <div className="col-md-2" style={{display:'flex',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                                        <div>
                                            <button  className="close-button pull-right " onClick={(event) => {
                                                this.props.setSpinner()
                                                this.props.insertChoosenStates(event, "states", index,this.props.totalFilters.states[state].state, this.props.totalFilters.states[state].abbreviation)
                                                this.props.getCitiesInState(apiUrl, "states", this.props.totalFilters.states)
                                                this.props.setSpinner()
                                                this.props.getTotalData(this.props.totalFilters,apiUrl)
                                            }} ></button>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        )
                    }
                })}
            </div>
        }
        return( 
            <div className="col-12" style={{display:'flex',alignItems:'flex-start',justifyContent:'center'}}>
                {states}
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
        insertChoosenStates: bindActionCreators(insertChoosenStates,dispatch),
        getCitiesInState: bindActionCreators(getCitiesInState,dispatch),
        getTotalData: bindActionCreators(getTotalData,dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(StatesFilter);