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
import { setSpinner, getTotalData, alert_top_limit } from '../../actions/fetchActions'

import { Link } from 'react-router-dom'
import './resultsColumn.css'
import { apiUrl } from '../../consts/consts'

class ResultsColumn extends Component {

    render() {

        return (
            <div className="col-12 result-inner-box">
                <div className="row count-and-price-container" >
                    <div className="col-12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
                        <h1 style={{ display: 'block', color: '#2B3079', fontSize: 18, fontFamily: 'Gilmer-Heavy' }} className="dataCount" >Total Count :</h1>
                        <h1 style={{ display: 'block', color: '#455A64', fontSize: 18, fontFamily: 'Gilmer-Heavy' }} className="dataCount" >{this.props.totalCount}</h1>
                    </div>
                    <div className="col-12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
                        <h1 style={{ display: 'block', color: '#2B3079', fontSize: 18, fontFamily: 'Gilmer-Heavy' }} className="dataCount" >Total Price: </h1>
                        <h1 style={{ display: 'block', color: '#455A64', fontSize: 18, fontFamily: 'Gilmer-Heavy' }} className="dataCount" >{this.props.totalCount * 9 / 100}$</h1>
                    </div>
                    <Link style={{ textDecoration: 'none' }} to={this.props.totalCount < 6 || this.props.totalCount > 111111 ? { pathname: "/leads", state: { section: 'full_data' } } : { pathname: "/second", state: { section: 'full_data' } }}
                        onClick={() => {
                            if (this.props.totalCount < 6 || this.props.totalCount > 111111)
                                this.props.alert_top_limit()
                        }}
                    >
                        <div className="col-12" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} hidden={this.props.totalCount !== 0 ? false : true}>
                            <div className="data-button"><h1 className="data-button-text">Proceed to Payment</h1>
                            </div>
                        </div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} to={{ pathname: "/second", state: { section: 'sample' } }}>
                        <div className="col-12" hidden={this.props.totalCount !== 0 ? false : true}>

                            <div className=""><h1 className="data-button-text get-sample-button" style={{ fontSize: '14px', textDecoration: 'underline', fontFamily: 'Gilmer-Regular' }}>Get sample</h1></div>
                        </div>

                    </Link>
                </div>




                <div className="row filters-new-container">
                    <div className="col-12" style={{display: 'flex', alignItems: 'center', justifyContent: 'center',textAlign:'center',  backgroundColor: 'rgb(115, 119, 167)',borderTopRightRadius:'5px',borderTopLeftRadius:'5px'}}>

                       <span className="filters-header">Filters</span><br />
                    </div>
                    <CategoriesFilter />
                    <StatesFilter />
                    <CitiesFilter />
                    <ZipCodesFilter />
                    <FieldFiltersFilters />
                    <AnnEmpFilter />
                    <EmpFilter />

                </div>

                <div className="row count-of-other-data" hidden={this.props.totalCount !== 0 ? false : true}>

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
        setSpinner: bindActionCreators(setSpinner, dispatch),
        getTotalData: bindActionCreators(getTotalData, dispatch),
        alert_top_limit: bindActionCreators(alert_top_limit, dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ResultsColumn);