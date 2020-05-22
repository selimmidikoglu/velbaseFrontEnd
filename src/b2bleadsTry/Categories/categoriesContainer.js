import React, { Component } from 'react'
//redux connect
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//Components
import Categories from './categories'
import SubCategories from './subCategories'
import { changeStateColumn, setCitySearchKey, searchCitiesInList, searchZipCodesInList, setZipCodeSearchKey } from '../../actions/fetchActions'

class categoriesContainer extends Component {

    render() {
        return (
            <div className="row locations-container" style={{ zIndex: -1 }}>
                <div className="col-6  overflow-auto state-container container-scroll">
                    <Categories />
                </div>
                <div className="col-6 city-container container-scroll">
                    <SubCategories />
                </div>
                {/*<div className="col-4 zipCode-container container-scroll"><ZipCodes /></div>*/}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return state.fetchReducer

}
function mapDispatchToProps(dispatch) {
    return {
        changeStateColumn: bindActionCreators(changeStateColumn, dispatch),
        setCitySearchKey: bindActionCreators(setCitySearchKey, dispatch),
        searchCitiesInList: bindActionCreators(searchCitiesInList, dispatch),
        setZipCodeSearchKey: bindActionCreators(setZipCodeSearchKey, dispatch),
        searchZipCodesInList: bindActionCreators(searchZipCodesInList, dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(categoriesContainer);