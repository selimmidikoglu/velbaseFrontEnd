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
        let states = null
        if(Object.keys(this.props.totalFilters.states).length > stateHolder.length){
            states = 
            <div className = "row every-filter-container" >
                <div  className="filters-common-header-container"><span className="categories-header-filter-text-1">States</span></div>
                {Object.keys(this.props.totalFilters.states).map((state,index) => {
                    if(!stateHolder.includes(this.props.totalFilters.states[state].abbreviation)){
                        return (
                            
                                <div className = " category-filter-con">
                                    <div className = "filter-info-container">
                                        <span className= "state-text-filter" className="category-text-span">{this.props.totalFilters.states[state].state}</span>
                                    </div>
                                    <div className="category-remove-button-con" >
                                            <button  className="close-button" onClick={(event) => {
                                                this.props.setSpinner()
                                                this.props.insertChoosenStates(event, "states", index,this.props.totalFilters.states[state].state, this.props.totalFilters.states[state].abbreviation)
                                                this.props.getCitiesInState(apiUrl, "states", this.props.totalFilters.states)
                                                this.props.setSpinner()
                                                this.props.getTotalData(this.props.totalFilters,apiUrl)
                                            }} ></button>
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