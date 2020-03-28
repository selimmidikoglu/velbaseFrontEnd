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
import FieldFiltersFilters from '../FieldFilters_Filters/fieldFiltersFilters'

import EmpFilter from '../EmpFilter/empFilter'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, getTotalData,alert_top_limit } from '../../actions/fetchActions'

import {Link} from 'react-router-dom'
import './resultsColumn.css'
import {apiUrl} from '../../consts/consts'

class ResultsColumn extends Component {
    
    render() {
        
        return( 
            <div className="col-12 result-inner-box">
                <div className="row" style={{justifyContent:'center',alignItems:'center', textAlign:'center',backgroundColor:'white'}}>
                    <h1 style = {{marginTop: '10px',color:'#FCBD17',fontSize:18,height:'50%', fontFamily:'Gilmer-Heavy',marginRight:'5px'}}className = "dataCount" >Total Count :</h1>
                    <h1 style = {{marginTop: '10px',color:'#455A64',fontSize:18,height:'50%', fontFamily:'Gilmer-Regular'}}className = "dataCount" >{this.props.totalCount}</h1>
                </div>
                <div className="row" style={{justifyContent:'center',alignItems:'center', textAlign:'center',backgroundColor:'white'}}>
                    <h1 style = {{marginTop: '10px',color:'#FCBD17',fontSize:18,height:'50%', fontFamily:'Gilmer-Heavy',marginRight:'5px'}} className = "dataCount" >Total Price: </h1>
                    <h1 style = {{marginTop: '10px',color:'#455A64',fontSize:18,height:'50%', fontFamily:'Gilmer-Regular'}}className = "dataCount" >{this.props.totalCount * 9/100}$</h1>
                </div>
                <Link style={{textDecoration:'none'}} to={this.props.totalCount < 6|| this.props.totalCount > 11111.1111?{pathname:"/leads",state:{section:'full_data'}}:{pathname:"/second",state:{section:'full_data'}}} 
                    onClick={() => {
                        this.props.alert_top_limit()
                    }}
                >
                    <div className="row"   hidden={this.props.totalCount!==0?false:true} onClick={() => this.props.alert_top_limit()}>    
                        <div className = "data-button" onClick = {()=>{
                            this.props.alert_top_limit()
                            }}><h1 className="data-button-text">Process payment</h1>
                            </div>
                    </div>
                </Link>
                <Link style={{textDecoration:'none'}} to={{pathname:"/second",state:{section:'sample'}}}>
                <div className="row"   hidden={this.props.totalCount!==0?false:true}>
                    
                    <div className = ""><h1 className="data-button-text get-sample-button" style={{fontSize:'14px',textDecoration:'underline',fontFamily:'Gilmer-Regular'}}>Get sample</h1></div>
                    </div>
                
                </Link>
                
               
                <div className= "row filters-box-container" style={{borderColor: 'white', borderWidth:'1px',borderStyle:'solid', backgroundColor:'#2B3079',paddingBottom:'10px',marginTop:'20px',borderRadius:'10px'}}>
                        <div className="col-12"  style={{padding:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <div style={{widht:'100%'}}><h1 className="filters-header">Filters</h1></div> <br/> 
                        </div>
                        <CategoriesFilter/>
                        <StatesFilter/>
                        <CitiesFilter/>
                        <ZipCodesFilter/>
                        <FieldFiltersFilters/>
                        <AnnEmpFilter/>
                        <EmpFilter/>
                 
                </div>
                
                <div className="row count-of-other-data" hidden={this.props.totalCount!==0?false:true}>
                    
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6">
                                    <h1 className="other-params-text">Facebook:</h1>
                                </div>
                                <div className="col-6">
                                    <h1 className="other-params-data-text">{this.props.countFacebook}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6">
                                    <h1 className="other-params-text">Twitter:</h1>
                                </div>
                                <div className="col-6">
                                    <h1 className="other-params-data-text">{this.props.countTwitter}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6">
                                    <h1 className="other-params-text">Email:</h1>
                                </div>
                                <div className="col-6">
                                    <h1 className="other-params-data-text">{this.props.countEmail}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6">
                                    <h1 className="other-params-text">Website:</h1>
                                </div>
                                <div className="col-6">
                                    <h1 className="other-params-data-text">{this.props.countWebsite}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6">
                                    <h1 className="other-params-text">Fax:</h1>
                                </div>
                                <div className="col-6">
                                    <h1 className="other-params-data-text">{this.props.countFax}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6">
                                    <h1 className="other-params-text">bbb_accredited:</h1>
                                </div>
                                <div className="col-6">
                                    <h1 className="other-params-data-text">{this.props.countBBB}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
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
        )
    }
}
function mapStateToProps(state) {
    return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
    return {
        setSpinner: bindActionCreators(setSpinner,dispatch),
        getTotalData: bindActionCreators(getTotalData,dispatch),
        alert_top_limit: bindActionCreators(alert_top_limit,dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ResultsColumn);