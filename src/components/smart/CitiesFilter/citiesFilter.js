import React, { Component } from 'react'
//bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, insertChoosenCities,getZipCodesInCities } from '../../../actions/fetchActions'
import './citiesFilter.css'

//url
import {apiUrl} from '../../../consts/consts'
class CitiesFilter extends Component {
    
    render() {
        let cities = null
        console.log(Object.keys(this.props.totalFilters.cities))  
        if(Object.keys(this.props.totalFilters.cities).length !== 0){
            cities = 
            <Container style={{marginTop:'10px',borderRadius:'5px',backgroundColor:'#416268',width:'100%'}}>
                <Row style={{textAlign:'center',alignItems:'center',justifyContent:'center'}}><h2 style={{color:'#fff',textAlign:'center',fontSize:'12px',fontWeight:'bold'}}>Cities</h2></Row>
                {Object.keys(this.props.totalFilters.cities).map((city,index) => {
                    return (
                        <Row style={{height:'auto'}}> 
                            <Col sm={8} style={{display:'flex',justifyContent:'left',alignItems:'left'}}>
                                <div><label style = {{fontWeight:'bold',color:'#000',fontSize:'10px',}}>{city}</label></div>
                            </Col>
                            <Col sm={4} style={{display:'flex',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                                <div>
                                    <button  className="close-button pull-right " onClick={(event) => {
                                        this.props.setSpinner()
                                        this.props.insertChoosenCities(event, "cities", index, city)
                                        this.props.getZipCodesInCities(apiUrl, "cities", this.props.totalFilters.cities)
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
                {cities}
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
        insertChoosenCities: bindActionCreators(insertChoosenCities,dispatch),
        getZipCodesInCities: bindActionCreators(getZipCodesInCities,dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(CitiesFilter);