import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckBox from '../src/components/dumb/CheckBox/checkBox';
import States from './components/smart/States/states'
import Cities from './components/smart/Cities/cities'
import ZipCodes from './components/smart/ZipCodes/zipCodes'
import OtherFilters from './components/smart/OtherFilters/otherFilters'
import Categories from './components/smart/Categories/categories'
import ResultsColumn from './components/smart/ResultsColumn/resultsColumn'
import Spinner from './components/dumb/Spinner/spinner'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//actions
import { getDefaultCategoriesAndStates, setSearchKeyCategories, getMatchedCategories, changeStateColumn, searchCitiesInList, setCitySearchKey } from './actions/fetchActions'

const apiUrl = "http://139.99.68.189:3000/"
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      states: [],
      defaultStates: [],
      //searchKey: '',
      nextCategories: [],
      matchedStates: [],
      cities: [],
      matchedCities: [],
      searchKeyState: ''
    };

  }
  //get 20 random categories and 62 states

  //setting category searchKey
  

  render() {
    return (
      <div className="App" style={{backgroundColor:'#455A64'}}>
        <Container fluid={true} style={{ position: 'relative', pointerEvents: this.props.conditionForSpinner.divPointerEvents }} >
          {this.props.conditionForSpinner.runSpinner ? (<Spinner />) : null}
          <Row hidden>
            <Col style={{ width: '%100', height: '100px' }}></Col>
          </Row>
          <Row >
            <Col md={2} style={{backgroundColor: '#455A64'}}>
              <Categories/>
            </Col>

            <Col md={2}style={{backgroundColor: '#536878'}}>
              <h1 style={{ color: 'white', padding: '20px', textAlign: 'center', }}>States</h1>
              <div className="wrap">
                <div className="search">
                  <input type="text" className="searchTerm" placeholder="Search" value={this.props.searchKeyState} onKeyDown={(event) => this.props.changeStateColumn(event)} onChange={(event) => this.props.changeStateColumn(event)} />
                  <button type="button" onClick={this.getMatchCategories} className="searchButton">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
              <States />
            </Col>
            <Col md={2}
              style={{
                backgroundColor: '#708090 ',
              }}
            >
              <h1 style={{ color: 'white', padding: '20px' }}>Cities</h1>
              <div className="wrap">
                <div className="search">
                  <input type="text" className="searchTerm" placeholder="Search cities" value={this.props.searchKeyCities}
                    onKeyDown={(event) => {
                      this.props.setCitySearchKey(event)
                      this.props.searchCitiesInList(event, this.props.defaultCities)
                    }}
                    onChange={(event) => {
                      this.props.setCitySearchKey(event)
                      this.props.searchCitiesInList(event, this.props.defaultCities)
                    }} />
                  <button type="button" onClick={this.getMatchCategories} className="searchButton">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
                <h6 style={{ fontSize: '12px', color: 'white', marginTop: '5px' }}>Select state, type key word, click Enter or search button!</h6>
              </div>
              <Cities />
            </Col>
            <Col md={2}
              style={{
                backgroundColor: '#536878 ',
              }}
            >
              <h1 style={{ color: 'white', padding: '20px' }}>ZipCodes</h1>
              <div className="wrap">
                <div className="search">
                  <input type="text" className="searchTerm" placeholder="Search cities" value={this.props.searchKeyCities} onKeyDown={(event) => this.props.changeStateColumn(event)} onChange={(event) => this.props.changeStateColumn(event)} />
                  <button type="button" onClick={this.getMatchCategories} className="searchButton">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
              <ZipCodes />
            </Col>
            <Col md={2}
              style={{
                backgroundColor: '#455A64 ',

              }}
            >
              <h1 style={{ color: 'white', padding: '20px' }}>Other Filters</h1>
              <OtherFilters />
            </Col>
            <Col md={2}
              style={{
                backgroundColor: '#708090 ',

              }}
            >
              <h1 style={{ color: 'white', padding: '20px' }}>Result</h1>
              <ResultsColumn/>
            </Col>


          </Row>
        </Container>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
  return {
    getDefaultCategoriesAndStates: bindActionCreators(getDefaultCategoriesAndStates, dispatch),
    setSearchKeyCategories: bindActionCreators(setSearchKeyCategories, dispatch),
    getMatchedCategories: bindActionCreators(getMatchedCategories, dispatch),
    changeStateColumn: bindActionCreators(changeStateColumn, dispatch),
    searchCitiesInList: bindActionCreators(searchCitiesInList, dispatch),
    setCitySearchKey: bindActionCreators(setCitySearchKey, dispatch),
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(App);
