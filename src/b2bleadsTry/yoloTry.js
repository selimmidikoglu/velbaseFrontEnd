import React, { Component } from 'react'
// Components
import SearchBar from './searchBar/searchBar'
import Categories from './Categories/categories'
import Locations from './Locations/locations'
import ResultsColumns from './ResultsColumn/resultsColumn'
import AnnEmp from './Ann-Emp/ann_emp'
import OtherFilters from './OtherFilters/otherFilters'
import AnnEmpRange from './Ann-Emp-Range/annEmpRange'
import IconComponent from './DumbComponents/IconComponent/iconComponent'
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
    
    return (

      <div style={{ width: '100%', height: '100%'}} ref={node => { this.node = node; }} onClick={() => this.handleClick()}>
        <div className="navigation-top-container" >
          <div className="logo-container">
            <IconComponent/>
          </div>
          <div className="navigation-buttons-container">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#contact">Questions</a></li>
            <li><a class="active" href="#home">Home</a></li>
            

          </ul>
          </div>
        </div>
        <div className="container custom-container" style={{ pointerEvents: this.props.fetchReducer.conditionForSpinner.divPointerEvents, paddingLeft: '50px', paddingRight: '50px', paddingTop: '40px' }}>
          {this.props.fetchReducer.conditionForSpinner.runSpinner ? (<Spinner />) : null}
          <div className="row ">
            <div className="col-md-8 col-sm-12 main-filters-container">
              <div className="row">
                <div className="col-12 search-box-nav-container">
                  <div className="row navbar1-container" style={{paddingTop:'10px'}} >
                    <div className="col-4 category-nav-button" style={{ backgroundColor: this.props.chooseSearchReducer.buttonCategory }}
                      onClick={() => this.props.chooseOtherSearch("category")}>
                      <div>
                        <label className="header-categories"
                          style={{ color: this.props.chooseSearchReducer.textColorCategory }}>Categories</label>
                      </div>
                    </div>
                    <div className="col-4 location-nav-button" style={{ backgroundColor: this.props.chooseSearchReducer.buttonLocation }}
                      onClick={() => this.props.chooseOtherSearch("location")}>
                      <div>
                        <label className="header-location"
                          style={{ color: this.props.chooseSearchReducer.textColorLocation }}>Locations</label>
                      </div>
                    </div>
                    <div className="col-4 location-nav-button" style={{ backgroundColor: this.props.chooseSearchReducer.buttonOtherFilters }}
                      onClick={() => this.props.chooseOtherSearch("otherFilters")}>
                      <div>
                        <label className="header-location"
                          style={{ color: this.props.chooseSearchReducer.textColorOtherFilters }}>OtherFilters</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 search-box-container" style={{backgroundColor:'#FCBD17',height:this.props.chooseSearchReducer.otherFiltersHidden === false?'0px': 'auto'}}><SearchBar /></div>
                  </div>


                </div>
                <div className="col-4 "></div>
              </div>
              <div className="row bottom-part">
                <div className="col-12 categories-locations-container" style={{ overflowY: this.props.chooseSearchReducer.overflowYMain,backgroundColor:'white'}}>
                  {!this.props.chooseSearchReducer.categoryHidden ? (<Categories />) : (!this.props.chooseSearchReducer.locationHidden?(<Locations/>):(<OtherFilters/>))}
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 results-container"><ResultsColumns /></div>
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