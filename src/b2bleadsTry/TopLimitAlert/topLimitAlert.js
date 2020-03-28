import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import './topLimitAlert.css'
import { alert_top_limit } from '../../actions/fetchActions'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class TopLimitAlert extends Component {
    render() {
        return (
            <Modal.Dialog  className="modal-container-content" isOpen={this.props.alertOrNot}>
                <div style={{display:'flex',width:'300px',height:'200px',flexDirection:'column',borderRadius:'10px',padding:'20px',borderRadius:'20px'}}>
                    <div className="top-limit-alert-rows">
                        <span className="data-count-alert-text" style={{color:"#2B57D9",fontSize:'16px'}}>Data out of range</span>
                    </div>
                    <div  className="top-limit-alert-rows">
                        {this.props.totalCount > 11111?<span className="data-count-alert-text">Please contact us for purchases over 10.000$</span>:null}
                        {this.props.totalCount < 6?<span className="data-count-alert-text">You have to retrieve at least 6 leads to proceed paid data</span>:null}
                    </div>
                    <div  className="top-limit-alert-rows">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => this.props.alert_top_limit()}
                            style={{backgroundColor:'#FCBD17',fontFamily:'Gilmer-Regular',borderWidth:'0px'}}
                        >Close</button>
                    </div>
                </div>
                {/*<Modal.Header className="modal-container-content" closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        console.log("alert top limit", this.props.alertOrNot)
                        this.props.alert_top_limit()
                    }} >Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>*/}
            </Modal.Dialog>
        )
    }
}

function mapStateToProps(state) {
    return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
    return {
        alert_top_limit: bindActionCreators(alert_top_limit, dispatch),

    }

}
export default connect(mapStateToProps, mapDispatchToProps)(TopLimitAlert);
