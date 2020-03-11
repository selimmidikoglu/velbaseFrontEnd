import React, { useMemo, Component } from "react";
import { useStripe, useElements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js";

import useResponsiveFontSize from "./useResponsiveFontSize";
import './stripeElements.css'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, insertChoosenStates, getCitiesInState, getTotalData, update_other_filter, set_customer_info, send_temp_email } from '../../actions/fetchActions'
import { apiUrl } from '../../consts/consts'
class CheckoutForm extends Component {
  handleSubmit = async (event) => {
    console.log("fonksiyona giriyor")
    // Block native form submission.
    event.preventDefault();

    const { stripe, elements } = this.props;

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
    const { error, token } = await stripe.createToken(cardElement, { name: 'Selim' });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', token);
      console.log(token.id)
      this.props.set_customer_info(token.id, 'payment_token')
      console.log(this.props)
      this.props.setSpinner()
      this.props.send_temp_email(this.props.totalFilters, apiUrl, this.props.totalCount, 'data')
    }
  };
  render() {
    const { stripe } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement />
        <div className="col-12 send_button_container" onClick={(event) => this.handleSubmit(event)}>
          <h1 className="send_button_text">Send All and Proceed Payment</h1>
        </div>

      </form>
    );
  }
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
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
