import React, { Component } from 'react'
//bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, insertChoosenStates,getCitiesInState } from '../../../actions/fetchActions'
import './statesFilter.css'

//url
import {apiUrl} from '../../../consts/consts'
class StatesFilter extends Component {
    
    render() {
        let states = null
        console.log(Object.keys(this.props.totalFilters.states))
        if(Object.keys(this.props.totalFilters.states).length !== 0){
            states = 
            <Container style={{marginTop:'10px',borderRadius:'5px',backgroundColor:'#416268',width:'100%'}}>
                <Row style={{textAlign:'center',alignItems:'center',justifyContent:'center'}}><h2 style={{color:'#fff',textAlign:'center',fontSize:'12px',fontWeight:'bold'}}>States</h2></Row>
                {Object.keys(this.props.totalFilters.states).map((state,index) => {
                    return (
                        <Row style={{height:'auto'}}> 
                            <Col sm={8} style={{display:'flex',justifyContent:'left',alignItems:'left'}}>
                                <div><label style = {{fontWeight:'bold',color:'#000',fontSize:'10px',}}>{state}</label></div>
                            </Col>
                            <Col sm={4} style={{display:'flex',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                                <div>
                                    <button  className="close-button pull-right " onClick={(event) => {
                                        this.props.setSpinner()
                                        this.props.insertChoosenStates(event, "states", index, state)
                                        this.props.getCitiesInState(apiUrl, "states", this.props.totalFilters.states)
                                    }} ></button>
                                </div>
                            </Col>
                        </Row>
                    )
                })}
            </Container>
        }
        return( 
            <Container>
                {states}
            </Container>
        )
    }
}
function mapStateToProps(state) {
    return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
    return {
        setSpinner:bindActionCreators(setSpinner,dispatch),
        insertChoosenStates: bindActionCreators(insertChoosenStates,dispatch),
        getCitiesInState: bindActionCreators(getCitiesInState,dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(StatesFilter);