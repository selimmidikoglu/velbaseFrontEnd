import React, { Component } from 'react'
import { ElementsConsumer } from "@stripe/react-stripe-js";
import CheckoutForm from './stripeElements'
class CardForm extends Component{

    render(){
      return (
        <ElementsConsumer>
          {({elements, stripe}) => (
            <CheckoutForm elements={elements} stripe={stripe}  
            options={{
              style: {
                  fontSize: '40px',
                  color: '#123313',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}/>
          )}
        </ElementsConsumer>
      );
    }
  }

  export default CardForm;