import React, { Component } from 'react'
//bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, insertChoosenCategories,getTotalData } from '../../actions/fetchActions'
import './categoriesFilter.css'

import {apiUrl} from '../../consts/consts'
class CategoriesFilter extends Component {
    
    render() {
        let categories = null
        if(Object.keys(this.props.totalFilters.categories).length !== 0){
            categories = 
            <div className="row every-filter-container">
                <div  className="filters-common-header-container"><span className="categories-header-filter-text-1">Categories</span></div>
                {Object.keys(this.props.totalFilters.categories).map((category,index) => {
                    console.log(this.props.totalFilters.categories,this.props.totalFilters.categories[category].category,this.props.totalFilters.categories[category].sic_code)
                    return (
                        
                            <div className="category-filter-con">
                                <div className="filter-info-container" >
                                   <span className="category-text-span">{category}</span>
                                   {this.props.totalFilters.categories[category].sic_code.toString().substring(4,8) == '0000'?(
                                       <span className="category-text-span" style={{fontWeight:'700',color:'rgb(115, 119, 167)'}}> (sic4)</span>
                                   ):(
                                    <span className="category-text-span" style={{fontWeight:'700',color:'#fcbd17'}}> (sic8)</span>
                                   )
                                   }
                                </div>
                                <div className=" category-remove-button-con">
                                    
                                        <button  className="close-button" href="/" onClick={(event) => {
                                        this.props.setSpinner()
                                        this.props.insertChoosenCategories(event, "categories", index, this.props.totalFilters.categories[category].category,this.props.totalFilters.categories[category].sic_code)
                                        this.props.getTotalData(this.props.totalFilters,apiUrl)
                                        }} ></button>
                                    
                                </div>
                            </div>
                        
                    )
                })}
            </div>
        }
        return( 
            <div className="col-12" style={{display:'flex',alignItems:'flex-start',justifyContent:'center'}}>
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
        insertChoosenCategories: bindActionCreators(insertChoosenCategories,dispatch),
        getTotalData: bindActionCreators(getTotalData,dispatch),
        setSpinner: bindActionCreators(setSpinner,dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesFilter);