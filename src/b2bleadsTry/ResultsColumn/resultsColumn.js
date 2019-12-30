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
import AnnEmpFilter from '../Ann-Emp-Filter/annualFilter'
import EmpFilter from '../Ann-Emp-Filter/employeeFilter'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, getTotalData } from '../../actions/fetchActions'

import {Link} from 'react-router-dom'
import './resultsColumn.css'
import {apiUrl} from '../../consts/consts'

class ResultsColumn extends Component {
    
    render() {
        
        return( 
            <div className="container result-inner-box">
                <div className="row" style={{justifyContent:'center',alignContent:'center', textAlign:'center',backgroundColor:'cyan',borderRadius:'15px'}}>
                    <label style = {{marginTop: '10px',color:'#455A64',fontSize:18,fontWeight:'bold',height:'50%'}}className = "dataCount" >Total Count: {this.props.totalCount}</label>
                </div>
                <Link to="/second">
                <div className="row"  hidden={this.props.totalCount!==0?false:true}>
                    
                    <a className = "data-button" onClick = {()=>{
                        this.props.setSpinner()
                        this.props.getTotalData(this.props.totalFilters,apiUrl)
                        }}><h1 className="data-button-text">Get template</h1></a>
                </div>
                </Link>
                <div className="col-12" style={{padding:0}}>
                    <CategoriesFilter/>
                </div>
                <div className= "col-12">
                    <div className="row">
                        <StatesFilter/>
                        <CitiesFilter/>
                        <ZipCodesFilter/>
                    </div>     
                </div>
                <div className="col-12">
                    <div className="row">
                        <AnnEmpFilter/>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row">
                        <EmpFilter/>
                    </div>
                </div>
                <div className="col-12 count-of-other-data">
                    <div className="row"  hidden={this.props.totalCount!==0?false:true} style={{marginTop:'10px',borderRadius:'5px',backgroundColor:'#416268',width:'100%'}}>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <h1 className="other-params-text">Facebook:</h1>
                                </div>
                                <div className="col-6">
                                    <h1 className="other-params-data-text">{this.props.countFacebook}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <h1 className="other-params-text">Twitter:</h1>
                                </div>
                                <div className="col-6">
                                    <h1 className="other-params-data-text">{this.props.countTwitter}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <h1 className="other-params-text">Email:</h1>
                                </div>
                                <div className="col-6">
                                    <h1 className="other-params-data-text">{this.props.countEmail}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <h1 className="other-params-text">Website:</h1>
                                </div>
                                <div className="col-6">
                                    <h1 className="other-params-data-text">{this.props.countWebsite}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <h1 className="other-params-text">Fax:</h1>
                                </div>
                                <div className="col-6">
                                    <h1 className="other-params-data-text">{this.props.countFax}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <h1 className="other-params-text">bbb_accredited:</h1>
                                </div>
                                <div className="col-6">
                                    <h1 className="other-params-data-text">{this.props.countBBB}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <h1 className="other-params-text">Reviewed:</h1>
                                </div>
                                <div className="col-6">
                                    <h1 className="other-params-data-text">{this.props.countReviews}</h1>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                    
                </div>
                
            </div>
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