import { FETCH_DEFAULT_CATEGORIES_AND_STATES, INSERT_CHOOSEN_CATEGORIES } from "../actions/fetchActions";
import { CHANGE_SEARCH_KEY_CATEGORIES} from '../actions/fetchActions'
import { FETCH_MATCHED_CATEGORIES } from '../actions/fetchActions'
import { CHANGE_STATES_COLUMN } from '../actions/fetchActions'
import { FETCH_CITIES_IN_STATE } from '../actions/fetchActions'
import { FETCH_ZIPCODES_IN_CITY } from '../actions/fetchActions'

import { FETCH_TOTAL_DATA} from '../actions/fetchActions'

import { INSERT_CHOOSEN_STATES } from '../actions/fetchActions'
import { INSERT_CHOOSEN_CITIES } from '../actions/fetchActions'
import { INSERT_CHOOSEN_ZIPCODES } from '../actions/fetchActions'

import { UPDATE_OTHER_FILTER } from '../actions/fetchActions'
import { SET_SEARCH_CITY_KEY} from '../actions/fetchActions'
import { SET_SEARCH_ZIPCODE_KEY } from '../actions/fetchActions'
import { SET_SEARCH_KEY_LOCATIONS } from '../actions/fetchActions' 
import { SEARCH_CITIES_IN_LIST } from '../actions/fetchActions'
import { SEARCH_ZIPCODES_IN_LIST } from '../actions/fetchActions'
import { SET_SPINNER } from '../actions/fetchActions'
import { FETCH_LOCATIONS } from '../actions/fetchActions'
import { SET_CUSTOMER_INFO } from '../actions/fetchActions'
import { SEND_TEMP_EMAIL } from '../actions/fetchActions'
import { CHANGE_ALERT_BOX_STATE } from '../actions/fetchActions'
import { ADD_NO_ANNUAL_REVENUE } from '../actions/fetchActions'
import { ADD_NO_EMPLOYEE_COUNT } from '../actions/fetchActions'
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
let annualRevenueObject= {
    "0" :0,
    "10.000$":1,
    "100.000$":2,
    "1.000.000$":3,
    "10.000.000$":4,
    "100.000.000$":5,
    "1 billion $":6,
    "10 billion $":7,
    "100 billion $":8,
    "More than 100 billion $":9
}
const removeProperty = (obj, property) => {
    return  Object.keys(obj).reduce((acc, key) => {
      if (key !== property) {
        return {...acc, [key]: obj[key]}
      }
      return acc;
    }, {})
  }
let initialState = {
        totalCount:0,
        countFacebook: 0,
        countTwitter: 0,
        countBBB: 0,
        countFax: 0,
        countReviews: 0,
        countEmail: 0,
        countWebsites: 0,
        searchKeyCategories: '',
        searchKeyState: '',
        searchKeyCities: '',
        searchKeyZipCodes: '',
        searchKeyLocations: '',
        defaultCategories: [],
        defaultStates: [],
        defaultCities: [],
        defaultZipCodes: [],
        matchedCategories: [],
        matchedStates : [],
        matchedCities: [],
        matchedZipCodes : [],
        matchedLocations: {},
        alertOrNot : false,
        totalFilters: {
            address: '',
            fileType: '',
            tempOrAll: '',
            payment_token: '',
            name: '',
            surname: '',
            fullName : '',
            email: '',
            phone: '',
            card_number: '',
            exp_month: '',
            exp_year : '',
            cvc: '',
            categories: {},
            states: {},
            cities: {},
            zipCodes : {},
            hasPhone1 : false,
            hasPhone2: false,
            hasPhone3: false,
            hasWebsite : false,
            hasEmail1: false,
            hasEmail2 : false,
            hasEmail3 : false,
            hasHours: false,
            founded : 0,
            scaleAnnualRevenue : {first: 0,last:0},
            noAnnualRevenue : false,
            scaleEmployeeCount: {first: 0,last:0},
            noEmployeeCount : false,
            annual_revenue_first: 0,
            annual_revenue_last: 0,
            hasContact: false,
            hasOwner: false,
            hasFax : false,
            bbb_rating : 0,
            bbb_accredited : false,
            biz_chained :false,
            hasFacebook: false,
            hasTwitter: false,
            isAdvertised: false,
            hasReviews : false,
            
        },
        conditionForSpinner : {
            divPointerEvents : 'all',
            runSpinner: false
        }
        
}

export const fetchReducer = (state = initialState,action) => {
    switch(action.type){
        case FETCH_DEFAULT_CATEGORIES_AND_STATES:
            return {...state,...action.payload}
        case CHANGE_SEARCH_KEY_CATEGORIES:
            return {...state,searchKeyCategories:action.payload}
        case SET_SEARCH_KEY_LOCATIONS:
            console.log(action.payload)
            return {...state,searchKeyLocations:action.payload}
        case FETCH_MATCHED_CATEGORIES:
            return {...state,...action.payload}
        case FETCH_LOCATIONS:
            return {...state,...action.payload}
        case CHANGE_STATES_COLUMN:
            console.log(action.payload)
            let temp = []
            if (action.payload !== ""){
                temp = state.defaultStates.filter(state => {
                    console.log(state.state.startsWith(action.payload.toString()) )
                  return state.state.toLowerCase().startsWith(action.payload)
                })
              if(temp.length === 0){
                temp = state.defaultStates.filter(state => {
                   
                  return state.abbreviation.toLowerCase().startsWith(action.payload)
                })
              }
              return {...state,searchKeyState: action.payload,matchedStates: temp}
            }
            else {
                return {...state,searchKeyState: action.payload,matchedStates: state.defaultStates}
            }
        case FETCH_CITIES_IN_STATE:
            //console.log(action.payload)
            return {...state,...action.payload}
        case INSERT_CHOOSEN_STATES:
                let tempStates = state.totalFilters.states
                //if( action.payload.state in tempStates && tempStates[action.payload.state].checked)
                if( action.payload.abbreviation in tempStates){
                    delete tempStates[action.payload.abbreviation]
                }
                    
                else
                    //action.payload['checked']= !action.payload['checked']
                    tempStates[action.payload.abbreviation] = action.payload
                return {
                    ...state,
                    totalFilters : {
                        ...state.totalFilters,
                        states:tempStates
                    },
                }
        case FETCH_ZIPCODES_IN_CITY:
                return {...state,...action.payload}
        case INSERT_CHOOSEN_CITIES:
            let tempCities = state.totalFilters.cities
            //if( action.payload.city in state.totalFilters.cities && state.totalFilters.cities[action.payload.city].checked)
            if( action.payload.city in state.totalFilters.cities)
                delete tempCities[action.payload.city]
            else
                tempCities[action.payload.city] = action.payload

            return {
                ...state,
                totalFilters: {
                    ...state.totalFilters,
                    cities: tempCities
                }
            }
        case INSERT_CHOOSEN_ZIPCODES:
            let tempZipCodes = state.totalFilters.zipCodes
            if( action.payload.zipCode in state.totalFilters.zipCodes && state.totalFilters.zipCodes[action.payload.zipCode].checked)
                delete tempZipCodes[action.payload.zipCode]
            else
                tempZipCodes[action.payload.zipCode] = action.payload
            return {
                ...state,
                totalFilters:{
                    ...state.totalFilters,
                    zipCodes: tempZipCodes
                }
            }
        case INSERT_CHOOSEN_CATEGORIES:

            let tempCategories = state.totalFilters.categories
            if( action.payload.category in tempCategories && tempCategories[action.payload.category].checked)
                delete tempCategories[action.payload.category]
            else
                tempCategories[action.payload.category] = action.payload
            return {
                ...state,
                totalFilters : {
                    ...state.totalFilters,
                    categories: tempCategories
                },
            }
        
        case SET_SPINNER:
            let conditiontemp ={
                divPointerEvents : 'none',
                runSpinner: true
            }
            return {...state,conditionForSpinner:conditiontemp}
        case UPDATE_OTHER_FILTER:
            let type = action.payload.filter_type
            let index = action.payload.index

            if(type === 'annual_revenue'){
                let tempTotalFilters = {...state.totalFilters}
                let first = index.first
                let last  = index.last
                tempTotalFilters.scaleAnnualRevenue.first= first
                tempTotalFilters.scaleAnnualRevenue.last = last
                return { 
                    ...state,tempTotalFilters
                }
                
               
                
                
            }
            else if(type === 'employee_count'){
                let tempTotalFilters = {...state.totalFilters}
                let first = index.first
                let last  = index.last
                tempTotalFilters.scaleEmployeeCount.first= first
                tempTotalFilters.scaleEmployeeCount.last = last
                return { 
                    ...state,tempTotalFilters
                }
            }
            else if(type === 'hours') {
                return { 
                    ...state,
                    totalFilters: {
                        ...state.totalFilters,
                        hasHours: !state.totalFilters.hasHours
                    }
                }
            }
            else if(type === 'email') {
                return { 
                    ...state,
                    totalFilters: {
                        ...state.totalFilters,
                        hasEmail1: !state.totalFilters.hasEmail1
                    }
                }
            }
            else if(type === 'website') {
                console.log('website changed')
                return { 
                    ...state,
                    totalFilters: {
                        ...state.totalFilters,
                        hasWebsite: !state.totalFilters.hasWebsite
                    }
                }
            }
            else if(type === 'hours') {
                return { 
                    ...state,
                    totalFilters: {
                        ...state.totalFilters,
                        hasHours: !state.totalFilters.hasHours
                    }
                }
            }
            else if(type === 'contact') {
                return { 
                    ...state,
                    totalFilters: {
                        ...state.totalFilters,
                        hasContact: !state.totalFilters.hasContact
                    }
                }
            }
            else if(type === 'phone') {
                return { 
                    ...state,
                    totalFilters: {
                        ...state.totalFilters,
                        hasPhone1: !state.totalFilters.hasPhone1
                    }
                }
            }
            else if(type === 'owner') {
                return { 
                    ...state,
                    totalFilters: {
                        ...state.totalFilters,
                        hasOwner: !state.totalFilters.hasOwner
                    }
                }
            }
            else if(type === 'fax') {
                return { 
                    ...state,
                    totalFilters: {
                        ...state.totalFilters,
                        hasFax: !state.totalFilters.hasFax
                    }
                }
            }
            else if(type === 'facebook') {
                return { 
                    ...state,
                    totalFilters: {
                        ...state.totalFilters,
                        hasFacebook: !state.totalFilters.hasFacebook
                    }
                }
            }
            else if(type === 'twitter') {
                return { 
                    ...state,
                    totalFilters: {
                        ...state.totalFilters,
                        hasTwitter: !state.totalFilters.hasTwitter
                    }
                }
            }
            else if(type === 'advertised') {
                return { 
                    ...state,
                    totalFilters: {
                        ...state.totalFilters,
                        isAdvertised: !state.totalFilters.isAdvertised
                    }
                }
            }
            else if(type === 'reviews') {
                return { 
                    ...state,
                    totalFilters: {
                        ...state.totalFilters,
                        hasReviews: !state.totalFilters.hasReviews
                    }
                }
            }
            else if(type === 'biz_chained'){
                return {
                    ...state,
                    totalFilters: {
                        ...state.totalFilters,
                        biz_chained: !state.totalFilters.biz_chained
                    }
                }
            }
            else if(type === 'bbb_accredited'){
                return {
                    ...state,
                    totalFilters: {
                        ...state.totalFilters,
                        bbb_accredited: !state.totalFilters.bbb_accredited
                    }
                }
            }
        case SET_SEARCH_CITY_KEY:
            return {...state,searchKeyCities:action.payload.searchKeyCities}
        case SET_SEARCH_ZIPCODE_KEY:
            return {...state,...action.payload}
        case SEARCH_CITIES_IN_LIST:
            let bla = []
            console.log(action.payload)
            if ( action.payload.searchKeyCities !== '' && action.payload.searchKeyCities.length > 0){
                
                bla = action.payload.list.filter(element => {
                    console.log(String(element.city.toLowerCase()).startsWith(action.payload.searchKeyCities.toLowerCase()))
                     return String(element.city.toLowerCase()).startsWith(action.payload.searchKeyCities.toLowerCase())
                })
                console.log(bla)
                return {...state, matchedCities: bla}
            }
            else{
                return {...state, matchedCities: state.defaultCities}
            }
        case SEARCH_ZIPCODES_IN_LIST:
            console.log("zipCodes", action.payload.searchKeyZipCodes)
            let bla1 = []
            if ( action.payload.searchKeyZipCodes !== '' && action.payload.searchKeyZipCodes.length > 0){
                
                bla1 = action.payload.list.filter(element => {
                    console.log(element.zipCode.toString().startsWith(action.payload.searchKeyZipCodes))
                     return element.zipCode.toString().startsWith(action.payload.searchKeyZipCodes)
                })
                console.log(bla1)
                return {
                    ...state,
                    matchedZipCodes:bla1
                }
            }
            else{
                return {...state, matchedZipCodes: state.defaultZipCodes}
            }
        case FETCH_TOTAL_DATA:
                return {...state,...action.payload}
        case ADD_NO_ANNUAL_REVENUE:
            return {
                ...state,
                totalFilters:{
                    ...state.totalFilters,
                    noAnnualRevenue: !state.totalFilters.noAnnualRevenue
                }
            }
        
        case ADD_NO_EMPLOYEE_COUNT:
            let tempTotalFilters = state.totalFilters
            tempTotalFilters.noEmployeeCount = !tempTotalFilters.noEmployeeCount
            return {
                ...state,
                totalFilters: tempTotalFilters
            }
        case SET_CUSTOMER_INFO:
            return {
                ...state,
                totalFilters: {
                    ...state.totalFilters,
                    [action.payload.type]:action.payload.data
                }
            }
        case SEND_TEMP_EMAIL:
            return {...state,...action.payload}
        
        case CHANGE_ALERT_BOX_STATE:
            return {...state,...action.payload}
        default:
            return state;
    }
}

