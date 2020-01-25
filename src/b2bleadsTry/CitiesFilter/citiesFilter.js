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
            <div className="row" style={{marginTop:'10px',borderRadius:'5px',backgroundColor:'#81d4fa',width:'100%',padding:'20px'}}>
                <div className="col-12" style={{textAlign:'center',alignItems:'center',justifyContent:'center'}}><h2 style={{color:'#fff',textAlign:'center',fontSize:'12px',fontWeight:'bold'}}>Cities</h2></div>
                {Object.keys(this.props.totalFilters.cities).map((city,index) => {
                    console.log(this.props.totalFilters.cities[city])
                    return (
                        
                        <div className= "col-12" style={{height:'auto'}}> 
                            <div className = "row" style={{marginTop:'5px'}}>
                            <div className="col-md-10 city-text-container" style={{display:'flex',justifyContent:'left',alignItems:'center',height:'20px',margin:0}}>
                                <h1 className="city-text-filter" style = {{color:'#fff',fontSize:'13px'}}>{city}, {this.props.totalFilters.cities[city].state}</h1>
                            </div>
                            <div className="col-md-2"style={{display:'flex',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                                <div>
                                    <button  className="close-button pull-right " onClick={(event) => {
                                        this.props.setSpinner()
                                        this.props.insertChoosenCities(event, "cities", index, city)
                                        this.props.getZipCodesInCities(apiUrl, "cities", this.props.totalFilters.cities)
                                        this.props.setSpinner()
                                        this.props.getTotalData(this.props.totalFilters,apiUrl)
                                    }} ></button>
                                </div>
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