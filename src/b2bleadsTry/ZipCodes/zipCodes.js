import React, { Component } from 'react'
//bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { insertChoosenZipCodes,setSpinner,getTotalData } from '../../actions/fetchActions'

import {apiUrl} from '../../consts/consts'

import './zipCodes.css'
class ZipCodes extends Component {
    render() {
        let zipCodes = null;
        if (typeof this.props.matchedZipCodes !== 'undefined') {
            return (
                this.props.matchedZipCodes.map((zipCode, index) => {
                    return (
                        <div key={index} className="row styles-checkbox">
                                <div className="col-md-8" style={{ textAlign: 'left' }}><label className="zipCode-text">{zipCode.zipCode}{', '+zipCode.city} </label></div>
                                <div className="cpl-md-4" ><div><input type="checkbox" key={index} className="option-input checkbox" checked={this.props.totalFilters.zipCodes[zipCode.zipCode]}
                                    onClick={(event) => {
                                        this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode,zipCode.city)
                                        this.props.setSpinner()
                                        this.props.getTotalData(this.props.totalFilters,apiUrl)
                                    }} /></div></div>
                        </div>
                    )

                })
            )
        }
    }
}

function mapStateToProps(state) {
    return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
    return {
        insertChoosenZipCodes: bindActionCreators(insertChoosenZipCodes, dispatch),
        setSpinner: bindActionCreators(setSpinner,dispatch),
        getTotalData: bindActionCreators(getTotalData,dispatch)

    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ZipCodes);