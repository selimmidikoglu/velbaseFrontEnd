import React, { Component } from 'react';
//bootstrap
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './categories.css'
import { getDefaultCategoriesAndStates, getMatchedCategories,insertParentCategories, getMatchedSubCategories, insertChoosenCategories, setSearchKeyCategories, getTotalData, setSpinner } from '../../actions/fetchActions'

import { apiUrl } from '../../consts/consts'

class Categories extends Component {
    state = {
        whichCategory : 0
    }
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
        console.log(this.props.matchedCategories)
        let categories = null
        if ((typeof this.props.parentCategories !== 'undefined' && this.props.matchedCategories.length === 0) || this.props.searchKeyCategories == '' /*Object.keys(this.props.parentCategories).length > 0*/ ) {
            categories = (
                <div className="col-12" style={{ marginTop: '10px', }}>
                    <div className="row" >
                        <span className="category-name" style={{fontWeight:'800', color:'rgb(115, 119, 167)'}}>Main Categories</span>
                    </div>
                    
                    {this.props.defaultCategories.map((category, index) => {
                        return (
                            <div key = {index} className="row category-box" /*style={{ backgroundColor: (this.props.parentCategories[category.category_name]) ? 'rgb(115, 119, 167)' : '' }}*/>
                                    
                                {/* <div className="checkbox-categories-container"  >
                                    </div>  */}
                                <div className="category-name-box-container" >
                               
                                    <span className="category-name"
                                        //style={{ color: (this.props.parentCategories[category.category_name]) ? 'white' : '' }}
                                    >
                                         <input type="checkbox" key={index} className="option-input" style={{position:'block', marginBottom:'-2px'}} checked={this.props.parentCategories[category.category_name]}
                                    onClick={(event) => {
                                        
                                        if(this.props.parentCategories[category.category_name] && !this.props.totalFilters.categories[category.category_name])
                                        {
                                            this.props.insertParentCategories(event, "categories", index, category.category_name,category.sic_code)
                                            this.props.getMatchedSubCategories(apiUrl + 'getMatchedSubCategories', this.props.parentCategories)
                                        }
                                        else{
                                            this.props.setSpinner()
                                            this.props.insertChoosenCategories(event, "categories", index, category.category_name, category.sic_code)
                                            this.props.insertParentCategories(event, "categories", index, category.category_name,category.sic_code)
                                            this.props.getMatchedSubCategories(apiUrl + 'getMatchedSubCategories', this.props.parentCategories)
                                            this.props.getTotalData(this.props.totalFilters, apiUrl)
                                        }
                                        
                                    }} /><span className="category-name-inner-span" style={{marginLeft:'10px'}}>{this.capitilizeCategory(category.category_name)}, {category.sic_code}</span></span></div>

                            </div>
                        );
                    })}
                </div>
            );

        }
        else if (typeof this.props.defaultCategories !== 'undefined' && this.props.searchKeyCategories !== "" && typeof this.props.matchedCategories !== 'undefined') {
            console.log("ikiye girdi")
            categories = (
                <div className="col-12" style={{ marginTop: '10px',width: '100%' }}>
                    {this.props.matchedCategories[0].sic_code.toString().substring(4,8) == '0000'?(
                        <div className="row category-box" style={{backgroundColor:'rgb(115, 119, 167)', borderRadius: '10px', padding: '10px',marginRight: '10px'}}>
                        <i class="fa fa-exclamation-circle" aria-hidden="true" style={{marginRight: '5px',color: '#fcbd17'}}> </i>
                        <span className="category-name" style={{fontWeight:800, color: '#fcbd17'}}>You can open sub categories of below categories </span><br/>
                        <span className="category-name" style={{fontWeight:800, color: '#fcbd17'}}>which end with ...0000 Sic code or you can filter data</span>
                        <span className="category-name" style={{fontWeight:800, color: '#fcbd17'}}> with sub categories below</span>
                        </div>
                    ):null}

                    {this.props.matchedCategories.map((category, index) => {
                        return (
                            <div className="row category-box" style={{width: '100%'}}>
                                
                               
                                    
                                <div className=" category-name-box-container">
                                
                                    <span className="category-name">
                                    {category.sic_code.toString().substring(4,8) == '0000'?(
                                    <h1 style={{height:'6px',width:'6px',borderRadius:'3px',backgroundColor:'rgb(115, 119, 167)',alignSelf:'center',display:'inline-block',marginRight:'3px'}}></h1>)
                                    :
                                    (<h1 style={{height:'6px',width:'6px',borderRadius:'3px',backgroundColor:'#fcbd17',alignSelf:'center',display:'inline-block',marginRight:'3px'}}></h1>)}
                                    <input type="checkbox" key={index} className="option-input" style={{position:'block', marginBottom:'-2px'}} checked={this.props.totalFilters.categories[category.category_name] || this.props.parentCategories[category.category_name]}
                                    onClick={(event) => {
                                        
                                        if(category.sic_code.toString().substring(4,8) == '0000'){
                                            if(this.props.parentCategories[category.category_name] && !this.props.totalFilters.categories[category.category_name])
                                            {
                                                this.props.insertParentCategories(event, "categories", index, category.category_name,category.sic_code)
                                                this.props.getMatchedSubCategories(apiUrl + 'getMatchedSubCategories', this.props.parentCategories)
                                            }
                                            else{
                                                this.props.setSpinner()
                                                this.props.insertChoosenCategories(event, "categories", index, category.category_name, category.sic_code)
                                                this.props.insertParentCategories(event, "categories", index, category.category_name,category.sic_code)
                                                this.props.getMatchedSubCategories(apiUrl + 'getMatchedSubCategories', this.props.parentCategories)
                                                this.props.getTotalData(this.props.totalFilters, apiUrl)
                                            }
                                        }
                                        else{
                                            this.props.setSpinner()
                                            this.props.insertChoosenCategories(event, "categories", index, category.category_name, category.sic_code)
                                            this.props.getTotalData(this.props.totalFilters, apiUrl)
                                        }
                                            
                                        
                                    }} />
                                    
                                    <span className="category-name-inner-span" style={{marginLeft:'10px'}}>{this.capitilizeCategory(category.category_name)}, {category.sic_code}</span></span>
                        
                                </div>

                            </div>);
                    })}
                </div>
            );
        }
        else {
            console.log("uce geldi")
            categories = (
                <div className="col-12" style={{ marginTop: '10px' }}>
                    <div className="row" >
                        <span className="category-name" style={{fontWeight:'800', color:'rgb(115, 119, 167)'}}>Main Categories</span>
                    </div>
                   
                    {this.props.defaultCategories.map((category, index) => {
                        return (
                            <div key = {index} className="row category-box" /*style={{ backgroundColor: (this.props.parentCategories[category.category_name]) ? 'rgb(115, 119, 167)' : '' }}*/>
                                    
                                {/* <div className="checkbox-categories-container"  >
                                    </div>  */}
                                <div className="category-name-box-container" >
                               
                                    <span className="category-name"
                                        //style={{ color: (this.props.parentCategories[category.category_name]) ? 'white' : '' }}
                                    >
                                         <input type="checkbox" key={index} className="option-input" style={{position:'block', marginBottom:'-2px'}} checked={this.props.parentCategories[category.category_name]}
                                    onClick={(event) => {
                                        
                                        if(this.props.parentCategories[category.category_name] && !this.props.totalFilters.categories[category.category_name])
                                        {
                                            this.props.insertParentCategories(event, "categories", index, category.category_name,category.sic_code)
                                            this.props.getMatchedSubCategories(apiUrl + 'getMatchedSubCategories', this.props.parentCategories)
                                        }
                                        else{
                                            this.props.setSpinner()
                                            this.props.insertChoosenCategories(event, "categories", index, category.category_name, category.sic_code)
                                            this.props.insertParentCategories(event, "categories", index, category.category_name,category.sic_code)
                                            this.props.getMatchedSubCategories(apiUrl + 'getMatchedSubCategories', this.props.parentCategories)
                                            this.props.getTotalData(this.props.totalFilters, apiUrl)
                                        }
                                        
                                    }} /><span className="category-name-inner-span" style={{marginLeft:'10px'}}>{this.capitilizeCategory(category.category_name)}, {category.sic_code}</span></span></div>

                            </div>
                        );
                    })}
                </div>
            );
        }
        return (
            <div style={{marginLeft : '0px',borderRightColor:'gray',borderRightWidth: '3px', borderRightStyle:'solid'}}>
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
        insertChoosenCategories: bindActionCreators(insertChoosenCategories, dispatch),
        getTotalData: bindActionCreators(getTotalData, dispatch),
        setSpinner: bindActionCreators(setSpinner, dispatch),
        getMatchedSubCategories: bindActionCreators(getMatchedSubCategories, dispatch),
        insertParentCategories: bindActionCreators(insertParentCategories, dispatch)

    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Categories);