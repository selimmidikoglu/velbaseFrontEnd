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
import { SEARCH_CITIES_IN_LIST } from '../actions/fetchActions'
import { SET_SPINNER } from '../actions/fetchActions'

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
        searchKeyCategories: '',
        searchKeyState: '',
        searchKeyCities: '',
        defaultCategories: [],
        defaultStates: [],
        defaultCities: [],
        defaultZipCodes: [],
        matchedCategories: [],
        matchedStates : [],
        matchedCities: [],
        matchedZipCodes : [],
        totalFilters: {
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
            scaleAnnualRevenue : [
                true,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
            ],
            scaleEmployeeCount: [
                true,
                false,
                false,
                false,
                false,
                false
            ],
            hasContact: false,
            hasOwner: false,
            hasFax : false,
            bbb_rating : 0,
            bbb_accredited : 0,
            biz_chained :0,
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
        case FETCH_MATCHED_CATEGORIES:
            return {...state,...action.payload}
        case CHANGE_STATES_COLUMN:
            let temp = []
            if (action.payload !== "" && action.payload.length < 3){
              if (action.payload.length === 1) {
                temp = state.defaultStates.filter(state => {
                  return state[0] === action.payload[0].toUpperCase()
                })
              }
              else {
                temp = state.defaultStates.filter(state => {
                  return state === action.payload.toUpperCase()
                })
              }
              return {...state,searchKeyState: action.payload.toUpperCase(),matchedStates: temp}
            }
            else {
                return {...state,searchKeyState: action.payload.toUpperCase(),matchedStates: state.defaultStates}
            }
        case FETCH_CITIES_IN_STATE:
            console.log(action.payload)
            return {...state,...action.payload}
        case INSERT_CHOOSEN_STATES:
                let tempStates = state.totalFilters.states
                if( action.payload.state in tempStates && tempStates[action.payload.state].checked)
                    delete tempStates[action.payload.state]
                else
                    tempStates[action.payload.state] = action.payload
                return {
                    ...state,
                    totalFilters : {
                        ...state.totalFilters,
                        states: tempStates
                    },
                }
        case FETCH_ZIPCODES_IN_CITY:
                return {...state,...action.payload}
        case INSERT_CHOOSEN_CITIES:
            let tempCities = state.totalFilters.cities
            if( action.payload.city in state.totalFilters.cities && state.totalFilters.cities[action.payload.city].checked)
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
                tempTotalFilters.scaleAnnualRevenue[index] = !tempTotalFilters.scaleAnnualRevenue[index]
                return { ...state, tempTotalFilters}
            }
            else if(type === 'employee_count'){
                let tempTotalFilters = {...state.totalFilters}
                tempTotalFilters.scaleEmployeeCount[index] = !tempTotalFilters.scaleEmployeeCount[index]
                return { ...state, tempTotalFilters}
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
        case SET_SEARCH_CITY_KEY:
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
        case FETCH_TOTAL_DATA:
                return {...state,...action.payload}
        default:
            return state;
    }
}

