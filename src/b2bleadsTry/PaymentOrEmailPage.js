import React, { Component } from 'react'
//bootstrap


//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, insertChoosenStates, getCitiesInState, getTotalData, update_other_filter, set_customer_info, send_temp_email } from '../actions/fetchActions'
import Spinner from '../components/dumb/Spinner/spinner'
import AlertDone from './AlertDone/alertDone'
import {Link} from 'react-router-dom'
import './PaymentOrEmailPage.css'
//url
import { apiUrl } from '../consts/consts'
let valueArray = [
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
class PaymentOrEmailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card_number: '',
            expiration: '',
            paymentNav: false,
            templateNav: true
        }
    }
    checkBeforeSubmit() {
        if (this.state.paymentNav) {
            if (this.props.totalFilters.name === '' || this.props.totalFilters.surname === '' || this.props.totalFilters.email === '' || this.props.totalFilters.card_number === '' || this.props.totalFilters.exp_month === ''
                || this.props.totalFilters.exp_year === '' || this.props.totalFilters.cvc === '') {
                alert('please fill required fields')
                return;
            }
        }
        else {
            if (this.props.totalFilters.name === '' || this.props.totalFilters.surname === '' || this.props.totalFilters.email === '') {
                alert('please fill required fields')
                return;
            }
        }
        this.props.setSpinner()
        this.props.send_temp_email(this.props.totalFilters, apiUrl, this.props.totalCount)
    }
    render() {
        let backgroundColorTemplate = this.state.templateNav ? 'rgb(23, 233, 225)' : 'whitesmoke'
        let backgroundColorPayment = this.state.paymentNav ? 'rgb(23, 233, 225)' : 'whitesmoke'
        let colorTemplate = this.state.templateNav ? 'white' : 'gray'
        let colorPayment = this.state.paymentNav ? 'white' : 'gray'
        let hiddenCardInfos = !this.state.paymentNav
        let stateHolder = []
        Object.values(this.props.totalFilters.cities).map(data => {
            if (!stateHolder.includes(data.state))
                stateHolder.push(data.state)
        })
        console.log(stateHolder)
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
                                    <div className="col-12" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', height: '20px', margin: 0 }}>
                                        <h1 className="state-text-filter" style={{ color: 'gray', fontSize: '13px' }}>{this.props.totalFilters.states[state].state}</h1>
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
                                    <h1 className="city-text-filter" style={{ color: 'gray', fontSize: '13px' }}>{city}</h1>
                                </div>
                            </div>
                        </div>
                    )
                })
        }
        let annual_revenue = null
        if (this.props.totalFilters.scaleAnnualRevenue.last !== 0)
            annual_revenue =
                <div className="col-12" style={{ width: '100%' }}>
                    <div className="row">
                        <div className="col-12" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', height: '20px', margin: 0 }}>
                            <h1 className="state-text-filter" style={{ color: 'gray', fontSize: '13px' }}>{valueArray[this.props.totalFilters.scaleAnnualRevenue.first] + "-" + valueArray[this.props.totalFilters.scaleAnnualRevenue.last]}</h1>
                        </div>
                    </div>
                </div>
        let employee_count = null
        if (this.props.totalFilters.scaleEmployeeCount.last !== 0)
            employee_count =
                    <div className="col-12" style={{ width: '100%' }}>
                        <div className="row">
                            <div className="col-12" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', height: '20px', margin: 0 }}>
                                <h1 className="state-text-filter" style={{ color: 'gray', fontSize: '13px' }}>{valueArray[this.props.totalFilters.scaleEmployeeCount.first]} - {valueArray[this.props.totalFilters.scaleEmployeeCount.last]}</h1>
                            </div>
                            
                        </div>
                    </div>
        return (
            
            <div className="container" style={{ pointerEvents: this.props.conditionForSpinner.divPointerEvents}}>
                {this.props.conditionForSpinner.runSpinner ? (<Spinner />) : null}
                {this.props.alertOrNot !== false?(<AlertDone/>):null}
                <div className="row" style={backgroundStyle} >
                    <div className="col-12">
                        <div className="row back-button-container">
                        <Link style={{textDecoration:'none'}} to="/">
                            <div className="back-button">
                            <i class="fa fa-angle-left icon-back-arrow"  aria-hidden="true"></i>
                            </div>
                        </Link>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-8" >
                        
                        <div className="row payment_container" style={infoColumn}>
                            
                            <div className="col-sm-6 col-md-6 select_nav_buttons" style={{ height: '50px', backgroundColor: backgroundColorTemplate }} onClick={() => this.setState({ paymentNav: false, templateNav: true })}>
                                <div><label className="header-categories" style={{ color: colorTemplate }}>Send Sample</label></div></div>
                            <div className="col-sm-6 col-md-6  select_nav_buttons" style={{ backgroundColor: backgroundColorPayment }} onClick={() => this.setState({ paymentNav: true, templateNav: false })} >
                                <label className="header-location" style={{ color: colorPayment }}>Send all data and proceed payment</label>
                            </div>

                            <div className="col-md-12 col-sm-12" style={{ height: '50px', borderTopColor: 'rgb(23, 233, 225)', borderTopWidth: '5px', borderTopStyle: 'solid' }}>
                                <input className="input_text_style" type="text" placeholder="Name*" required value={this.props.totalFilters.name} onChange={(event) => this.props.set_customer_info(event.target.value, 'name')}>
                                </input>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <input className="input_text_style" type="text" placeholder="Surname*" required value={this.props.totalFilters.surname} onChange={(event) => this.props.set_customer_info(event.target.value, 'surname')}>
                                </input>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <input className="input_text_style" type="email" placeholder="Email*" required value={this.props.totalFilters.email} onChange={(event) => this.props.set_customer_info(event.target.value, 'email')}>
                                </input>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <input className="input_text_style" type="tel" placeholder="Phone" value={this.props.totalFilters.phone} onChange={(event) => this.props.set_customer_info(event.target.value, 'phone')}>
                                </input>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <input className="input_text_style" type="address" placeholder="Address" value={this.props.totalFilters.address} onChange={(event) => this.props.set_customer_info(event.target.value, 'address')}>
                                </input>
                            </div>
                            <div className="col-md-12 col-sm-12 card_info_header_container" hidden={hiddenCardInfos}>
                                <div><h1 className="card_info_header">Card Fields</h1></div>
                            </div>
                            <div className="col-md-12 col-sm-12" hidden={hiddenCardInfos}>
                                <input className="input_text_style" type="" placeholder="Card Number*" required value={this.state.card_number} onChange={(event) => {
                                    let card_number = event.target.value.replace(/-/g, '');
                                    let len_card_number = card_number.length
                                    if (len_card_number > 4 && len_card_number <= 8)
                                        card_number = card_number.substr(0, 4) + "-" + card_number.substr(4, len_card_number - 4)
                                    else if (len_card_number > 8 && len_card_number <= 12)
                                        card_number = card_number.substr(0, 4) + "-" + card_number.substr(4, 4) + "-" + card_number.substr(8, len_card_number - 4)
                                    else if (len_card_number > 12 && len_card_number <= 16)
                                        card_number = card_number.substr(0, 4) + "-" + card_number.substr(4, 4) + "-" + card_number.substr(8, 4) + "-" + card_number.substr(12, len_card_number - 4)
                                    else if (len_card_number > 16)
                                        card_number = card_number.substr(0, 4) + "-" + card_number.substr(4, 4) + "-" + card_number.substr(8, 4) + "-" + card_number.substr(12, 4)
                                    this.setState({ card_number: card_number }, () => { console.log("Card Number", this.state.card_number) })
                                    let str = card_number
                                    str = str.replace(/-/g, '');
                                    this.props.set_customer_info(str, 'card_number')
                                }}>
                                </input>
                            </div>
                            <div className="col-md-4 col-sm-4" hidden={hiddenCardInfos}>
                                <input className="input_text_style dropdown" list="months" name="months" placeholder="Exp. Month*" value={this.props.totalFilters.exp_month}
                                    onChange={(event) => this.props.set_customer_info(event.target.value, 'exp_month')}></input>

                                <datalist id="months">
                                    <option value="January" />
                                    <option value="Feburuary" />
                                    <option value="March" />
                                    <option value="April" />
                                    <option value="May" />
                                    <option value="June" />
                                    <option value="July" />
                                    <option value="August" />
                                    <option value="September" />
                                    <option value="October" />
                                    <option value="November" />
                                    <option value="December" />
                                </datalist>

                            </div>
                            <div className="col-md-4 col-sm-4" hidden={hiddenCardInfos}>
                                <input className="input_text_style dropdown-exp" list="years" name="months" placeholder="Exp. Year*" value={this.props.totalFilters.exp_year}
                                    onChange={(event) => this.props.set_customer_info(event.target.value, 'exp_year')}></input>

                                <datalist id="years">
                                    <option value="2020" />
                                    <option value="2021" />
                                    <option value="2022" />
                                    <option value="2023" />
                                    <option value="2024" />
                                    <option value="2025" />
                                    <option value="2026" />

                                </datalist>

                            </div>
                            <div className="col-md-4 col-sm-4" hidden={hiddenCardInfos}>
                                <input className="input_text_style" type="tel" placeholder="CVC*" value={this.props.totalFilters.cvc}
                                    onChange={(event) => this.props.set_customer_info(event.target.value, 'cvc')}>
                                </input>
                            </div>
                            <div className="col-12 send_button_container" onClick={() => this.checkBeforeSubmit()}>
                                <div className="">
                                    <h1 className="send_button_text">{!this.state.paymentNav ? 'Send Sample' : 'Send All and Proceed Payment'}</h1>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-sm-12 col-md-4">
                        <div className="row payment_container" style={infoColumn}>
                            <div className=" col-12 count-and-price-container" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', backgroundColor: 'whitesmoke', padding: '5px', marginBottom: '10px' }}>
                                <div><h1 style={{ marginTop: '10px', color: '#455A64', fontSize: 18, height: '50%' }} className="dataCount" >Total Count: {this.props.totalCount}</h1></div>
                                <div><h1 style={{ marginTop: '10px', color: '#455A64', fontSize: 18, height: '50%' }} className="dataCount" >Total Price: {this.props.totalCount * 9 / 100}$</h1></div>
                            </div>
                            <div className="col-12" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'left', backgroundColor: 'whitesmoke', padding: '5px' }}>
                                {/*Categories*/}
                                {Object.keys(this.props.totalFilters.categories).length !== 0 ? (<div className="col-12" style={{ width: '100%', marginTop: '3px' }}><h1 className="header-filters">Categories</h1></div>) : null}
                                {Object.keys(this.props.totalFilters.categories).map((category, index) => {
                                    return (
                                        <div className="col-12" style={{ width: '100%', marginTop: '3px' }}>
                                            <div className="row">
                                                <div className="col-12" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', height: '20px', margin: 0 }}>
                                                    <div style={{ height: '100%', display: 'flex', textAlign: 'left' }}><h1 style={{ color: 'gray', fontSize: '13px' }}>{category}</h1></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                {/*States*/}
                                {Object.keys(this.props.totalFilters.states).length > stateHolder.length ? (<div className="col-12" style={{ width: '100%', marginTop: '3px' }}><h1 className="header-filters">States</h1></div>) : null}
                                {states}
                                {/*Cities*/}
                                {Object.keys(this.props.totalFilters.cities).length !== 0 ? (<div className="col-12" style={{ width: '100%', marginTop: '3px' }}><h1 className="header-filters">Cities</h1></div>) : null}
                                {cities}
                                {/*Annual_revenue*/}
                                {this.props.totalFilters.scaleAnnualRevenue.last !== 0 ? (<div className="col-12" style={{ width: '100%', marginTop: '3px' }}><h1 className="header-filters">Annual revenue</h1></div>) : null}
                                {annual_revenue}
                                {this.props.totalFilters.scaleEmployeeCount.last !== 0 ?(<div className="col-12" style={{ width: '100%', marginTop: '3px' }}><h1 className="header-filters">Employee Count</h1></div>) : null}
                                {employee_count}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}
const backgroundStyle = {
    backgroundColor: 'rgb(62, 126, 179)',

}
const infoColumn = {
    backgroundColor: 'white',
    padding: '40px',
    margin: '50px',
}

function mapStateToProps(state) {
    return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
    return {
        setSpinner: bindActionCreators(setSpinner, dispatch),
        update_other_filter: bindActionCreators(update_other_filter, dispatch),
        getTotalData: bindActionCreators(getTotalData, dispatch),
        set_customer_info: bindActionCreators(set_customer_info, dispatch),
        send_temp_email: bindActionCreators(send_temp_email, dispatch),
        
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(PaymentOrEmailPage);