import React, { Component } from 'react'
//bootstrap
import Button from 'react-bootstrap/Button'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, changeAlertBoxState } from '../../actions/fetchActions'
import './alertDone.css'

//url
import { apiUrl } from '../../consts/consts'
class AlertDone extends Component {

    render() {
        return (
            
                <div className="row  alert-box">
                    <div className= "col-2"></div>
                    <div className="col-8 text-and-button-container">
                        <div className="close-text-container">
                            <h6 className="message-text">We will be sending your data to your email address</h6>
                        </div>
                        <div className="close-button-alert" onClick={() => {
                            this.props.changeAlertBoxState()
                        }}>
                                <h1 className="close-text-X">X</h1>
                        </div>
                    </div>
                    <div className= "col-2"></div>

                    
                </div>
            
        )

    }

}
function mapStateToProps(state) {
    return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
    return {
        setSpinner: bindActionCreators(setSpinner, dispatch),
        changeAlertBoxState: bindActionCreators(changeAlertBoxState,dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(AlertDone);