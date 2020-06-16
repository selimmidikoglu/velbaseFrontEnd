import React, { Component } from 'react';
//bootstrap
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './categories.css'
import { getDefaultCategoriesAndStates, getMatchedCategories, insertChoosenCategories, setSearchKeyCategories, getTotalData, setSpinner } from '../../actions/fetchActions'

import { apiUrl } from '../../consts/consts'

class SubCategories extends Component {

    capitilizeCategory(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            if (splitStr[i] !== "and" && splitStr[i] !== "or" && splitStr[i] !== "of") {

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
        let subCategories = null
        if (this.props.matchedSubCategories.length !== 0) {

            subCategories = (
                <div className="col-12" style={{ marginTop: '10px' }}>
                    <div className="category-name-box-container">
                        <div className="row" >
                            <span className="category-name" style={{ fontWeight: '800', color: 'rgb(115, 119, 167)' }}>Sub Categories [sic8]</span>
                        </div>
                    </div>
                    {this.props.matchedSubCategories.map((category, index) => {
                        return (
                            <div key={index} className="row category-box">
                                <div className="checkbox-categories-container"  ></div>
                                <div className="category-name-box-container">

                                    <span className="category-name">
                                        <input type="checkbox" key={index} className="option-input " style={{ position: 'block', marginBottom: '-2px' }} checked={typeof this.props.totalFilters.categories[category.category_name] !== 'undefined'}
                                            onClick={(event) => {
                                                this.props.setSpinner()
                                                this.props.insertChoosenCategories(event, "categories", index, category.category_name, category.sic_code)
                                                console.log(this.props.totalFilters.categories)
                                                this.props.getTotalData(this.props.totalFilters, apiUrl)
                                            }} />
                                        <span className="category-name-inner-span" style={{ marginLeft: '10px' }}>{this.capitilizeCategory(category.category_name)} [{category.sic_code}]</span>
                                    </span>
                                </div>

                            </div>
                        );
                    })}
                </div>
            );

        }
        else {
            subCategories = (
                <div className="col-12" style={{ marginTop: '10px' }}>
                    <div className="category-name-box-container">
                        <div className="row" >
                            <span className="category-name" style={{ fontWeight: '800', color: 'rgb(115, 119, 167)' }}>Sub Categories [sic8]</span>
                        </div>
                        <div className="row" >
                            <span className="category-name" style={{ color: 'red' }}>Select main category</span></div>
                    </div>

                </div>
            )
        }
        return (
            <div>
                {subCategories}
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
        insertChoosenCategories: bindActionCreators(insertChoosenCategories, dispatch),
        getTotalData: bindActionCreators(getTotalData, dispatch),
        setSpinner: bindActionCreators(setSpinner, dispatch),

    }

}
export default connect(mapStateToProps, mapDispatchToProps)(SubCategories);