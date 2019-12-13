import React, { Component } from 'react'
//bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { update_other_filter } from '../../../actions/fetchActions'
import './otherFilters.css'


class OtherFilters extends Component {
    render() {
        return (
            <Container  className="styles-checkbox" style = {{position:'absolute',overflowY:'scrool'}}>
                <Row><h5 style={{color:'green'}}>Phone Filter</h5></Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>phone Number 1</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.hasPhone1}
                        onClick={(event) => {
                            /*this.props.setSpinner()
                            this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>phone Number 2</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.hasPhone2}
                        onClick={(event) => {
                            /*this.props.setSpinner()
                            this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>phone Number 3</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.hasPhone3}
                        onClick={(event) => {
                            /*this.props.setSpinner()
                            this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <hr/>
                <Row><h5 style={{color:'green'}}>Website Filter</h5></Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>Has Website</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.hasWebsite}
                        onClick={(event) => {
                            this.props.update_other_filter(null,'website',0)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <hr/>
                <Row><h5 style={{color:'green'}}>Email Filter</h5></Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>Has Email</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.hasEmail1}
                        onClick={(event) => {
                            this.props.update_other_filter(null,'email',0)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <hr/>
                <Row><h5 style={{color:'green'}}>Hours Filter</h5></Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>Has Given hours info</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.hasHours}
                        onClick={(event) => {
                            this.props.update_other_filter(true,'hours',0)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <hr/>
                <Row><h5 style={{color:'green',fontWeight:'bold'}}>Annual Revenue</h5></Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>Less than 10.000$</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.scaleAnnualRevenue[1]}
                        onClick={(event) => {
                            this.props.update_other_filter(true,'annual_revenue',1)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>10.000$-100.000$</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.scaleAnnualRevenue[2]}
                        onClick={(event) => {
                            this.props.update_other_filter(true,'annual_revenue',2)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>100.000$-1.000.000$</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.scaleAnnualRevenue[3]}
                        onClick={(event) => {
                            this.props.update_other_filter(true,'annual_revenue',3)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>1.000.000$-10.000.000$</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.scaleAnnualRevenue[4]}
                        onClick={(event) => {
                            this.props.update_other_filter(true,'annual_revenue',4)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>10.000.000$-100.000.000$</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.scaleAnnualRevenue[5]}
                        onClick={(event) => {
                            this.props.update_other_filter(true,'annual_revenue',5)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>100.000.000$-1 billion $</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.scaleAnnualRevenue[6]}
                        onClick={(event) => {
                            this.props.update_other_filter(true,'annual_revenue',6)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>1 billion $-10 billion $</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.scaleAnnualRevenue[7]}
                        onClick={(event) => {
                            this.props.update_other_filter(true,'annual_revenue',7)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>10 billion $-100 billion $</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.scaleAnnualRevenue[8]}
                        onClick={(event) => {
                            this.props.update_other_filter(true,'annual_revenue',8)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>More than 100 billion $</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.scaleAnnualRevenue[9]}
                        onClick={(event) => {
                            this.props.update_other_filter(true,'annual_revenue',9)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>                
                <hr/>
                {/* EMPLOYEE COUNT PART*/}
                <Row><h5 style={{color:'green',fontWeight:'bold'}}>Employee Count</h5></Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>Less than 100</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.scaleEmployeeCount[1]}
                        onClick={(event) => {
                            this.props.update_other_filter(null,'employee_count',1)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>100-1000</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.scaleEmployeeCount[2]}
                        onClick={(event) => {
                            this.props.update_other_filter(null,'employee_count',2)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>1000-10.000</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.scaleEmployeeCount[3]}
                        onClick={(event) => {
                            this.props.update_other_filter(null,'employee_count',3)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>10.000-100.000</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.scaleEmployeeCount[4]}
                        onClick={(event) => {
                            this.props.update_other_filter(null,'employee_count',4)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>More than 100.000</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.scaleEmployeeCount[5]}
                        onClick={(event) => {
                            this.props.update_other_filter(null,'employee_count',5)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <hr/>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>Has Contact</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.hasContact}
                        onClick={(event) => {
                            this.props.update_other_filter(null,'contact',null)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <hr/>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>Has Owner</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.hasOwner}
                        onClick={(event) => {
                            this.props.update_other_filter(null,'owner',null)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <hr/>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>Has Fax</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.hasFax}
                        onClick={(event) => {
                            this.props.update_other_filter(null,'fax',null)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <hr/>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>Has Facebook</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.hasFacebook}
                        onClick={(event) => {
                            this.props.update_other_filter(null,'facebook',null)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <hr/>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>Has Twitter</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.hasTwitter}
                        onClick={(event) => {
                            this.props.update_other_filter(null,'twitter',null)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <hr/>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>Is Advertised</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.isAdvertised}
                        onClick={(event) => {
                            this.props.update_other_filter(null,'advertised',null)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <hr/>
                <Row>
                    <Col md="8" style={{ textAlign: 'left' }}><label style={{ color: 'white' }}>Has Reviews</label></Col>
                    <Col md="4" ><div><input type="checkbox"  className="option-input checkbox" checked={this.props.totalFilters.hasReviews}
                        onClick={(event) => {
                            this.props.update_other_filter(null,'reviews',null)
                            /*this.props.insertChoosenZipCodes(event, "zipCodes", index, zipCode.zipCode)*/
                        }} /></div></Col>
                </Row>
                <hr/>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
    return {
        update_other_filter : bindActionCreators(update_other_filter,dispatch)

    }

}
export default connect(mapStateToProps, mapDispatchToProps)(OtherFilters);