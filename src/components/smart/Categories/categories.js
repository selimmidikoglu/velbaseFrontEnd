import React, { Component } from 'react';
//bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './categories.css'
import { getDefaultCategoriesAndStates, getMatchedCategories, insertChoosenCategories,setSearchKeyCategories, getTotalData, setSpinner} from '../../../actions/fetchActions'

const apiUrl = "http://139.99.68.189:3000/"

class Categories extends Component {

    componentDidMount() {
        this.props.getDefaultCategoriesAndStates(apiUrl + "getLessCategories")
    }
    setSearchKey = (event) => {
        this.setState({ searchKey: event.target.value })
    }
    //retrieve categories matched
    getMatchCategories = (event) => {
      if (this.props.searchKeyCategories !== "" && this.props.searchKeyCategories.length > 2) {
        this.props.getMatchedCategories(apiUrl + "getMatchCategories", this.props.searchKeyCategories)
      }
    }
    handleKeyEnterCategories = (e) => {
      if (e.key === 'Enter' && this.props.searchKeyCategories !== "" && this.props.searchKeyCategories.length > 2) {
        this.props.setSpinner()
        this.props.getMatchedCategories(apiUrl + "getMatchCategories", this.props.searchKeyCategories)
      }
    }
    
    render() {
        console.log(this.props.matchedCategories)
        let categories = null
        if (typeof this.props.defaultCategories !== 'undefined' && this.props.matchedCategories.length === 0) {
            categories = (
                <div>
                    {this.props.defaultCategories.map((category, index) => {
                        return(<Container key={index} className="styles-checkbox">
                            <Row>
                                <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>{category.category_name}</label></Col>
                                <Col md="4" ><div><input type="checkbox" key={index} className="option-input checkbox" checked={this.props.totalFilters.categories[category.category_name]}
                                    onClick={(event) => {
                                        this.props.setSpinner()
                                        this.props.insertChoosenCategories(event, "categories", index, category.category_name)
                                        console.log(this.props.totalFilters.categories)
                                        this.props.getTotalData(this.props.totalFilters,apiUrl)
                                    }} /></div></Col>
                            </Row>
                        </Container>);
                    })}
                </div>
            );

        }
        else if (typeof this.props.defaultCategories !== 'undefined' && this.props.searchKeyCategories !== "" && typeof this.props.matchedCategories !== 'undefined') {
            console.log(this.props.matchedCategories)
            categories = (
                <div>
                    {this.props.matchedCategories.map((category, index) => {
                        return (<Container key={index} className="styles-checkbox">
                            <Row>
                                <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>{category.category_name}</label></Col>
                                <Col md="4" ><div><input type="checkbox" key={index} className="option-input checkbox" checked={this.props.totalFilters.categories[category.category_name]}
                                    onClick={(event) => {
                                        this.props.setSpinner()
                                        this.props.insertChoosenCategories(event, "categories", index, category.category_name)
                                        console.log(this.props.totalFilters.categories)
                                        this.props.getTotalData(this.props.totalFilters,apiUrl)
                                    }} /></div></Col>
                            </Row>
                        </Container>);
                    })}
                </div>
            );
        }
        else {
            categories = (
                <div>
                    {this.props.defaultCategories.map((category, index) => {
                        return (<Container key={index} className="styles-checkbox">
                            <Row>
                                <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>{category.category_name}</label></Col>
                                <Col md="4" ><div><input type="checkbox" key={index} className="option-input checkbox" checked={this.props.totalFilters.categories[category.category_name]}
                                    onClick={(event) => {
                                        this.props.setSpinner()
                                        this.props.insertChoosenCategories(event, "categories", index, category.category_name)
                                        console.log(this.props.totalFilters.categories)
                                        this.props.getTotalData(this.props.totalFilters,apiUrl)
                                    }} /></div></Col>
                            </Row>
                        </Container>);
                    })}
                </div>
            );
        }
        return(
            <div>
                <h1 style={{ color: 'white', padding: '20px' }}>Categories</h1>
                <div className="wrap">
                    <div className="search">
                    <input type="text" className="searchTerm" placeholder="Search categories" value={this.props.searchKeyCategories} onKeyDown={(event) => this.handleKeyEnterCategories(event)} onChange={(event) => this.props.setSearchKeyCategories(event)} />
                    <button type="button" onClick={this.getMatchCategories} className="searchButton">
                        <i className="fa fa-search"></i>
                    </button>
                    </div>
                    <h6 style={{ fontSize: '12px', color: 'white', marginTop: '5px' }}>Type key word, click Enter or search button!</h6>
                </div>
                {categories}
            </div>
        )
        
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
    insertChoosenCategories: bindActionCreators(insertChoosenCategories,dispatch),
    getTotalData: bindActionCreators(getTotalData,dispatch),
    setSpinner: bindActionCreators(setSpinner,dispatch),
    
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Categories);