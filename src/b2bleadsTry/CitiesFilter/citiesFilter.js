import React, { Component } from 'react'
//bootstrap
import Button from 'react-bootstrap/Button'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, insertChoosenCities, getZipCodesInCities, getTotalData } from '../../actions/fetchActions'
import './citiesFilter.css'

//url
import { apiUrl } from '../../consts/consts'
class CitiesFilter extends Component {

    render() {
        console.log(this.props.totalFilters.cities)
        let cities = null
        if (Object.keys(this.props.totalFilters.cities).length !== 0) {
            cities =
                <div className="row every-filter-container">
                    <div className="filters-common-header-container"><span className="categories-header-filter-text-1">Cities</span></div>
                    {Object.keys(this.props.totalFilters.cities).map((city, index) => {
                        console.log(this.props.totalFilters.cities[city])
                        return (

                            <div className="category-filter-con">
                                <div className="filter-info-container" >
                                    <span className="category-text-span" >{city}, {this.props.totalFilters.cities[city].state}</span>
                                </div>
                                <div className="category-remove-button-con">
                                    <button className="close-button" onClick={(event) => {
                                        this.props.setSpinner()
                                        this.props.insertChoosenCities(event, "cities", index, city)
                                        this.props.getZipCodesInCities(apiUrl, "cities", this.props.totalFilters.cities)
                                        this.props.setSpinner()
                                        this.props.getTotalData(this.props.totalFilters, apiUrl)
                                    }} ></button>
                                </div>

                            </div>
                        )
                    })}
                </div>
        }
        return (
            <div className="col-12" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                {cities}
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
        insertChoosenCities: bindActionCreators(insertChoosenCities, dispatch),
        getZipCodesInCities: bindActionCreators(getZipCodesInCities, dispatch),
        getTotalData: bindActionCreators(getTotalData, dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(CitiesFilter);