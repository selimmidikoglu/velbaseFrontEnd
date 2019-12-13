import React,{ Component} from 'react'
import './checkBox.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//actions
import { getCitiesInState, insertChoosenStates } from '../../../actions/fetchActions'

const apiUrl = "http://139.99.68.189:3000/"
class CheckBox extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    
    render(){
        return (
            <Container key = {this.props.name} className="styles-checkbox">
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>{this.props.name} </label></Col>
                    <Col md="4" ><div><input type="checkbox" key = {this.props.key} className="option-input checkbox" checked ={this.props.totalFilters.states[this.props.name]}
                    onClick ={(event) =>{
                        if(this.props.type === 'states'){
                            this.props.insertChoosenStates(event,this.props.type,this.props.id,this.props.name)
                            this.props.getCitiesInState(apiUrl,this.props.type,this.props.totalFilters.states)
                        }
                        console.log(event.target.checked)
                    }} /></div></Col>
                </Row>
            </Container>
    
    
    
        );
    }
}
function mapStateToProps(state) {
    return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
    return {
        getCitiesInState: bindActionCreators(getCitiesInState, dispatch),
        insertChoosenStates: bindActionCreators(insertChoosenStates,dispatch)

    }

}
export default connect(mapStateToProps,mapDispatchToProps)(CheckBox);