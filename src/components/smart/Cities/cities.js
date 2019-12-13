import React, { Component } from 'react'
//bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getZipCodesInCities, insertChoosenCities,setSpinner, searchCitiesInList } from '../../../actions/fetchActions'

const apiUrl = "http://139.99.68.189:3000/"

class Cities extends Component {
    render() {
        //console.log(this.props.matchedCities)
        let cities = null;
        if (typeof this.props.matchedCities !== 'undefined') {
            return (
                this.props.matchedCities.map((city, index) => {
                    return (
                        <Container key={index} className="styles-checkbox">
                            <Row>
                                <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>{city.city}{ ', '  + city.state} </label></Col>
                                <Col md="4" ><div><input type="checkbox" key={index} className="option-input checkbox" checked={this.props.totalFilters.cities[city.city]}
                                    onClick={(event) => {
                                        this.props.setSpinner()
                                        this.props.insertChoosenCities(event, "cities", index, city.city)
                                        this.props.getZipCodesInCities(apiUrl, "cities", this.props.totalFilters.cities)
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
        getZipCodesInCities: bindActionCreators(getZipCodesInCities, dispatch),
        insertChoosenCities: bindActionCreators(insertChoosenCities, dispatch),
        setSpinner : bindActionCreators(setSpinner,dispatch),
        searchCitiesInList: bindActionCreators(searchCitiesInList,dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Cities);