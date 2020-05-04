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
            <div className="row every-filter-container">
                <div className="filters-common-header-container" ><span className="categories-header-filter-text-1">Field Filters</span></div>
                <div className="category-filter-con" hidden={!this.props.totalFilters.hasPhone1}>
                    <div className="filter-info-container" hidden={!this.props.totalFilters.hasPhone1}>
                        <span className="category-text-span">Has Phone</span>
                    </div>
                    <div className="category-remove-button-con" hidden={!this.props.totalFilters.hasPhone1}>
                        <button className="close-button" onClick={(event) => {
                            this.props.setSpinner()
                            this.props.update_other_filter(true, 'phone', null)
                            setTimeout(() => this.props.getTotalData(this.props.totalFilters, apiUrl), 200)
                        }} ></button>
                    </div>
                </div>
                <div className="category-filter-con" hidden={!this.props.totalFilters.hasEmail1}>
                    <div className="filter-info-container" hidden={!this.props.totalFilters.hasEmail1}>
                        <span className="category-text-span">Has Email</span>
                    </div>
                    <div className=" category-remove-button-con" hidden={!this.props.totalFilters.hasEmail1}>
                        <button className="close-button" onClick={(event) => {
                            this.props.setSpinner()
                            this.props.update_other_filter(true, 'email', null)
                            setTimeout(() => this.props.getTotalData(this.props.totalFilters, apiUrl), 200)
                        }} ></button>
                    </div>

                </div>
                <div className="category-filter-con"  hidden={!this.props.totalFilters.hasWebsite}>
                        <div className="filter-info-container" hidden={!this.props.totalFilters.hasWebsite}>
                            <span className="category-text-span">Has Website</span>
                        </div>
                        <div className="category-remove-button-con" hidden={!this.props.totalFilters.hasWebsite}>
                            <button className="close-button" onClick={(event) => {
                                this.props.setSpinner()
                                this.props.update_other_filter(true, 'website', null)
                                setTimeout(() => this.props.getTotalData(this.props.totalFilters, apiUrl), 200)
                            }} ></button>
                        </div>
                </div>
            </div>
        if (!(this.props.totalFilters.hasEmail1 || this.props.totalFilters.hasPhone1 || this.props.totalFilters.hasWebsite)) {
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