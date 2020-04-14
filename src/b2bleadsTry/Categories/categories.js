import React, { Component } from 'react';
//bootstrap
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './categories.css'
import { getDefaultCategoriesAndStates, getMatchedCategories, insertChoosenCategories,setSearchKeyCategories, getTotalData, setSpinner} from '../../actions/fetchActions'

import {apiUrl} from '../../consts/consts'

class Categories extends Component {

    capitilizeCategory ( str ){
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            if (splitStr[i] !== "and" && splitStr[i] !== "or" && splitStr[i] !== "of"){

                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            

        }
        // Directly return the joined string
        return splitStr.join(' ');     
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
        let categories = null
        if (typeof this.props.defaultCategories !== 'undefined' && this.props.matchedCategories.length === 0) {
            categories = (
                <div className= "col-12" style={{marginTop:'10px'}}>
                    {this.props.defaultCategories.map((category, index) => {
                        return(
                            <div className="row category-box">
                                <div className="col-10" style={{ textAlign: 'left' }}><label className="category-name">{this.capitilizeCategory(category.category_name)}, {category.sic_code}</label></div>
                                <div className="col-2" ><div><input type="checkbox" key={index} className="option-input checkbox" checked={this.props.totalFilters.categories[category.category_name]}
                                    onClick={(event) => {
                                        this.props.setSpinner()
                                        this.props.insertChoosenCategories(event, "categories", index, category.category_name)
                                        console.log(this.props.totalFilters.categories)
                                        this.props.getTotalData(this.props.totalFilters,apiUrl)
                                    }} /></div></div>
                            </div>
                        );
                    })}
                </div>
            );

        }
        else if (typeof this.props.defaultCategories !== 'undefined' && this.props.searchKeyCategories !== "" && typeof this.props.matchedCategories !== 'undefined') {
            console.log(this.props.matchedCategories)
            categories = (
                <div className="col-12" style={{marginTop:'10px'}}>
                    {this.props.matchedCategories.map((category, index) => {
                        return (
                        <div className="row category-box">
                                <div className="col-10" style={{ textAlign: 'left' }}><label className="category-name">{this.capitilizeCategory(category.category_name)}, {category.sic_code}</label></div>
                                <div className="col-2" ><div><input type="checkbox" key={index} className="option-input checkbox" checked={this.props.totalFilters.categories[category.category_name]}
                                    onClick={(event) => {
                                        this.props.setSpinner()
                                        this.props.insertChoosenCategories(event, "categories", index, category.category_name)
                                        console.log(this.props.totalFilters.categories)
                                        this.props.getTotalData(this.props.totalFilters,apiUrl)
                                    }} /></div></div>
                        </div>);
                    })}
                </div>
            );
        }
        else {
            categories = (
                <div className="col-12" style={{marginTop:'10px'}}>
                    {this.props.defaultCategories.map((category, index) => {
                        return (
                            <div className="row category-box">
                                <div className="col-10" style={{ textAlign: 'left' }}><label className="category-name">{this.capitilizeCategory(category.category_name)}, {category.sic_code}</label></div>
                                <div className="col-2" ><div><input type="checkbox" key={index} className="option-input checkbox" checked={this.props.totalFilters.categories[category.category_name]}
                                    onClick={(event) => {
                                        this.props.setSpinner()
                                        this.props.insertChoosenCategories(event, "categories", index, category.category_name)
                                        console.log(this.props.totalFilters.categories)
                                        this.props.getTotalData(this.props.totalFilters,apiUrl)
                                    }} /></div></div>
                            </div>
                        );
                    })}
                </div>
            );
        }
        return(
            <div>
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