import React, { Component } from 'react'
//bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCitiesInState, insertChoosenStates,setSpinner } from '../../../actions/fetchActions'

const apiUrl = "http://139.99.68.189:3000/"

class States extends Component {
    

    render() {
        let states = null;
        let check = () => {
            if(Object.keys(this.props.totalFilters.states) === 0)
                return false
            
        }
        console.log(this.props.totalFilters.states)
        if (typeof this.props.matchedStates !== 'undefined') {
            return (
                
                this.props.matchedStates.map((state, index) => {
                    return (
                        <Container key={index} className="styles-checkbox">
                            <Row>
                                <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>{state} </label></Col>
                                <Col md="4" ><div><input type="checkbox" key={index} className="option-input checkbox" defaultChecked={false} 
                                    checked={this.props.totalFilters.states[state]}
                                    onClick={(event) => {
                                        this.props.setSpinner()
                                        this.props.insertChoosenStates(event, "states", index, state)
                                        console.log("lanet gelsin",this.props.totalFilters.states)
                                        this.props.getCitiesInState(apiUrl, "states", this.props.totalFilters.states)
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
        setSpinner: bindActionCreators(setSpinner,dispatch),
        insertChoosenStates: bindActionCreators(insertChoosenStates, dispatch),
        getCitiesInState: bindActionCreators(getCitiesInState, dispatch),

    }

}
export default connect(mapStateToProps, mapDispatchToProps)(States);