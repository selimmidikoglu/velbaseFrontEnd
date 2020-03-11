import React, { Component } from 'react'
import { ElementsConsumer } from "@stripe/react-stripe-js";
import CheckoutForm from './stripeElements'
class CardForm extends Component{

    render(){
      return (
        <ElementsConsumer>
          {({elements, stripe}) => (
            <CheckoutForm elements={elements} stripe={stripe} />
          )}
        </ElementsConsumer>
      );
    }
  }

  export default CardForm;