import React, { Component } from 'react'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//Components
import States from '../States/states'
import Cities from '../Cities/cities'
import ZipCodes from '../ZipCodes/zipCodes'
import { changeStateColumn, setCitySearchKey, searchCitiesInList,searchZipCodesInList,setZipCodeSearchKey } from '../../actions/fetchActions'

//css
import './locations.css'

class Locations extends Component {

    render() {
        return (
            <div className="row locations-container" style={{zIndex:-1}}>
                <div className="col-6 locations-header-box">
                
                    <div className="wrap">
                        <div className="search">
                            <input type="text" className="searchTerm" placeholder="Search states" value={this.props.searchKeyState} onKeyDown={(event) => this.props.changeStateColumn(event)} onChange={(event) => this.props.changeStateColumn(event)} />
    
                        </div>
                    </div>
                </div>
                <div className="col-6 locations-header-box">
                   
                    <div className="wrap">
                        <div className="search" >
                            <input type="text" className="searchTerm" placeholder="Search cities" value={this.props.searchKeyCities}
                                /*onKeyDown={(event) => {
                                    this.props.setCitySearchKey(event)
                                    this.props.searchCitiesInList(event, this.props.defaultCities)
                                }}*/
                                onChange={(event) => {
                                    this.props.setCitySearchKey(event)
                                    this.props.searchCitiesInList(event, this.props.defaultCities)
                                }} />
                
                        </div>
                        {/*<h6 style={{ fontSize: '12px', color: 'white', marginTop: '5px' }}>Select state, type key word, click Enter or search button!</h6>*/}
                    </div>
                </div>
                {/*<div className="col-6 locations-header-box">
                  
                    <div className="wrap">
                        <div className="search">
                            <input type="text" className="searchTerm" placeholder="Search zipCodes" value={this.props.searchKeyZipCodes} onKeyDown={(event) => this.changeZipCodes(event)}
                                onChange={(event) => {
                                    this.props.setZipCodeSearchKey(event)
                                    this.props.searchZipCodesInList(event, this.props.defaultZipCodes)
                                }} />
                           
                            </div>
                        <h6 style={{ fontSize: '12px', color: 'white', marginTop: '5px' }}>Select city first, type key zipCode, click Enter or search button!</h6>
                    </div>
                </div>*/}
                <div className="col-6 mh-75 overflow-auto state-container container-scroll">

                    <States /></div>
                <div className="col-6 city-container container-scroll">

                    <Cities />
                </div>
                {/*<div className="col-4 zipCode-container container-scroll"><ZipCodes /></div>*/}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
    return {
        changeStateColumn: bindActionCreators(changeStateColumn, dispatch),
        setCitySearchKey: bindActionCreators(setCitySearchKey, dispatch),
        searchCitiesInList: bindActionCreators(searchCitiesInList, dispatch),
        setZipCodeSearchKey:bindActionCreators(setZipCodeSearchKey,dispatch),
        searchZipCodesInList:bindActionCreators(searchZipCodesInList,dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Locations);