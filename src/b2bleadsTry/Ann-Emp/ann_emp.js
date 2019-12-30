import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, getTotalData, update_other_filter } from '../../actions/fetchActions'
import './ann_emp.css'
import { apiUrl } from '../../consts/consts'
class AnnEmp extends Component {
    constructor(props) {
        super(props);
        this.state = { valueAnn: 2, valueEmp: 1 };
    }
    render() {
        let valueArray = [{ value: 0, text: "None" }, { value: 1, text: "Less than 10.000$" }, { value: 2, text: "10.000$-100.000$" }, { value: 3, text: "100.000$-1.000.000$" },
        { value: 4, text: "1.000.000$-10.000.000$" }, { value: 5, text: "10.000.000$-100.000.000$" },
        { value: 6, text: "100.000.000$-1 billion $" }, { value: 7, text: "1 billion $-10 billion $" }, { value: 8, text: "10 billion $-100 billion $" }, { value: 9, text: "More than 100 billion $" }]
        let employeeArray = [
            {value:0,text:"None"},
            {value:1,text:"Less than 100"},
            {value:2,text:"100-1000"},
            {value:3,text:"1000-10.000"},
            {value:4,text:"10.000-100.000"},
            {value:5,text:"More than 100.000"},
        ]
        return (
            <div style={{marginTop:"100px",width:'80%'}}>
            <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }} >
                <div className="col-12"><h1 className="ann-header">Annual revenue</h1></div>
                <div className="col-12 slidecontainer">
                    <input type="range" min="0" max="9" value={this.state.valueAnn} className="slider" id="myRange"
                        onChange={(event) => this.setState({ valueAnn: (event.target.value) })}
                    />
                </div>
                
            </div>
            <div className="row" style={{marginTop:'10px'}}>
                <div className="col-10" style={{ textAlign: 'left' }}><label className="category-name">{valueArray[this.state.valueAnn].text}</label></div>
                    <div className="col-2" ><div><input type="checkbox" key={valueArray[this.state.valueAnn].text} className="option-input checkbox"
                    checked={this.props.totalFilters.scaleAnnualRevenue[this.state.valueAnn]}
                    onClick={(event) => {
                        this.props.setSpinner()
                        this.props.update_other_filter(true,'annual_revenue',this.state.valueAnn)
                        this.props.getTotalData(this.props.totalFilters,apiUrl)
                }} /></div></div>
            
            </div>
            <hr style={{marginTop:'15px'}}/>
            <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }} >
                <div className="col-12"><h1 className="ann-header">Employee count</h1></div>
                <div className="col-12 slidecontainer">
                    <input type="range" min="0" max="5" value={this.state.value} className="slider" id="myRange"
                        onChange={(event) => this.setState({ valueEmp: (event.target.value) })}
                    />
                </div>
                
            </div>
            <div className="row" style={{marginTop:'10px'}}>
                <div className="col-10 center-block" style={{ textAlign: 'left' }}><label className="category-name">{employeeArray[this.state.valueEmp].text}</label></div>
                    <div className="col-2" ><div><input type="checkbox" key={valueArray[this.state.valueEmp].text} value={this.state.valueEmp} className="option-input checkbox"
                    checked={this.props.totalFilters.scaleEmployeeCount[this.state.valueEmp]}
                    onClick={(event) => {
                        this.props.setSpinner()
                        this.props.update_other_filter(null,'employee_count',this.state.valueEmp)
                        this.props.getTotalData(this.props.totalFilters,apiUrl)
                }} /></div></div>
            
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
        update_other_filter: bindActionCreators(update_other_filter,dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(AnnEmp);