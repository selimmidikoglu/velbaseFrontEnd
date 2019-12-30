import React, { Component } from 'react'
//bootstrap


//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, insertChoosenStates, getCitiesInState, getTotalData, update_other_filter, set_customer_info, send_temp_email } from '../actions/fetchActions'
import './PaymentOrEmailPage.css'
//url
import { apiUrl } from '../consts/consts'

class PaymentOrEmailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expiration: '',
            paymentNav: false,
            templateNav: true
        }
    }
    checkBeforeSubmit(){
        if(this.state.paymentNav){
            if(this.props.totalFilters.name === '' || this.props.totalFilters.surname === '' || this.props.totalFilters.email === '' || this.props.totalFilters.card_number === '' || this.props.totalFilters.exp_month === '' 
            || this.props.totalFilters.exp_year === '' || this.props.totalFilters.cvc === ''){
                alert('please fill required fields')
                return;
            }
        }
        else{
            if(this.props.totalFilters.name === '' || this.props.totalFilters.surname === '' || this.props.totalFilters.email === ''){
                alert('please fill required fields')
                return;
            }
        }
        this.props.send_temp_email(this.props.totalFilters, apiUrl, this.props.totalCount)
    }
    render() {
        let backgroundColorTemplate = this.state.templateNav?'rgb(23, 233, 225)':'whitesmoke'
        let backgroundColorPayment = this.state.paymentNav?'rgb(23, 233, 225)':'whitesmoke'
        let colorTemplate = this.state.templateNav?'white':'gray'
        let colorPayment = this.state.paymentNav?'white':'gray'
        let hiddenCardInfos = !this.state.paymentNav
        console.log(this.props.totalFilters)
        return (
            <div className="container">
                <div className="row" style={backgroundStyle}>
                    <div className="col-sm-12 col-md-8" >

                        <div className="row payment_container" style={infoColumn}>

                            <div className="col-sm-6 col-md-6 select_nav_buttons" style={{height:'50px',backgroundColor: backgroundColorTemplate}} onClick={()=> this.setState({paymentNav:false,templateNav:true})}>
                                <div><label className="header-categories" style={{color:colorTemplate}}>Send template</label></div></div>
                            <div className="col-sm-6 col-md-6  select_nav_buttons" style={{backgroundColor: backgroundColorPayment}} onClick={()=> this.setState({paymentNav:true,templateNav:false})} >
                                <label className="header-location" style={{color:colorPayment}}>Send all data and proceed payment</label>
                            </div>

                            <div className="col-md-12 col-sm-12" style={{height:'50px',borderTopColor:'rgb(23, 233, 225)',borderTopWidth:'5px',borderTopStyle:'solid'}}>
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
                            <div className="col-md-12 col-sm-12 card_info_header_container" hidden ={hiddenCardInfos}>
                                <div><h1 className="card_info_header">Card Fields</h1></div>
                            </div>
                            <div className="col-md-12 col-sm-12" hidden ={hiddenCardInfos}>
                                <input className="input_text_style"  type="email" placeholder="Card Number*" required value={this.props.totalFilters.card_number} onChange={(event) => this.props.set_customer_info(event.target.value, 'card_number')}>
                                </input>
                            </div>
                            <div className="col-md-4 col-sm-4" hidden ={hiddenCardInfos}>
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
                            <div className="col-md-4 col-sm-4" hidden ={hiddenCardInfos}>
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
                            <div className="col-md-4 col-sm-4" hidden ={hiddenCardInfos}>
                                <input className="input_text_style" type="tel" placeholder="CVC*" value={this.props.totalFilters.cvc}
                                onChange={(event) => this.props.set_customer_info(event.target.value, 'cvc')}>
                                </input>
                            </div>
                            <div className="col-12 send_button_container" onClick={() => this.checkBeforeSubmit()}>
                                <div className="">
                                    <h1 className="send_button_text">{!this.state.paymentNav?'Send Template':'Send All and Proceed Payment'}</h1>
                                </div>
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
        send_temp_email: bindActionCreators(send_temp_email, dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(PaymentOrEmailPage);