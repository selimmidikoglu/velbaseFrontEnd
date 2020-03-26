import React, { Component } from 'react'
import { DualRing } from 'react-spinners-css';//Circle, Heart, Ripple,Orbitals, Ring, Hourglass, Facebook,
import { useState, useEffect } from 'react';
class Spinner extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
        
    }
    
    render() {
        return(
            <div style={{top:0,left:0,width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',background: 'rgba(62, 126, 179,0.48)',zIndex : '5000',position : 'fixed'}}>
              <DualRing color="white" size={100} />
            </div>
          )
    }
}

export default Spinner;