import React, { Component } from 'react'
//bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { insertChoosenZipCodes } from '../../../actions/fetchActions'
import './zipCodesFilter.css'

//url
import {apiUrl} from '../../../consts/consts'
class ZipCodesFilter extends Component {
    
    render() {
        let zipCodes = null
        if(Object.keys(this.props.totalFilters.zipCodes).length !== 0){
            zipCodes = 
            <Container style={{marginTop:'10px',borderRadius:'5px',backgroundColor:'#416268',width:'100%'}}>
                <Row style={{textAlign:'center',alignItems:'center',justifyContent:'center'}}><h2 style={{color:'#fff',textAlign:'center',fontSize:'12px',fontWeight:'bold'}}>ZipCodes</h2></Row>
                {Object.keys(this.props.totalFilters.zipCodes).map((zipCode,index) => {
                    return (
                        <Row style={{height:'auto'}}> 
                            <Col sm={8} style={{display:'flex',justifyContent:'left',alignItems:'left'}}>
                                <div><label style = {{fontWeight:'bold',color:'#000',fontSize:'10px',}}>{zipCode}</label></div>
                            </Col>
                            <Col sm={2} style={{display:'flex',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                                <div>
                                    <button  className="close-button" href="/"  onClick={(event) => {
                                        this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode)
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
                {zipCodes}
            </Container>
        )
    }
}
function mapStateToProps(state) {
    return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
    return {
        insertChoosenZipCodes: bindActionCreators(insertChoosenZipCodes,dispatch),

    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ZipCodesFilter);