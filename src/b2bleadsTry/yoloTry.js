import React, { Component } from 'react'
// Components
import SearchBar from './searchBar/searchBar'
import Categories from './Categories/categories'
import Locations from './Locations/locations'
import ResultsColumns from './ResultsColumn/resultsColumn'
import AnnEmp from './Ann-Emp/ann_emp'
import Spinner from '../components/dumb/Spinner/spinner'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { chooseOtherSearch } from '../actions/chooseSearchActions'
import { getDefaultCategoriesAndStates, fetchLocations } from '../actions/fetchActions'
//const
import { apiUrl } from '../consts/consts'

import './yolo.css'
class YoloTry extends Component {
  constructor() {
    super();

  }

  handleClick() {
    if (!this.props.fetchReducer.matchedLocations) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.props.fetchLocations('empty', this.props.fetchReducer.searchKeyLocations)
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleClick();
  }

  componentDidMount() {
    if (this.props.fetchReducer.defaultCategories.length === 0) {
      this.props.getDefaultCategoriesAndStates(apiUrl + "getLessCategories")
    }
  }

  render() {
    console.log(this.props)
    return (

      <div style={{ width: '100%', height: '100%', marginTop: '100px' }} ref={node => { this.node = node; }} onClick={() => this.handleClick()}>
        <div className="container custom-container" style={{ pointerEvents: this.props.fetchReducer.conditionForSpinner.divPointerEvents, paddingLeft: '50px', paddingRight: '50px', paddingTop: '40px' }}>
          {this.props.fetchReducer.conditionForSpinner.runSpinner ? (<Spinner />) : null}
          <div className="row ">
            <div className="col-8 main-filters-container" style={{padding:'40px',backgroundColor:'#0091ea'}}>
              <div className="row">
                <div className="col-8 search-box-nav-container">
                  <div className="row navbar1-container" style={{paddingTop:'10px'}} >
                    <div className="col-6 category-nav-button" style={{ backgroundColor: this.props.chooseSearchReducer.buttonCategory }}
                      onClick={() => this.props.chooseOtherSearch("category")}>
                      <div>
                        <label className="header-categories"
                          style={{ color: this.props.chooseSearchReducer.textColorCategory }}>Categories</label>
                      </div>
                    </div>
                    <div className="col-6 location-nav-button" style={{ backgroundColor: this.props.chooseSearchReducer.buttonLocation }}
                      onClick={() => this.props.chooseOtherSearch("location")}>
                      <div>
                        <label className="header-location"
                          style={{ color: this.props.chooseSearchReducer.textColorLocation }}>Locations</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 search-box-container" style={{backgroundColor:'#81d4fa'}}><SearchBar /></div>
                  </div>


                </div>
                <div className="col-4 "></div>
              </div>
              <div className="row bottom-part">
                <div className="col-8 categories-locations-container" style={{ overflowY: this.props.chooseSearchReducer.overflowYMain,backgroundColor:'white'}}>
                  {!this.props.chooseSearchReducer.categoryHidden ? (<Categories />) : (<Locations />)}
                </div>
                <div className="col-4 ann-emp-container" ref="ann"  ><AnnEmp /></div>
              </div>
            </div>
            <div className="col-4 results-container"><ResultsColumns /></div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state

}
function mapDispatchToProps(dispatch) {
  return {
    getDefaultCategoriesAndStates: bindActionCreators(getDefaultCategoriesAndStates, dispatch),
    chooseOtherSearch: bindActionCreators(chooseOtherSearch, dispatch),
    fetchLocations: bindActionCreators(fetchLocations, dispatch)
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(YoloTry);