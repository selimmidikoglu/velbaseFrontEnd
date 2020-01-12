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
            <div className="row" style={{marginTop:'10px',borderRadius:'5px',backgroundColor:'#81d4fa',width:'100%',padding:'20px'}}>
                <div  className="col-12" style={{marginBottom:'5px',textAlign:'center',alignItems:'center',justifyContent:'center'}}><h2 style={{color:'#fff',textAlign:'center',fontSize:'12px',fontWeight:'bold'}}>Categories</h2></div>
                {Object.keys(this.props.totalFilters.categories).map((category,index) => {
                    return (
                        <div className="col-12" style={{width:'100%',marginTop:'3px'}}> 
                            <div className="row">
                                <div className="col-10" style={{display:'flex',justifyContent:'left',alignItems:'center',height:'20px',margin:0}}>
                                    <div style={{height:'100%',display:'flex',textAlign:'left'}}><h1 style = {{color:'#fff',fontSize:'13px'}}>{category}</h1></div>
                                </div>
                                <div className="col-2" style={{display:'flex',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                                    
                                        <button  className="close-button" href="/" onClick={(event) => {
                                        this.props.setSpinner()
                                        this.props.insertChoosenCategories(event, "categories", index, category)
                                        this.props.getTotalData(this.props.totalFilters,apiUrl)
                                        }} ></button>
                                    
                                </div>
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