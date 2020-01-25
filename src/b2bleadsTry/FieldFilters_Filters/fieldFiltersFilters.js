import React, { Component } from 'react'
//bootstrap
import Button from 'react-bootstrap/Button'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, update_other_filter, getTotalData } from '../../actions/fetchActions'


//url
import { apiUrl } from '../../consts/consts'
class FieldFiltersFilters extends Component {

    render() {
        let filters = null
        filters =
            <div className="row" style={{ marginTop: '10px', borderRadius: '5px', backgroundColor: '#81d4fa', width: '100%', padding: '20px' }}>
                <div className="col-12" style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}><h2 style={{ color: '#fff', textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}>Field Filters</h2></div>

                <div className="col-lg-10 col-md-8 col-sm-6 city-text-container" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', height: '20px', margin: 0 }} hidden={!this.props.totalFilters.hasPhone1}>
                    <h1 className="city-text-filter" style={{ color: '#fff', fontSize: '13px' }}>Has Phone</h1>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }} hidden={!this.props.totalFilters.hasPhone1}>
                    <div>
                        <button className="close-button pull-right " onClick={(event) => {
                            this.props.setSpinner()
                            this.props.update_other_filter(true, 'phone', null)
                            setTimeout(() => this.props.getTotalData(this.props.totalFilters, apiUrl), 200)
                        }} ></button>
                    </div>
                </div>

                <div className="col-lg-10 col-md-8 col-sm-6 city-text-container" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', height: '20px', marginTop:'5px' }} hidden={!this.props.totalFilters.hasEmail1}>
                    <h1 className="city-text-filter" style={{ color: '#fff', fontSize: '13px' }}>Has Email</h1>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center',marginTop:'5px' }} hidden={!this.props.totalFilters.hasEmail1}>
                    <div>
                        <button className="close-button pull-right " onClick={(event) => {
                            this.props.setSpinner()
                            this.props.update_other_filter(true, 'email', null)
                            setTimeout(() => this.props.getTotalData(this.props.totalFilters, apiUrl), 200)
                        }} ></button>
                    </div>
                </div>

                <div className="col-lg-10 col-md-8 col-sm-6 city-text-container" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', height: '20px', marginTop:'5px' }} hidden={!this.props.totalFilters.hasWebsite}>
                    <h1 className="city-text-filter" style={{ color: '#fff', fontSize: '13px' }}>Has Website</h1>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center',marginTop:'5px' }} hidden={!this.props.totalFilters.hasWebsite}>
                    <div>
                        <button className="close-button pull-right " onClick={(event) => {
                            this.props.setSpinner()
                            this.props.update_other_filter(true, 'website', null)
                            setTimeout(() => this.props.getTotalData(this.props.totalFilters, apiUrl), 200)
                        }} ></button>
                    </div>
                </div>

            </div>
        if(!(this.props.totalFilters.hasEmail1 || this.props.totalFilters.hasPhone1 ||this.props.totalFilters.hasWebsite))
        {
            filters = null
        }
        return (
            <div className="col-12" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                {filters}
            </div >
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
        update_other_filter: bindActionCreators(update_other_filter, dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(FieldFiltersFilters);