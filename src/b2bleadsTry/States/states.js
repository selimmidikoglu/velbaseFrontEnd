import React, { Component } from 'react'

//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCitiesInState, insertChoosenStates,setSpinner,getTotalData } from '../../actions/fetchActions'

import {apiUrl} from '../../consts/consts'
//css
import './states.css'
class States extends Component {
    

    render() {
        let states = null;
        let check = () => {
            if(Object.keys(this.props.totalFilters.states) === 0)
                return false
            
        }
        console.log(this.props.totalFilters.states)
        if (typeof this.props.matchedStates !== 'undefined') {
            return (
                this.props.matchedStates.map((state, index) => {
                    return (
                        <div key={index} className="row styles-checkbox">
                                <div className ="col-md-8" style={{textAlign: 'left' }}><label className="state-text">{state.state} </label></div>
                                <div className ="col-md-4" ><div><input type="checkbox" key={index} className="option-input checkbox" defaultChecked={false} 
                                    checked={this.props.totalFilters.states[state.abbreviation]}
                                    onClick={(event) => {
                                        this.props.setSpinner()
                                        this.props.insertChoosenStates(event, "states", index, state.abbreviation)
                                        
                                        this.props.setSpinner()
                                        this.props.getTotalData(this.props.totalFilters,apiUrl)
                                        this.props.getCitiesInState(apiUrl, "states", this.props.totalFilters.states)
                                        console.log("lanet gelsin",this.props.totalFilters.states)
                                        
                                    }} /></div></div>
                        </div>
                    )

                })
            )
        }
    }
}

function mapStateToProps(state) {
    return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
    return {
        setSpinner: bindActionCreators(setSpinner,dispatch),
        insertChoosenStates: bindActionCreators(insertChoosenStates, dispatch),
        getCitiesInState: bindActionCreators(getCitiesInState, dispatch),
        getTotalData: bindActionCreators(getTotalData,dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(States);