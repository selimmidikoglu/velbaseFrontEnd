import React, { Component } from 'react'
//bootstrap
//Stripe ELEMENTS
import { useStripe, useElements, CardElement, Elements ,ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardForm from '../b2bleadsTry/StripeElements/cardForm'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, insertChoosenStates, getCitiesInState, getTotalData, update_other_filter, set_customer_info, send_temp_email } from '../actions/fetchActions'
import Spinner from '../components/dumb/Spinner/spinner'
import AlertDone from './AlertDone/alertDone'
import AlertSample from './AlertDone/alertSample'
import IconComponentColored from './DumbComponents/IconComponent/iconComponentColored'
import { Link } from 'react-router-dom'
import './PaymentOrEmailPage.css'
//url
import { apiUrl } from '../consts/consts'
import NavigationComponent from './NavigationComponent/navigationComponent';
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
let valueArrayEmp = [
    "0",
    "100",
    "1000",
    "10.000",
    "100.000",
    "More than 100.000",
]
//const stripePromise = loadStripe("pk_test_CRpsYZi2SNLhgow7U83Mn2C800cWErS3mQ");
const stripePromise = loadStripe("pk_live_hi6prRhP6ijRfU59YobpXjoc00XlCaJCV7");

console.log(stripePromise)
class PaymentOrEmailPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            card_number: '',
            expiration: '',
            paymentNav: this.props.location.state.section == 'full_data' ? true : false,
            templateNav: this.props.location.state.section == 'sample' ? true : false,
            sample_or_data: 'sample'
        }

    }
    checkBeforeSubmit = async () => {
        /*if (this.state.paymentNav) {
            if (this.props.totalFilters.name === '' || this.props.totalFilters.surname === '' || this.props.totalFilters.email === '' || this.props.totalFilters.card_number === '' || this.props.totalFilters.exp_month === ''
                || this.props.totalFilters.exp_year === '' || this.props.totalFilters.cvc === '') {
                alert('please fill required fields')
                return;
            }
            else {
                this.props.setSpinner()
                this.props.send_temp_email(this.props.totalFilters, apiUrl, this.props.totalCount, 'data')
            }
        }
        else {
            if (this.props.totalFilters.name === '' || this.props.totalFilters.surname === '' || this.props.totalFilters.email === '') {
                alert('please fill required fields')
                return;
            }
            else {
                this.props.setSpinner()
                this.props.send_temp_email(this.props.totalFilters, apiUrl, this.props.totalCount, 'sample_data')
            }
        }*/
        console.log(this.props.totalFilters)
        if (this.props.totalFilters.name === '' || this.props.totalFilters.company_name === '' || this.props.totalFilters.email === '' ) {
            alert('please fill required fields')
            return;
        }
        else {
            
            if(this.state.templateNav){
                console.log("AHAA GELDİ")
                this.props.send_temp_email(this.props.totalFilters, apiUrl, this.props.totalCount, 'sample_data')
                return;
            }
            const {stripe, elements} = this.props;

            if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            console.log(stripe, elements)
            return;
            }

            // Get a reference to a mounted CardElement. Elements knows how
            // to find your CardElement because there can only ever be one of
            // each type of element.
            const cardElement = elements.getElement(CardElement);

            /*const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            });*/
            const {error, token} = await stripe.createToken(cardElement,{name:this.props.totalFilters.name});

            if (error) {
            console.log('[error]', error);
            } else {
            console.log('[PaymentMethod]', token);
            console.log(token.id)
            this.props.set_customer_info(token.id,'payment_token')
            console.log(this.props)
            this.props.setSpinner()
            this.props.send_temp_email(this.props.totalFilters, apiUrl, this.props.totalCount, 'data')
        }

    }
    }
    render() {
        let backgroundColorTemplate = this.state.templateNav ? '#7377a7' : 'whitesmoke'
        // let backgroundColorPayment = this.state.paymentNav ? '#E61575' : 'whitesmoke'
        let backgroundColorPayment = this.state.paymentNav ? '#7377a7' : 'whitesmoke'

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
                                        <h1 className="state-text-filter" style={{ color: 'gray', fontSize: '13px',fontFamily:'Gilmer-Regular' }}>{this.props.totalFilters.states[state].state}</h1>
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
                                    <h1 className="city-text-filter" style={{ color: 'gray', fontSize: '13px',fontFamily:'Gilmer-Regular' }}>{city}</h1>
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
                            <h1 className="state-text-filter" style={{ color: 'gray', fontSize: '13px',fontFamily:'Gilmer-Regular' }}>{valueArray[this.props.totalFilters.scaleAnnualRevenue.first] + "-" + valueArray[this.props.totalFilters.scaleAnnualRevenue.last]}</h1>
                        </div>
                    </div>
                </div>
        let employee_count = null
        if (this.props.totalFilters.scaleEmployeeCount.last !== 0)
            employee_count =
                <div className="col-12" style={{ width: '100%' }}>
                    <div className="row">
                        <div className="col-12" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', height: '20px', margin: 0 }}>
                            <h1 className="state-text-filter" style={{ color: 'gray', fontSize: '13px',fontFamily:'Gilmer-Regular' }}>{valueArrayEmp[this.props.totalFilters.scaleEmployeeCount.first]} - {valueArrayEmp[this.props.totalFilters.scaleEmployeeCount.last]}</h1>
                        </div>

                    </div>
                </div>
        let mainPayment = (
            <div className="fluid-container">
                <NavigationComponent/>
                <div className={this.props.alertOrNot !== true ?"container custom-payment-container":"container"} style={{pointerEvents: this.props.conditionForSpinner.divPointerEvents }}>
                
                {/* <div className="row"><IconComponentColored color="st1"/></div> */}
                {this.props.conditionForSpinner.runSpinner ? (<Spinner />) : null}
                
                <div className="row" style={backgroundStyle} >
                
                    <div className="col-12">
                        <div className="row back-button-container">
                            <Link style={{ textDecoration: 'none' }} to={{pathname:'/leads'}}>
                                <div className="back-button">
                                    <i className="fa fa-angle-left icon-back-arrow" aria-hidden="true"></i>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-8" >

                        <div className="row payment_container" style={infoColumn}>

                            <div className="col-6 col-sm-6 col-md-6 select_nav_buttons" style={{ height: '50px', backgroundColor: backgroundColorTemplate }} onClick={() => this.setState({ paymentNav: false, templateNav: true, sample_or_data: 'sample' })}>
                                <label className="header-location-payment sample-button-hover" style={{ color: colorTemplate }}>Send sample</label>
                            </div>
                            <div className="col-6 col-sm-6 col-md-6  select_nav_buttons" style={{ backgroundColor: backgroundColorPayment }} onClick={() => this.setState({ paymentNav: true, templateNav: false, sample_or_data: 'data' })} >
                                <label className="header-location-payment" style={{ color: colorPayment }}>Send full data</label>
                            </div>

                            <div className="col-md-12 col-sm-12" style={{ height: '50px', borderTopColor: '#7377a7', borderTopWidth: '5px', borderTopStyle: 'solid' }}>
                                <input className="input_text_style" type="text" placeholder="Full Name*" required value={this.props.totalFilters.name} onChange={(event) => this.props.set_customer_info(event.target.value, 'name')}>
                                </input>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <input className="input_text_style" type="email" placeholder="Email*" required value={this.props.totalFilters.email} onChange={(event) => this.props.set_customer_info(event.target.value, 'email')}>
                                </input>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <input className="input_text_style" type="text" placeholder="Company Name*" required value={this.props.totalFilters.company_name} onChange={(event) => this.props.set_customer_info(event.target.value, 'company_name')}>
                                </input>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <input className="input_text_style" type="tel" placeholder="Phone" value={this.props.totalFilters.phone} onChange={(event) => this.props.set_customer_info(event.target.value, 'phone')}>
                                </input>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <input className="input_text_style" type="state" placeholder="State" value={this.props.totalFilters.state} onChange={(event) => this.props.set_customer_info(event.target.value, 'state')}>
                                </input>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <input className="input_text_style" type="city" placeholder="City" value={this.props.totalFilters.city} onChange={(event) => this.props.set_customer_info(event.target.value, 'city')}>
                                </input>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <input className="input_text_style" type="street" placeholder="Street" value={this.props.totalFilters.street} onChange={(event) => this.props.set_customer_info(event.target.value, 'street')}>
                                </input>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <input className="input_text_style" type="Zip Code" placeholder="Zip Code" value={this.props.totalFilters.zipCode} onChange={(event) => this.props.set_customer_info(event.target.value, 'zipCode')}>
                                </input>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <input className="input_text_style" type="address" placeholder="Address Description" value={this.props.totalFilters.address} onChange={(event) => this.props.set_customer_info(event.target.value, 'address')}>
                                </input>
                            </div>

                            <div className="col-md-12 col-sm-12" hidden={hiddenCardInfos} style={{marginTop:'20px'}}>
                                
                                <Elements options={{hidePostalCode: true}}
                                    stripe={stripePromise}>
                                    <CardForm></CardForm>
                                    
                                </Elements>
                            </div>
                            <div className="col-12 send_button_container" onClick={() => this.checkBeforeSubmit()} hidden={this.state.paymentNav}>
                                <h1 className="send_button_text">{!this.state.paymentNav ? 'Send Sample' : 'Send All and Proceed Payment'}</h1>
                            </div>
                            </div>

                    </div>
                    <div className="col-12 sm-12 col-md-4">
                        <div className="row payment_container" style={infoColumn}>
                            <div className=" col-12 count-and-price-container" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', backgroundColor: 'whitesmoke', padding: '5px', marginBottom: '10px',borderRadius:'5px' }}>
                                <div className="row" style={{justifyContent:'center',alignItems:'center', textAlign:'center'}}>
                                    <h1 style = {{marginTop: '10px',color:'#4A52BF',fontSize:18,height:'50%', fontFamily:'Gilmer-Heavy',marginRight:'5px'}}className = "dataCount" >Total Count :</h1>
                                    <h1 style = {{marginTop: '10px',color:'#455A64',fontSize:18,height:'50%', fontFamily:'Gilmer-Regular'}}className = "dataCount" >{this.props.totalCount}</h1>
                                </div>
                                <div className="row" style={{justifyContent:'center',alignItems:'center', textAlign:'center'}}>
                                    <h1 style = {{marginTop: '10px',color:'#4A52BF',fontSize:18,height:'50%', fontFamily:'Gilmer-Heavy',marginRight:'5px'}} className = "dataCount" >Total Price: </h1>
                                    <h1 style = {{marginTop: '10px',color:'#455A64',fontSize:18,height:'50%', fontFamily:'Gilmer-Regular'}}className = "dataCount" >{this.props.totalCount * 9/100}$</h1>
                                </div>
                            </div>
                            <div className="col-12" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'left', backgroundColor: 'whitesmoke', padding: '5px',borderRadius:'5px' }}>
                                {/*Categories*/}
                                {Object.keys(this.props.totalFilters.categories).length !== 0 ? (<div className="col-12" style={{ width: '100%', marginTop: '3px'}}><h1 className="header-filters">Categories</h1></div>) : null}
                                {Object.keys(this.props.totalFilters.categories).map((category, index) => {
                                    return (
                                        <div className="col-12" style={{ width: '100%', marginTop: '5px' }}>
                                            <div className="row">
                                                <div className="col-12" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', height: '20px', margin: 0 }}>
                                                    <div style={{ height: '100%', display: 'flex', textAlign: 'left' }}><h1 style={{ color: 'gray', fontSize: '13px',fontFamily:'Gilmer-Regular' }}>{category}</h1></div>
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
                                {/*Annual_revenue*/}
                                {this.props.totalFilters.scaleAnnualRevenue.last !== 0 ? (<div className="col-12" style={{ width: '100%', marginTop: '5px' }}><h1 className="header-filters">Annual revenue</h1></div>) : null}
                                {annual_revenue}
                                {this.props.totalFilters.scaleEmployeeCount.last !== 0 ? (<div className="col-12" style={{ width: '100%', marginTop: '5px' }}><h1 className="header-filters">Employee Count</h1></div>) : null}
                                {employee_count}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
        return (
            this.props.alertOrNot !== false ? (this.state.templateNav?(<AlertSample/>): (<AlertDone />) ) : (mainPayment)
        )

    }
}
const backgroundStyle = {
    //backgroundColor: 'rgb(62, 126, 179)',
    backgroundColor:'#4A52BF',
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
        setSpinner: bindActionCreators(setSpinner, dispatch),
        update_other_filter: bindActionCreators(update_other_filter, dispatch),
        getTotalData: bindActionCreators(getTotalData, dispatch),
        set_customer_info: bindActionCreators(set_customer_info, dispatch),
        send_temp_email: bindActionCreators(send_temp_email, dispatch),

    }

}
export default connect(mapStateToProps, mapDispatchToProps)(PaymentOrEmailPage);