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
                        <div key={index} className="row styles-checkbox" style={{marginTop:'5px'}}>
                            <div className ="state-part-checkbox-container" ><input type="checkbox" key={index} className="option-input checkbox" defaultChecked={false} 
                                    checked={this.props.totalFilters.states[state.abbreviation]}
                                    onClick={(event) => {
                                        this.props.setSpinner()
                                        this.props.insertChoosenStates(event, "states", index, state.state , state.abbreviation)
                                        this.props.getCitiesInState(apiUrl, "states", this.props.totalFilters.states)
                                        //this.props.setSpinner()
                                        this.props.getTotalData(this.props.totalFilters,apiUrl)
                                        
                                        
                                        console.log("lanet gelsin",this.props.totalFilters.states)
                                        
                                    }} /></div>
                                <div className ="state-party-text-container" style={{textAlign: 'left' }}><span className="state-text">{state.state} </span></div>
                                
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