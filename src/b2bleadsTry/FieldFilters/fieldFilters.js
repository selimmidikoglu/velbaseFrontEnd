import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, getTotalData, update_other_filter } from '../../actions/fetchActions'

import { apiUrl } from '../../consts/consts'
import './fieldFilters.css'

function setFilter(propsHolder,apiUrl){
    console.log(propsHolder.getTotalData(propsHolder.totalFilters,apiUrl))
}
function sendData(propsHolder,apiUrl,type){
    propsHolder.update_other_filter(true,type,null)
}
async function setFilterThanSendData(propsHolder,apiUrl,type){
    await propsHolder.update_other_filter(true,"website",null)
    propsHolder.getTotalData(propsHolder.totalFilters, apiUrl)
}

class FieldFilters extends Component {



    render() {
        //console.log(this.props)

        return (
            <div className="row" style={{ width: '100%', height: 'auto', backgroundColor: 'white', padding: '10px', borderRadius: '10px', backgroundColor: 'whitesmoke', borderColor: 'whitesmoke', borderStyle: 'solid', borderWidth: '2px', marginTop: '10px' }}>
                <div className="col-12" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',textAlign:'center',verticalAlign:'center' }}>
                    <h1 className="ann-revenue-header-text">Field Filters</h1>
                </div>
                <div class="col-12" style={{ width: '80px' }}>
                    <div className="row">
                        <div className="col-md-10 col-sm-8" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start'}}><h1 className="annual-revenue-data-text">Has Phone</h1></div>
                        <div className="col-md-2 col-sm-4" style={{display:'flex',alignItems:'center',justifyContent:'flex-start', textAlign:'center'}}><div><input type="checkbox" key={'hasPhone'} className="option-input checkbox" checked = {this.props.totalFilters.hasPhone1}
                        onClick = {() => {
                            this.props.setSpinner()
                            this.props.update_other_filter(true,'phone',null)
                            setTimeout(() => this.props.getTotalData(this.props.totalFilters,apiUrl),200)
        
                        }}/></div></div>
                        <div className="col-md-10 col-sm-8" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start',textAlign:'center',verticalAlign:'center' }}><h1 className="annual-revenue-data-text">Has Email</h1></div>
                        <div className="col-md-2 col-sm-4" style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}><div><input type="checkbox" key={'hasPhone'} className="option-input checkbox" checked = {this.props.totalFilters.hasEmail1}
                        onClick = {() => {
                            this.props.setSpinner()
                            this.props.update_other_filter(true,'email',null)
                            setTimeout(() => this.props.getTotalData(this.props.totalFilters,apiUrl),200)

                        }}/></div></div>
                        <div className="col-md-10 col-sm-8" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start',textAlign:'center',verticalAlign:'center' }}><h1 className="annual-revenue-data-text">Has Website</h1></div>
                        <div className="col-md-2 col-sm-4" style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}><div><input type="checkbox" key={'hasPhone'} className="option-input checkbox" checked = {this.props.totalFilters.hasWebsite}
                          onClick = {()=>{
                              this.props.setSpinner();
                              this.props.update_other_filter(true,'website',null)
                              setTimeout(() => this.props.getTotalData(this.props.totalFilters,apiUrl),200)
                          }}/></div></div>
                    </div>

                </div>


            </div>

        );
    }
}

function mapStateToProps(state) {
    return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
    return {
        setSpinner: bindActionCreators(setSpinner, dispatch),
        getTotalData: bindActionCreators(getTotalData, dispatch),
        update_other_filter: bindActionCreators(update_other_filter, dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(FieldFilters);
