import React, { Component } from 'react'
//bootstrap
import Button from 'react-bootstrap/Button'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, insertChoosenCities,getZipCodesInCities, getTotalData} from '../../actions/fetchActions'
import './citiesFilter.css'

//url
import {apiUrl} from '../../consts/consts'
class CitiesFilter extends Component {
    
    render() {
        console.log(this.props.totalFilters.cities)
        let cities = null
        if(Object.keys(this.props.totalFilters.cities).length !== 0){
            cities = 
            <div className="row" className="every-filter-container">
                <div className="col-12" style={{textAlign:'center',alignItems:'center',justifyContent:'center'}}><h2 className="categories-header-filter-text-1">Cities</h2></div>
                {Object.keys(this.props.totalFilters.cities).map((city,index) => {
                    console.log(this.props.totalFilters.cities[city])
                    return (
                        
                        <div className= "col-12" style={{width:'100%',marginTop:'3px'}}> 
                            <div className = "row category-filter-con">
                            <div className="col-10 col-md-8 col-lg-11 filter-info-container" >
                                <span className="city-text-filter" style = {{color:'#fff',fontSize:'13px'}}>{city}, {this.props.totalFilters.cities[city].state}</span>
                            </div>
                            <div className="col-2 col-md-4 col-lg-1 category-remove-button-con">
                                    <button  className="close-button" onClick={(event) => {
                                        this.props.setSpinner()
                                        this.props.insertChoosenCities(event, "cities", index, city)
                                        this.props.getZipCodesInCities(apiUrl, "cities", this.props.totalFilters.cities)
                                        this.props.setSpinner()
                                        this.props.getTotalData(this.props.totalFilters,apiUrl)
                                    }} ></button>
                            </div>
                        </div>
                        </div>
                    )
                })}
            </div>
        }
        return( 
            <div className="col-12" style={{display:'flex',alignItems:'flex-start',justifyContent:'center'}}>
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
        setSpinner:bindActionCreators(setSpinner,dispatch),
        insertChoosenCities: bindActionCreators(insertChoosenCities,dispatch),
        getZipCodesInCities: bindActionCreators(getZipCodesInCities,dispatch),
        getTotalData: bindActionCreators(getTotalData,dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(CitiesFilter);