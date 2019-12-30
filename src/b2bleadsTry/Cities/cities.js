import React, { Component } from 'react'
//bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getZipCodesInCities, insertChoosenCities,setSpinner, searchCitiesInList, getTotalData} from '../../actions/fetchActions'
//Css
import './cities.css'
import {apiUrl} from '../../consts/consts'

class Cities extends Component {
    render() {
        //console.log(this.props.matchedCities)
        let cities = null;
        if (typeof this.props.matchedCities !== 'undefined') {
            return (
                this.props.matchedCities.map((city, index) => {
                    return (
                        <div key={index} className=" row styles-checkbox">
                                <div className="col-md-8" style={{ textAlign: 'left' }}><label className="city-text">{city.city}{ ', '  + city.state} </label></div>
                                <div classname="col-md-4" ><div><input type="checkbox" key={index} className="option-input checkbox" checked={this.props.totalFilters.cities[city.city]}
                                    onClick={(event) => {
                                        this.props.setSpinner()
                                        this.props.insertChoosenCities(event, "cities", city.state, city.city)
                                        this.props.getZipCodesInCities(apiUrl, "cities", this.props.totalFilters.cities)
                                        this.props.setSpinner()
                                        this.props.getTotalData(this.props.totalFilters,apiUrl)
                                        
                                    }} /></div></div>
                        </div>
                    )

                })
            )
        }
    }
}

function mapStateToProps(state) {
    return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
    return {
        getZipCodesInCities: bindActionCreators(getZipCodesInCities, dispatch),
        insertChoosenCities: bindActionCreators(insertChoosenCities, dispatch),
        setSpinner : bindActionCreators(setSpinner,dispatch),
        searchCitiesInList: bindActionCreators(searchCitiesInList,dispatch),
        getTotalData: bindActionCreators(getTotalData,dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Cities);