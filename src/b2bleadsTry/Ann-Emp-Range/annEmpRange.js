import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSpinner, getTotalData, update_other_filter, add_no_annual_revenue } from '../../actions/fetchActions'

import { apiUrl } from '../../consts/consts'
import './annEmpRange.css'


let valueArray = [
    "0",
    "10.000$",
    "100.000$",
    "1.000.000$",
    "10.000.000$",
    "100.000.000$",
    "1 billion $",
    "10 billion $",
    "100 billion $",
    "More than 100 billion $"
]
let annualRevenueObject = {
    "0": 0,
    "10.000$": 1,
    "100.000$": 2,
    "1.000.000$": 3,
    "10.000.000$": 4,
    "100.000.000$": 5,
    "1 billion $": 6,
    "10 billion $": 7,
    "100 billion $": 8,
    "More than 100 billion $": 9
}

class AnnEmpRange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueFirst: 0,
            valueLast: 1,
            recentValues: [
                "0",
                "10.000$"

            ],
            checked: false,
            checkedAll: true,

        }
    }

    changeAnnRevenueList(e, type) {

        let tempAnnRevenueList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        if (type === "first" && e.target.value < this.state.valueLast) {
            this.setState(
                { valueFirst: e.target.value },
                () => {
                    console.log(this.state.valueLast)
                    let x = []
                    for (let i = 0; i < tempAnnRevenueList.length; i++) {
                        if (tempAnnRevenueList[i] >= this.state.valueFirst && tempAnnRevenueList[i] <= this.state.valueLast) {
                            x.push(valueArray[i])
                        }

                    }
                    console.log(x)
                    this.setState({ recentValues: x })
                })



        }
        else if (type === "last" && e.target.value > this.state.valueFirst) {
            this.setState({ valueLast: e.target.value },
                () => {
                    console.log(this.state.valueLast)
                    let x = []
                    for (let i = 0; i < tempAnnRevenueList.length; i++) {
                        if (tempAnnRevenueList[i] >= this.state.valueFirst && tempAnnRevenueList[i] <= this.state.valueLast) {
                            x.push(valueArray[i])
                        }

                    }
                    console.log(x)
                    this.setState({ recentValues: x })
                })
        }
    }
    render() {
        //console.log(this.props)

        return (
            <div className="row" style={{ width: '100%', height: 'auto', backgroundColor: 'white', padding: '10px', borderRadius: '10px', backgroundColor: 'whitesmoke', borderColor: 'whitesmoke', borderStyle: 'solid', borderWidth: '2px', marginTop: '10px' }}>
                <div className="col-12" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <h1 className="ann-revenue-header-text">Annual Revenue</h1>
                </div>
                <div class="col-12 multi-range" style={{ width: 'inherit', backgroundColor: this.props.totalFilters.scaleAnnualRevenue.last == 0 ? 'white' : 'whitesmoke' }}>

                    <input type="range" min="0" max="9" value={this.state.valueFirst} step="1" id="upper" disabled={this.props.totalFilters.scaleAnnualRevenue.last !== 0}
                        onChange={(e) => this.changeAnnRevenueList(e, "first")} />
                    <input type="range" step="1 " min="0" max="9" value={this.state.valueLast} id="lower" disabled={this.props.totalFilters.scaleAnnualRevenue.last !== 0}
                        onChange={(e) => this.changeAnnRevenueList(e, "last")} />
                </div>
                <div className="col-12 lock-icon" style={{ backgroundColor: this.props.totalFilters.scaleAnnualRevenue.last == 0 ? 'white' : 'whitesmoke' }}  >
                    <div className="row">
                        <div className="col-10"></div>
                        <div className="col-2">
                            {this.props.totalFilters.scaleAnnualRevenue.last == 0 ? (<i className="fa fa-unlock"></i>) : (<i className="fa fa-lock"></i>)}</div>
                    </div>
                </div>
                <div className="col-12 ann-revenue-list">


                    <div className="row">

                        <div className="col-12" style={{ float: 'left', display: 'flex', alignItems: 'center' }}>
                            <input type="checkbox" className="option-input checkbox" checked={this.props.totalFilters.scaleAnnualRevenue.last !== 0}
                                onClick={(event) => {

                                    this.props.setSpinner()

                                    if (this.props.totalFilters.scaleAnnualRevenue.last === 0) {
                                        console.log("girdi 1")
                                        this.setState({ checked: true, checkedAll: false })
                                        this.props.update_other_filter(true, 'annual_revenue', { first: parseInt(this.state.valueFirst), last: parseInt(this.state.valueLast) })

                                    }
                                    else {
                                        console.log("girdi 3")
                                        this.setState({ checked: false, checkedAll: true })
                                        this.props.update_other_filter(true, 'annual_revenue', { first: 0, last: 0 })
                                        this.props.add_no_annual_revenue()
                                    }
                                    this.props.getTotalData(this.props.totalFilters, apiUrl)
                                }} />

                            <div style={{ height: '100%', alignItems: 'center', marginLeft: '10px' }}>
                                <span className="annual-revenue-data-text">{this.state.recentValues[0]}  -  {this.state.recentValues.length > 1 ? this.state.recentValues[this.state.recentValues.length - 1] : null}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row" hidden={this.props.totalFilters.scaleAnnualRevenue.last == 0}>

                        <div className="col-12" style={{ float: 'left', display: 'flex', alignItems: 'center' }}>
                            <div><input type="checkbox" className="option-input checkbox" checked={this.props.totalFilters.noAnnualRevenue}


                                onClick={(event) => {

                                    this.props.setSpinner()
                                    this.props.add_no_annual_revenue()
                                    setTimeout(() => this.props.getTotalData(this.props.totalFilters, apiUrl), 200)

                                }} /></div>

                            <div style={{ height: '100%', alignItems: 'center', marginLeft: '10px' }}>
                                <h1 className="annual-revenue-data-text">Include businesses with no annual-revenue</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-12" style={{ float: 'left', display: 'flex', alignItems: 'center' }}>
                            <input type="checkbox" className="option-input checkbox" checked={this.props.totalFilters.scaleAnnualRevenue.last === 0}


                                onClick={(event) => {

                                    this.props.setSpinner()

                                    if (this.props.totalFilters.scaleAnnualRevenue.last === 0) {
                                        this.setState({ checkedAll: true })
                                    }
                                    else {
                                        this.setState({ checkedAll: false })
                                        this.props.update_other_filter(true, 'annual_revenue', { first: 0, last: 0 })
                                    }
                                    this.props.getTotalData(this.props.totalFilters, apiUrl)
                                }} />
                        
                            <div style={{ height: '100%', alignItems: 'center', marginLeft: '10px' }}>
                                <h1 className="annual-revenue-data-text">Annual Revenue Exists Or Not (Default)</h1>
                            </div>
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
        update_other_filter: bindActionCreators(update_other_filter, dispatch),
        add_no_annual_revenue: bindActionCreators(add_no_annual_revenue, dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(AnnEmpRange);
