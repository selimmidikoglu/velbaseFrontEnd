import React, { Component } from 'react'
//bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
//other components
import CategoriesFilter from '../CategoriesFilter/categoriesFilter'
import StatesFilter from '../StatesFilter/statesFilter'
import ZipCodesFilter from '../ZipCodesFilter/zipCodesFilter'
import CitiesFilter from '../CitiesFilter/citiesFilter'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, getTotalData } from '../../../actions/fetchActions'
import './resultsColumn.css'
const apiUrl = "http://139.99.68.189:3000/"

class ResultsColumn extends Component {
    
    render() {
        
        return( 
            <Container>
                <Row style={{justifyContent:'center',alignContent:'center', textAlign:'center',backgroundColor:'cyan',borderRadius:'15px'}}>
                    <label style = {{marginTop: '10px',color:'#455A64',fontSize:18,fontWeight:'bold',height:'50%'}}className = "dataCount" >Total Count: {this.props.totalCount}</label>
                </Row>
                <Row style={{height:'20px'}}>
                    <button className = "data-button" onClick = {()=>{
                        this.props.setSpinner()
                        this.props.getTotalData(this.props.totalFilters,apiUrl)
                        }}></button>
                </Row>
                <Row>
                    <CategoriesFilter/>
                </Row>
                <Row>
                    <StatesFilter/>
                </Row>
                <Row>
                    <CitiesFilter/>
                </Row>
                <Row>
                    <ZipCodesFilter/>
                </Row>
            </Container>
        )
    }
}
function mapStateToProps(state) {
    return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
    return {
        setSpinner: bindActionCreators(setSpinner,dispatch),
        getTotalData: bindActionCreators(getTotalData,dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ResultsColumn);