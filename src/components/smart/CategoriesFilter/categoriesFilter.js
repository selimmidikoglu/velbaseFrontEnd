import React, { Component } from 'react'
//bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, insertChoosenCategories } from '../../../actions/fetchActions'
import './categoriesFilter.css'


class CategoriesFilter extends Component {
    
    render() {
        let categories = null
        console.log(Object.keys(this.props.totalFilters.categories))
        if(Object.keys(this.props.totalFilters.categories).length !== 0){
            categories = 
            <Container style={{marginTop:'10px',borderRadius:'5px',backgroundColor:'#416268',width:'100%'}}>
                <Row style={{textAlign:'center',alignItems:'center',justifyContent:'center'}}><h2 style={{color:'#fff',textAlign:'center',fontSize:'12px',fontWeight:'bold'}}>Categories</h2></Row>
                {Object.keys(this.props.totalFilters.categories).map((category,index) => {
                    return (
                        <Row style={{height:'auto'}}> 
                            <Col sm={10} style={{display:'flex',justifyContent:'left',alignItems:'center'}}>
                                <div style={{height:'100%',width:'auto',display:'block',display:'flex',textAlign:'left'}}><label style = {{fontWeight:'bold',color:'#000',fontSize:'10px',}}>{category}</label></div>
                            </Col>
                            <Col sm={2} style={{display:'flex',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                                <div>
                                    <button  className="close-button" href="/" onClick={(event) => {
                                        this.props.insertChoosenCategories(event, "categories", index, category)
                                    }} ></button>
                                </div>
                            </Col>
                        </Row>
                    )
                })}
            </Container>
        }
        return( 
            <Container>
                {categories}
            </Container>
        )
    }
}
function mapStateToProps(state) {
    return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
    return {
        insertChoosenCategories: bindActionCreators(insertChoosenCategories,dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesFilter);