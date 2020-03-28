import React, { Component } from 'react'
//bootstrap
import Button from 'react-bootstrap/Button'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, changeAlertBoxState } from '../../actions/fetchActions'
import './alertDone.css'
import { Link } from 'react-router-dom'

//url
import { apiUrl } from '../../consts/consts'
import IconComponent from '../DumbComponents/IconComponent/iconComponent'
import IconComponentColored from '../DumbComponents/IconComponent/iconComponentColored'
class AlertSample extends Component {

    render() {
        return (

            <div className="alert-box">
                <div className="container" style={{ height: '100%' }}>
                    <div className="row" style={{ height: '100%', }}>
                        <div className="col-12 alert-page-icon-container">
                            <IconComponent />
                        </div>
                        <div className="col-12 alert-box-main-container">
                            <div className="message-box">
                                <div className="row">
                                    <div className="col-12 text-and-button-container message-box-logo-container">
                                        <IconComponentColored />
                                    </div>
                                    <div className="col-12 message-box-main-header-container" style={{ textAlign: 'center' }}>

                                        <h1 className="alert-message-start-text">Thank you for using Velbase</h1>
                                    </div>
                                    <div className="col-12" >

                                        <div className="col-12 text-and-button-container message-box-explanation-text-container">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="close-text-container">
                                                        <h6 className="message-text">Sample csv will be sent to your email in minutes. If you want to purchase full data you can continue with Send Full Data option.</h6>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="close-text-container">
                                                        <h6 className="message-text" >Best Regards  </h6>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="col-12 text-and-button-container message-box-close-button-container" style={{ textAlign: 'center' }} >
                                    <Link style={{ textDecoration: 'none' }} to={{ pathname: "/leads", state: { section: 'full-data' } }} >
                                        <div className="close-button-alert" onClick={() => {
                                            this.props.changeAlertBoxState()
                                        }}>
                                            <h1 className="close-text-X">X</h1>
                                        </div>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<div className="col-8 text-and-button-container">
                            <div className="close-text-container">
                                <h6 className="message-text">We will be sending your data to your email address</h6>
                            </div>
                            <div className="close-button-alert" onClick={() => {
                                this.props.changeAlertBoxState()
                            }}>
                                    <h1 className="close-text-X">X</h1>
                            </div>
                        </div>*/}
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
        changeAlertBoxState: bindActionCreators(changeAlertBoxState, dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(AlertSample);