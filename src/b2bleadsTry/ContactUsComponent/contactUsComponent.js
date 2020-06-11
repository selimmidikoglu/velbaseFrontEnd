import React, { Component } from 'react'
import './contactUsComponent.css'
import NavigationComponent from '../NavigationComponent/navigationComponent';
import FooterComponent from '../FooterComponent/footerComponent';

import { Link } from 'react-router-dom'

import IconComponent from '../DumbComponents/IconComponent/iconComponent'
import IconComponentColored from '../DumbComponents/IconComponent/iconComponentColored'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { set_customer_info, change_asked_question, send_contact_email, contact_done } from '../../actions/fetchActions'

import { apiUrl } from '../../consts/consts'
class ContactUsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    checkBeforeSubmit = () => {
        if (this.props.totalFilters.name === '' || this.props.totalFilters.company_name === '' || this.props.totalFilters.email === '') {
            alert('please fill required fields')
            return;
        }
        this.props.send_contact_email(this.props.totalFilters, apiUrl, this.props.totalCount, this.props.askedQuestion)
        this.props.contact_done(false)
    }
    render() {
        console.log(this.props.contactDone)
        let backgroundColorTemplate = this.state.templateNav ? '#7377a7' : 'whitesmoke'
        // let backgroundColorPayment = this.state.paymentNav ? '#E61575' : 'whitesmoke'
        let backgroundColorPayment = this.state.paymentNav ? '#7377a7' : 'whitesmoke'

        let colorTemplate = this.state.templateNav ? 'white' : 'gray'
        let colorPayment = this.state.paymentNav ? 'white' : 'gray'
        let hiddenCardInfos = !this.state.paymentNav
        let stateHolder = []
        let states = null
        if (Object.keys(this.props.totalFilters.states).length > stateHolder.length) {
            states =

                Object.keys(this.props.totalFilters.states).map((state, index) => {
                    console.log(this.props.totalFilters.states[state])
                    if (!stateHolder.includes(this.props.totalFilters.states[state].abbreviation)) {
                        console.log("girdi")
                        return (
                            <div className="col-12" style={{ height: 'auto' }}>
                                <div className="row" style={{ marginTop: '5px', placeContent: 'center' }}>
                                    <div className="col-12" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', height: 'auto', margin: 0 }}>
                                        <h1 className="state-text-filter" style={{ color: 'gray', fontSize: '13px', fontFamily: 'Gilmer-Regular' }}>{this.props.totalFilters.states[state].state}</h1>
                                    </div>

                                </div>
                            </div>
                        )
                    }
                })

        }
        let cities = null
        if (Object.keys(this.props.totalFilters.cities).length !== 0) {
            cities =
                Object.keys(this.props.totalFilters.cities).map((city, index) => {
                    return (
                        <div className="col-12" style={{ height: 'auto' }}>
                            <div className="row" style={{ marginTop: '5px' }}>
                                <div className="col-12" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', height: '20px', margin: 0 }}>
                                    <h1 className="city-text-filter" style={{ color: 'gray', fontSize: '13px', fontFamily: 'Gilmer-Regular' }}>{city}</h1>
                                </div>
                            </div>
                        </div>
                    )
                })

        }

        if (this.props.contactDone) {
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
                                            <IconComponentColored color="st1" />
                                        </div>
                                        <div className="col-12 message-box-main-header-container" style={{ textAlign: 'center' }}>

                                            <h1 className="alert-message-start-text"></h1>
                                        </div>
                                        <div className="col-12" >

                                            <div className="col-12 text-and-button-container message-box-explanation-text-container">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="close-text-container">
                                                            <h6 className="message-text">We will be get in touch with you as soon as possible. You can continue with business data page.</h6>
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
                                                    this.props.contact_done(false)

                                                }}>
                                                    {/*<h1 className="">X</h1>*/}
                                                    <i class="fa fa-arrow-right close-text-X"></i>
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
        else {
            return (
                <div style={{ backgroundColor: 'white', minHeight: '100%', margin: '0 auto -150px' }}>
                    <NavigationComponent />
                    <div className="fluid-container main-header-container-asked-questions">
                        <label className="main-header-asked-questions-text">Contact Us</label>
                    </div>
                    <div className="container" style={{}}>
                        <form>
                            <div className="row">
                                <div className={this.props.basicContact ? "smaller-contact" : "col-12 col-sm-12 col-md-8"} >

                                    <div className="row payment_container" style={infoColumn}>
                                        {!this.props.basicContact ? <div className="col-md-12 col-sm-12" style={{ padding: '10px' }}>
                                            <i class="fa fa-exclamation-circle" aria-hidden="true" style={{ marginRight: '5px', color: 'gray' }}> </i>
                                            <h1 className="send_button_text"
                                                style={{ fontWeight: '800', color: 'gray', display: 'inline' }}>We will be sending an email to you about all the information
                                                which provides payment options and data pricing of data filters you choose.
                                        </h1>
                                        </div> : null}


                                        <div className="col-md-12 col-sm-12" style={{ height: '50px' }}>
                                            <input className="input_text_style" type="text" placeholder="Full Name*" required value={this.props.totalFilters.name} onChange={(event) => this.props.set_customer_info(event.target.value, 'name')}>
                                            </input>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <input className="input_text_style" type="email" placeholder="Email*" required value={this.props.totalFilters.email} onChange={(event) => this.props.set_customer_info(event.target.value, 'email')}>
                                            </input>
                                        </div>
                                        {/* <div className="col-md-12 col-sm-12">
                                        <input className="input_text_style" type="text" placeholder="Company Name*" required value={this.props.totalFilters.company_name} onChange={(event) => this.props.set_customer_info(event.target.value, 'company_name')}>
                                        </input>
                                    </div> */}
                                        {/* <div className="col-md-12 col-sm-12">
                                        <input className="input_text_style" type="tel" placeholder="Phone" value={this.props.totalFilters.phone} onChange={(event) => this.props.set_customer_info(event.target.value, 'phone')}>
                                        </input>
                                    </div> */}
                                        <div className="col-md-6 col-sm-12">
                                            <input className="input_text_style" type="street" placeholder="Street" value={this.props.totalFilters.street} onChange={(event) => this.props.set_customer_info(event.target.value, 'street')}>
                                            </input>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <input className="input_text_style" type="city" placeholder="City" value={this.props.totalFilters.city} onChange={(event) => this.props.set_customer_info(event.target.value, 'city')}>
                                            </input>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <input className="input_text_style" type="state" placeholder="State" value={this.props.totalFilters.state} onChange={(event) => this.props.set_customer_info(event.target.value, 'state')}>
                                            </input>
                                        </div>


                                        <div className="col-md-6 col-sm-12">
                                            <input className="input_text_style" type="Zip Code" placeholder="Zip Code" value={this.props.totalFilters.zipCode} onChange={(event) => this.props.set_customer_info(event.target.value, 'zipCode')}>
                                            </input>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <textarea

                                                value={this.props.askedQuestion}
                                                onChange={(event) => this.props.change_asked_question(event.target.value)}
                                                placeholder="Ask your questions here"
                                                style={{ resize: 'none', width: '100%', marginTop: '30px', height: '300px', borderRadius: '2px', border: 'none', fontFamily: 'Gilmer-Regular', color: 'gray', outlineColor: '#e61575', border: '1 gray solid' }}
                                            />
                                        </div>
                                        {/* <div className="col-md-12 col-sm-12">
                                        <input className="input_text_style" type="address" placeholder="Address Description" value={this.props.totalFilters.address} onChange={(event) => this.props.set_customer_info(event.target.value, 'address')}>
                                        </input>
                                    </div> */}



                                        <div className="send_button_container" style={{ margin: 'auto', marginTop: '10px', width: '40%' }} onClick={() => this.checkBeforeSubmit()} hidden={this.state.paymentNav}>
                                            <h1 className="send_button_text">Send</h1>
                                        </div>
                                    </div>

                                </div>
                                {!this.props.basicContact ? (
                                    <div className="col-12 col-sm-12 col-md-4">
                                        <div className="row payment_container" style={infoColumn}>
                                            <div className=" col-12 count-and-price-container" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', backgroundColor: 'whitesmoke', padding: '5px', marginBottom: '10px', borderRadius: '5px' }}>
                                                <div className="row" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                                    <h1 style={{ marginTop: '10px', color: '#4A52BF', fontSize: 18, height: '50%', fontFamily: 'Gilmer-Heavy', marginRight: '5px' }} className="dataCount" >Total Count :</h1>
                                                    <h1 style={{ marginTop: '10px', color: '#455A64', fontSize: 18, height: '50%', fontFamily: 'Gilmer-Regular' }} className="dataCount" >{this.props.totalCount}</h1>
                                                </div>
                                                <div className="row" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                                    <h1 style={{ marginTop: '10px', color: '#4A52BF', fontSize: 18, height: '50%', fontFamily: 'Gilmer-Heavy', marginRight: '5px' }} className="dataCount" >Total Price: </h1>
                                                    <h1 style={{ marginTop: '10px', color: '#455A64', fontSize: 18, height: '50%', fontFamily: 'Gilmer-Regular' }} className="dataCount" >{this.props.totalCount * 9 / 100}$</h1>
                                                </div>
                                            </div>
                                            <div className="col-12" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'left', backgroundColor: 'whitesmoke', padding: '5px', borderRadius: '5px' }}>
                                                {/*Categories*/}
                                                {Object.keys(this.props.totalFilters.categories).length !== 0 ? (<div className="col-12" style={{ width: '100%', marginTop: '3px' }}><h1 className="header-filters">Categories</h1></div>) : null}
                                                {Object.keys(this.props.totalFilters.categories).map((category, index) => {
                                                    return (
                                                        <div className="col-12" style={{ width: '100%', marginTop: '5px' }}>
                                                            <div className="row">
                                                                <div className="col-12" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', height: 'auto', margin: 0 }}>
                                                                    <div style={{ height: '100%', display: 'flex', textAlign: 'left' }}><h1 style={{ display: 'list-item', listStyle: 'circle', color: 'gray', fontSize: '13px', fontFamily: 'Gilmer-Regular' }}>{category}</h1></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                {/*States*/}
                                                {Object.keys(this.props.totalFilters.states).length > stateHolder.length ? (<div className="col-12" style={{ width: '100%', marginTop: '5px' }}><h1 className="header-filters">States</h1></div>) : null}
                                                {states}
                                                {/*Cities*/}
                                                {Object.keys(this.props.totalFilters.cities).length !== 0 ? (<div className="col-12" style={{ width: '100%', marginTop: '5px' }}><h1 className="header-filters">Cities</h1></div>) : null}
                                                {cities}
                                                {this.props.totalFilters.hasPhone1 !== 0 ? (<div className="col-12" style={{ width: '100%', marginTop: '5px' }}><h1 className="header-filters">Has Phone</h1></div>) : null}
                                                {this.props.totalFilters.hasEmail1 !== 0 ? (<div className="col-12" style={{ width: '100%', marginTop: '5px' }}><h1 className="header-filters">Has Email</h1></div>) : null}
                                                {this.props.totalFilters.hasWebsite.last !== 0 ? (<div className="col-12" style={{ width: '100%', marginTop: '5px' }}><h1 className="header-filters">Has Phone</h1></div>) : null}

                                            </div>
                                        </div>
                                    </div>) : null}
                            </div>
                        </form>
                    </div>

                    <FooterComponent />
                </div>
            )
        }
    }
}

const backgroundStyle = {
    //backgroundColor: 'rgb(62, 126, 179)',
    backgroundColor: '#4A52BF',
    borderRadius: '5px'

}
const infoColumn = {
    backgroundColor: 'white',
    padding: '10px',
    margin: '20px',
    borderRadius: '5px'
}
function mapStateToProps(state) {
    return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
    return {
        set_customer_info: bindActionCreators(set_customer_info, dispatch),
        change_asked_question: bindActionCreators(change_asked_question, dispatch),
        send_contact_email: bindActionCreators(send_contact_email, dispatch),
        contact_done: bindActionCreators(contact_done, dispatch)

    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ContactUsComponent);
