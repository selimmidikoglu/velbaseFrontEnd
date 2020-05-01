import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, getTotalData, update_other_filter, add_no_employee_count} from '../../actions/fetchActions'

import { apiUrl } from '../../consts/consts'
import './empRange.css'



let employeeArray = [
    "0",
    "100",
    "1000",
    "10.000",
    "100.000",
    "More than 100.000",
]

let valueArray = {
    "0":0,
    "Less than 100":1,
    "100-1000":2,
    "1000-10.000":3,
    "10.000-100.000":4,
    "More than 100.000":5
}

class EmpRange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueFirst: 0,
            valueLast: 1,
            recentValues: [
                "0",
                "100"
                
            ],
            checked : false,
            checkedAll : true,

        }
    }
    setAndSend(){
        
    }
    changeEmployeeCountRange(e, type) {

        let tempAnnRevenueList = [0, 1, 2, 3, 4, 5]
        if (type === "first" && e.target.value < this.state.valueLast) {
            this.setState(
                { valueFirst: e.target.value },
                () => {
                    console.log(this.state.valueLast)
                    let x = []
                    for (let i = 0; i < tempAnnRevenueList.length; i++) {
                        if (tempAnnRevenueList[i] >= this.state.valueFirst && tempAnnRevenueList[i] <= this.state.valueLast) {
                            x.push(employeeArray[i])
                        }
                        
                    }
                    console.log(x)
                    this.setState({ recentValues: x})
                })
                    
                

        }
        else if (type === "last" && e.target.value > this.state.valueFirst) {
            this.setState({ valueLast: e.target.value },
                () => {
                    console.log(this.state.valueLast)
                    let x = []
                    for (let i = 0; i < tempAnnRevenueList.length; i++) {
                        if (tempAnnRevenueList[i] >= this.state.valueFirst && tempAnnRevenueList[i] <= this.state.valueLast) {
                            x.push(employeeArray[i])
                        }
                        
                    }
                    console.log(x)
                    this.setState({ recentValues: x})
                })
        }
    }
    render() {
        //console.log(this.props)
        
        return (
            <div className="row" style={{ width: '100%', height: 'auto', backgroundColor: 'white', padding: '10px',borderRadius:'10px',backgroundColor:'whitesmoke',borderColor:'whitesmoke',borderStyle: 'solid',borderWidth: '2px',marginTop:'10px'}}>
                <div className="col-12" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <h1 className="ann-revenue-header-text">Employee Count</h1>
                </div>
                <div class="col-12 multi-range" style={{ width: 'inherit',backgroundColor: this.props.totalFilters.scaleEmployeeCount.last == 0?'white':'whitesmoke'}}>

                    <input type="range" min="0" max="5" value={this.state.valueFirst} step="1" id="upper" disabled= {this.props.totalFilters.scaleEmployeeCount.last !== 0 }
                        onChange={(e) => this.changeEmployeeCountRange(e, "first")} />
                    <input type="range" min="0" max="5" value={this.state.valueLast} step="1" id="lower" disabled= {this.props.totalFilters.scaleEmployeeCount.last !== 0 }
                        onChange={(e) => this.changeEmployeeCountRange(e, "last")} />
                </div>
                <div className="col-12 lock-icon" style = {{backgroundColor: this.props.totalFilters.scaleEmployeeCount.last == 0?'white':'whitesmoke'}}  >
                    <div className="row">
                        <div className="col-10"></div>
                        <div className="col-2">
                            {this.props.totalFilters.scaleEmployeeCount.last == 0?(<i className="fa fa-unlock"></i>):(<i className="fa fa-lock"></i>)}</div>
                    </div>
                </div>
                <div className="col-12 ann-revenue-list">
                  
                        <div className="row">
                            <div  className="col-md-10 col-sm-8">
                                <h1 className="annual-revenue-data-text">{this.state.recentValues[0]}  -  {this.state.recentValues.length >1?this.state.recentValues[this.state.recentValues.length-1]:null}</h1>
                            </div>
                            <div className="col-md-2 col-sm-4">
                            <div><input type="checkbox"  className="option-input checkbox" checked = {this.props.totalFilters.scaleEmployeeCount.last !== 0 }
                            
                                
                                onClick={(event) => {
                                
                                    this.props.setSpinner()
                                    
                                    if(this.props.totalFilters.scaleEmployeeCount.last === 0){
                                        this.setState({checked: true, checkedAll:false})
                                        this.props.update_other_filter(true,'employee_count',{first:parseInt(this.state.valueFirst),last:parseInt(this.state.valueLast)})
                                        
                                    }
                                    else{
                                        this.setState({checked: false, checkedAll:true})
                                        this.props.update_other_filter(true,'employee_count',{first:0,last:0})
                                        this.props.add_no_employee_count()
                                    }
                                    this.props.getTotalData(this.props.totalFilters,apiUrl)
                            }} /></div>
                            </div>
                        </div>
                        <div className="row" hidden = {this.props.totalFilters.scaleEmployeeCount.last == 0}>
                            <div className="col-md-10 col-sm-8">
                                <h1 className="annual-revenue-data-text">Include businesses with no employee count</h1>
                            </div>
                            <div className="col-md-2 col-sm-4">
                                <div><input type="checkbox" className="option-input checkbox" checked={this.props.totalFilters.noEmployeeCount}


                                    onClick={(event) => {

                                        this.props.setSpinner()
                                        this.props.add_no_employee_count()
                                        //setTimeout(() => this.props.getTotalData(this.props.totalFilters,apiUrl),200)
                                        this.props.getTotalData(this.props.totalFilters,apiUrl)

                                    }} /></div>
                            </div>
                        </div>
                        <div className="row">
                            <div  className="col-md-10 col-sm-8">
                                <h1 className="annual-revenue-data-text">Employee Count Exists Or Not (Default)</h1>
                            </div>
                            <div className="col-md-2 col-sm-4">
                            <div><input type="checkbox"  className="option-input checkbox" checked = {this.props.totalFilters.scaleEmployeeCount.last === 0}
                            
                                
                                onClick={(event) => {
                                
                                    this.props.setSpinner()
                                    
                                    if(this.props.totalFilters.scaleEmployeeCount === 0){
                                        this.setState({checkedAll: true})                                        
                                    }
                                    else{
                                        this.setState({checkedAll: false})
                                        this.props.update_other_filter(true,'employee_count',{first:0,last:0})
                                    }
                                    this.props.getTotalData(this.props.totalFilters,apiUrl)
                            }} /></div>
                            </div>
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
        update_other_filter: bindActionCreators(update_other_filter,dispatch),
        add_no_employee_count: bindActionCreators(add_no_employee_count,dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(EmpRange);
