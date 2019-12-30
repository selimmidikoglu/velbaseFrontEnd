import React, { Component } from 'react'
//bootstrap
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { insertChoosenZipCodes,setSpinner,getTotalData } from '../../actions/fetchActions'
import './zipCodesFilter.css'

//url
import { apiUrl } from '../../consts/consts'
class ZipCodesFilter extends Component {

    render() {
        let zipCodes = null
        if (Object.keys(this.props.totalFilters.zipCodes).length !== 0) {
            zipCodes =
                <div className="row" style={{ marginTop: '10px', borderRadius: '5px', backgroundColor: '#416268', width: '100%' }}>
                    <div className="col-12" style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}><h2 style={{ color: '#fff', textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}>ZipCodes</h2></div>
                    {Object.keys(this.props.totalFilters.zipCodes).map((zipCode, index) => {
                        return (
                            <div className="col-12" style={{ height: 'auto' }}>
                                <div className="row" style={{ marginTop: '5px' }}>
                                    <div className="col-md-8 city-text-container" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', height: '20px', margin: 0 }}>
                                        <h1 className="city-text-filter" style={{ margin: 0 }}>{zipCode}</h1>
                                    </div>
                                    <div className="col-md-4" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                        <div>
                                            <button className="close-button pull-right" href="/" onClick={(event) => {
                                                this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode)
                                                this.props.setSpinner()
                                                this.props.getTotalData(this.props.totalFilters,apiUrl)
                                            }} ></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
        }
        return (
            <div className="col-4">
                {zipCodes}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
    return {
        insertChoosenZipCodes: bindActionCreators(insertChoosenZipCodes, dispatch),
        getTotalData:bindActionCreators(getTotalData,dispatch),
        setSpinner: bindActionCreators(setSpinner,dispatch)

    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ZipCodesFilter);