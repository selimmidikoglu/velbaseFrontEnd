import React, { Component } from 'react'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//actions
import {
  setSearchKeyCategories, getMatchedCategories, setSearchKeyLocations, fetchLocations,
  insertChoosenStates, getZipCodesInCities, insertChoosenCities, getCitiesInState, setSpinner, getTotalData
} from '../../actions/fetchActions'
//const
import { apiUrl } from '../../consts/consts'
import './searchBar.css'

class SearchBar extends Component {
  getMatchCategories = (event) => {
    if (this.props.fetchReducer.searchKeyCategories !== "" && this.props.fetchReducer.searchKeyCategories.length > 2) {
      this.props.getMatchedCategories(apiUrl + "getMatchCategories", this.props.fetchReducer.searchKeyCategories)
    }
  }
  handleKeyEnterCategories = (e) => {
    console.log(this.props.fetchReducer.searchKeyCategories)
    if (e.key === 'Enter' && this.props.fetchReducer.searchKeyCategories !== "") {
      console.log("girdi")

      this.props.getMatchedCategories(apiUrl + "getMatchCategories", this.props.fetchReducer.searchKeyCategories)
    }
  }
  getMatchLocations = (event) => {
    if (this.props.searchKeyLocations !== "" && this.props.searchKeyLocations.length > 2) {
      this.props.fetchLocations(apiUrl, this.props.fetchReducer.searchKeyLocations)
    }
  }
  handleKeyEnterLocations = (e) => {
    setTimeout(() => this.props.fetchLocations(apiUrl, this.props.fetchReducer.searchKeyLocations), 300)
    if (e.key === 'Enter' && this.props.fetchReducer.searchKeyLocations !== "" && this.props.fetchReducer.searchKeyLocations.length > 1) {
      //this.props.setSpinner()
      this.props.fetchLocations(apiUrl, this.props.fetchReducer.searchKeyLocations)
    }
  }


  render() {
    let conditionSearchBottomHidden = Object.keys(this.props.fetchReducer.matchedLocations).length < 2 ? true : false
    let searchLocationsResults = null
    if (Object.keys(this.props.fetchReducer.matchedLocations).length !== 0) {
      if (this.props.fetchReducer.matchedLocations.states.length > 0 || this.props.fetchReducer.matchedLocations.cities.length > 0)
        searchLocationsResults = (
          <div className="row search-results-inner">
            {this.props.fetchReducer.matchedLocations.states.length != 0 ? (<div className="col-12 search-result-text-header" style={{ color: 'rgb(62, 126, 179)', fontWeight: 'bold', textDecoration: 'underline' }}>States</div>) : null}
            {this.props.fetchReducer.matchedLocations.states.map((state, index) => (<div className="col-12 search-result-text" value={state.state}
              style={{ color: this.props.fetchReducer.totalFilters.states[state.state] ? 'rgb(62, 126, 179)' : '#808080', }}
              onClick={(event) => {
                this.props.setSpinner()
                this.props.fetchLocations('empty', this.props.fetchReducer.searchKeyLocations)
                this.props.insertChoosenStates(event, "states", index, state.stateFullName, state.state)
                this.props.getCitiesInState(apiUrl, "states", this.props.fetchReducer.totalFilters.states)
                this.props.setSpinner()
                if (Object.keys(this.props.fetchReducer.totalFilters.states).length !== 0)
                  this.props.getTotalData(this.props.fetchReducer.totalFilters, apiUrl)
              }}>{state.stateFullName}</div>))}
            {this.props.fetchReducer.matchedLocations.cities.length != 0 ? (<div className="col-12 search-result-text-header" style={{ color: 'rgb(62, 126, 179)', fontWeight: 'bold', textDecoration: 'underline' }}>Cities</div>) : null}
            {this.props.fetchReducer.matchedLocations.cities.map((data, index) => (<div className="col-12 search-result-text"
              style={{
                color: this.props.fetchReducer.totalFilters.cities[data.city] && this.props.fetchReducer.totalFilters.cities[data.city].state === data.state ? 'rgb(62, 126, 179)' : '#808080',
                fontWeight: this.props.fetchReducer.totalFilters.cities[data.city] && this.props.fetchReducer.totalFilters.cities[data.city].state === data.state ? 'bold' : ''
              }}
              onClick={(event) => {
                this.props.setSpinner()
                this.props.insertChoosenStates(event, "states", index, data.stateFullName,data.state)
                setTimeout(200)
                this.props.insertChoosenCities(event, "cities", data.state, data.city)
                setTimeout(200)
                this.props.getCitiesInState(apiUrl, "states", this.props.fetchReducer.totalFilters.states)
                setTimeout(200)
                this.props.getZipCodesInCities(apiUrl, "cities", this.props.fetchReducer.totalFilters.cities)
                setTimeout(200)
                this.props.fetchLocations('empty', this.props.fetchReducer.searchKeyLocations)
                if (Object.keys(this.props.fetchReducer.totalFilters.cities).length !== 0)
                  this.props.getTotalData(this.props.fetchReducer.totalFilters, apiUrl)
              }}>{data.city}, {data.state}</div>))}
          </div>
        )
      else {
        searchLocationsResults = (
          <div className="row search-results-inner">
            <div className="col-12 search-result-text" style={{ color: 'rgb(237,67,55)', fontWeight: 'bold', textDecoration: 'bold' }}>No matching location!</div>
          </div>
        )
      }
    }

    let category_search = (
      <div className="row">
        <div className="col-12 search-bar"><input type="text" className="search-text" placeholder="Searh Category"
          value={this.props.fetchReducer.searchKeyCategories} onKeyDown={(event) => this.handleKeyEnterCategories(event)} onChange={(event) => this.props.setSearchKeyCategories(event)} /></div>
        <div className="col-12 search-results" hidden style={{ zIndex: 2000 }}></div>
      </div>
    )
    let locations_search = (
      <div className="row" ref="search">
        <div className="col-12 search-bar"><input type="text" className="search-text" placeholder="Searh Locations"
          value={this.props.fetchReducer.searchKeyLocations} onKeyDown={(event) => this.handleKeyEnterLocations(event)}
          onChange={(event) => {
            console.log(event.target.value)

            this.props.setSearchKeyLocations(event)
          }}
          onClick={(event) => this.handleKeyEnterLocations(event)} /></div>
        <div className="col-12 search-results" hidden={conditionSearchBottomHidden} style={{ backgroundColor: 'rgba(255,255,255,0)', zIndex: 2000, width: 'auto' }}>
          {searchLocationsResults}
        </div>
      </div>
    )
    return (
      !this.props.chooseSearchReducer.categoryHidden ? (category_search) : !this.props.chooseSearchReducer.locationHidden?(locations_search):null
      
    );
  }
}

function mapStateToProps(state) {
  return state

}
function mapDispatchToProps(dispatch) {
  return {
    setSearchKeyCategories: bindActionCreators(setSearchKeyCategories, dispatch),
    getMatchedCategories: bindActionCreators(getMatchedCategories, dispatch),
    setSearchKeyLocations: bindActionCreators(setSearchKeyLocations, dispatch),
    fetchLocations: bindActionCreators(fetchLocations, dispatch),
    insertChoosenStates: bindActionCreators(insertChoosenStates, dispatch),
    insertChoosenCities: bindActionCreators(insertChoosenCities, dispatch),
    getZipCodesInCities: bindActionCreators(getZipCodesInCities, dispatch),
    setSpinner: bindActionCreators(setSpinner, dispatch),
    getCitiesInState: bindActionCreators(getCitiesInState, dispatch),
    getTotalData: bindActionCreators(getTotalData, dispatch)
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);