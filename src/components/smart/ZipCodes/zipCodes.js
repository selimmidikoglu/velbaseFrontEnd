import React, { Component } from 'react'
//bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { insertChoosenZipCodes,setSpinner } from '../../../actions/fetchActions'



class ZipCodes extends Component {
    render() {
        let zipCodes = null;
        if (typeof this.props.matchedZipCodes !== 'undefined') {
            return (
                
                this.props.matchedZipCodes.map((zipCode, index) => {
                    return (
                        <Container key={index} className="styles-checkbox">
                            <Row>
                                <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>{zipCode.zipCode}{', '+zipCode.city} </label></Col>
                                <Col md="4" ><div><input type="checkbox" key={index} className="option-input checkbox" checked={this.props.totalFilters.zipCodes[zipCode.zipCode]}
                                    onClick={(event) => {
                                        this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)
                                    }} /></div></Col>
                            </Row>
                        </Container>
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
        setSpinner: bindActionCreators(setSpinner,dispatch)

    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ZipCodes);