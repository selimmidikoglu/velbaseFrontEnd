import { apiUrl } from "../consts/consts";

export const FETCH_DEFAULT_CATEGORIES_AND_STATES ='FETCH_DEFAULT_CATEGORIES_AND_STATES';
export const FETCH_MATCHED_CATEGORIES = 'FETCH_MATCHED_CATEGORIES';
export const FETCH_SUB_MATCHED_CATEGORIES  =  'FETCH_SUB_MATCHED_CATEGORIES';
export const FETCH_TOTAL_DATA = 'FETCH_TOTAL_DATA'
export const CHANGE_SEARCH_KEY_CATEGORIES = 'CHANGE_SEARCH_KEY_CATEGORIES';
export const CHANGE_STATES_COLUMN = 'CHANGE_STATES_COLUMN'
export const FETCH_CITIES_IN_STATE = 'FETCH_CITIES_IN_STATE'
export const FETCH_ZIPCODES_IN_CITY = 'FETCH_ZIPCODES_IN_CITY'
export const INSERT_CHOOSEN_CATEGORIES = 'INSERT_CHOOSEN_CATEGORIES'
export const INSERT_PARENT_CATEGORIES = ' INSERT_PARENT_CATEGORIES'
export const INSERT_CHOOSEN_STATES = 'INSERT_CHOOSEN_STATES'
export const INSERT_CHOOSEN_CITIES = 'INSERT_CHOOSEN_CITIES'
export const INSERT_CHOOSEN_ZIPCODES = 'INSERT_CHOOSEN_ZIPCODES'
export const UPDATE_OTHER_FILTER = 'UPDATE_OTHER_FILTER'
export const SEARCH_CITIES_IN_LIST = 'SEARCH_CITIES_IN_LIST'
export const SEARCH_ZIPCODES_IN_LIST = 'SEARCH_ZIPCODES_IN_LIST'
export const SET_SEARCH_CITY_KEY = 'SET_SEARCH_CITY_KEY'
export const SET_SEARCH_ZIPCODE_KEY = 'SET_SEARCH_ZIPCODE_KEY'
export const SET_SEARCH_KEY_LOCATIONS = 'SET_SEARCH_KEY_LOCATIONS'
export const FETCH_LOCATIONS = 'FETCH_LOCATIONS'
export const SET_CUSTOMER_INFO = 'SET_CUSTOMER_INFO'
export const SEND_TEMP_EMAIL = 'SEND_TEMP_EMAIL'
export const CHANGE_ALERT_BOX_STATE = 'CHANGE_ALERT_BOX_STATE'
export const ADD_NO_ANNUAL_REVENUE = 'ADD_NO_ANNUAL_REVENUE'
export const ADD_NO_EMPLOYEE_COUNT = 'ADD_NO_EMPLOYEE_COUNT'
export const ALERT_TOP_LIMIT = 'ALERT_TOP_LIMIT'
export const BASIC_CONTACT = 'BASIC_CONTACT'
export const CHANGE_ASKED_QUESTION = 'CHANGE_ASKED_QUESTION'
export const SEND_CONTACT_EMAIL = 'SEND_CONTACT_EMAIL'
export const CONTACT_DONE = 'CONTACT_DONE'
export const SET_TYPE_OF_DATA = 'SET_TYPE_OF_DATA'
//conditional action for UI like run spinner
export const SET_SPINNER = 'SET_SPINNER'
// GETTING RANDOM CATEGORY AND  ALL STATES maybe later cities and zip
export const getDefaultCategoriesAndStates = url => {
    return dispatch => {
        console.log("yo")
        fetch(url).then(data => data.json()).then(data => {
            console.log(data)
            let temp = [];
            for (let i = 0; i < data.states.length; i++) {
                const element = data.states[i];
                temp.push(element);
            }
            dispatch({
                type: FETCH_DEFAULT_CATEGORIES_AND_STATES,
                payload: {
                    //parentCategories: data.categories,
                    defaultCategories: data.categories,
                    defaultStates: temp,
                    matchedStates : temp
                },
            });
        });
    };
};
export const send_temp_email = (mainObject,url,totalCount,type) => {
    let bodyData = {}
    let mainKeys = Object.keys(mainObject)
    let mainValues = Object.keys(mainObject)
    bodyData['name'] = mainObject.name;
    bodyData['company_name'] = mainObject.company_name;
    bodyData['email'] = mainObject.email;
    bodyData['address'] = mainObject.address;
    bodyData['phone'] = mainObject.phone;
    bodyData['card_number'] = mainObject.card_number;
    bodyData['exp_month'] = mainObject.exp_month;
    bodyData['exp_year'] = mainObject.exp_year;
    bodyData['cvc'] = mainObject.cvc;
    bodyData['totalPrice'] = totalCount * 9;
    bodyData['token'] = mainObject.payment_token;
    bodyData['state'] = mainObject.state;
    bodyData['city'] = mainObject.city;
    bodyData['street'] = mainObject.street;
    bodyData['zipCode'] = mainObject.zipCode;
    if(type == 'sample_data')
        bodyData['data_type'] = 'sample_data'
    else if(type == 'data')
        bodyData['data_type'] = 'data'
    for (let i = 0; i < mainKeys.length; i++) {
        const element = mainObject[mainKeys[i]];
        if(typeof element == "boolean"){
            bodyData[mainKeys[i]] = element
        }
        else if(Number.isInteger(element)){
            bodyData[mainKeys[i]] = element
        }
        else{
            //categoriesupdate_other_filter
            if(mainKeys[i] == "categories"){
                let categoryKeys = Object.keys(element);
                bodyData[mainKeys[i]] = categoryKeys
            }
            else if(mainKeys[i] == "states"){
                let statesKeys = Object.keys(element);
                bodyData[mainKeys[i]] = statesKeys
            }
            else if(mainKeys[i] == "cities"){
                let citiesHolder = []
                let citiesKeys = Object.keys(element);
                for (let i = 0; i < citiesKeys.length; i++) {
                    citiesHolder.push({city:citiesKeys[i],state:element[citiesKeys[i]].state})
                    
                }
                bodyData[mainKeys[i]] = citiesHolder
            }
            else if(mainKeys[i] == "zipCodes"){
                let zipCodesHolder = []
                let zipCodesKeys = Object.keys(element);
                for (let i = 0; i < zipCodesKeys.length; i++) {
                    zipCodesHolder.push({zipCode:zipCodesKeys[i],city:element[zipCodesKeys[i]].city});
                    
                }
                bodyData[mainKeys[i]] = zipCodesHolder
            }
            else if(mainKeys[i] == "scaleAnnualRevenue"){
                let scaleAnnualRevenue = []
                console.log(mainObject[mainKeys[i]])
                for (let i = mainObject["scaleAnnualRevenue"].first +1; i <= mainObject["scaleAnnualRevenue"].last; i++) {
                    scaleAnnualRevenue.push(i);
                    
                }
                bodyData['scaleAnnualRevenue'] = scaleAnnualRevenue
            }
            else if(mainKeys[i] == "scaleEmployeeCount"){
                let scaleEmployeeCount = []
                console.log(mainObject[mainKeys[i]])
                for (let i = mainObject["scaleEmployeeCount"].first +1; i <= mainObject["scaleEmployeeCount"].last; i++) {
                    scaleEmployeeCount.push(i);
                    
                }
                bodyData['scaleEmployeeCount'] = scaleEmployeeCount
            }
        }
        
        
    }
    return dispatch => {
        fetch(url + 'getDataAndSend',{
            method:"POST",
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(bodyData)
        })
        .then(data => data.json())
        .then(data => {
            console.log(data)
            dispatch({
                type: SEND_TEMP_EMAIL,
                payload:{
                   orderId: data.orderId,
                   message: 'Done',
                   alertOrNot : true,
                   conditionForSpinner : {
                    divPointerEvents : 'all',
                    runSpinner: false
                }
                }
            })
        })    
    }
}

// SET CATEGORY SEARCH KEY
export const setSearchKeyCategories = event => {
   return {
       type: CHANGE_SEARCH_KEY_CATEGORIES,
       payload: event.target.value
   }
}
// SET LOCATIONS SEARCH KEY
export const setSearchKeyLocations = event => {
    console.log(event.target.value)
    return {
        type: SET_SEARCH_KEY_LOCATIONS,
        payload: event.target.value
    }
}
export const fetchLocations = (url,searchKeyLocations) => {
    if(searchKeyLocations < 2 || url === 'empty'){ 
        return dispatch => {
            dispatch ({
                type: FETCH_CITIES_IN_STATE,
                payload:{
                    matchedLocations: {},
                }
            })
        }
    }
    return dispatch => {
        fetch(url + "getLocationSearch?searchKey=" + searchKeyLocations)
        .then(data => data.json())
        .then(locations => {
            console.log(locations)
            let locationsObj = {
                cities:[],
                states:[]
                
            }
            for(var i=0;i<locations.length;i++){
                if(locations[i].stateFullName.toLowerCase().includes(searchKeyLocations.toLowerCase()) || locations[i].state.toLowerCase().includes(searchKeyLocations.toLowerCase())){

                    locationsObj.states.push({stateFullName:locations[i].stateFullName,state:locations[i].state})
                }
                else if(locations[i].city.toLowerCase().includes(searchKeyLocations.toLowerCase())){
                    locationsObj.cities.push({city:locations[i].city,state:locations[i].state,stateFullName:locations[i].stateFullName})
                }

            }
            console.log(locationsObj)
            dispatch({
                type: FETCH_LOCATIONS,
                payload: {
                    matchedLocations: locationsObj,
                },
            });
        });
    }
}
// FETCH NEW CATEGORIES WITH THE SEARCH KEY WORD
export const getMatchedCategories = (url,searchKeyCategories) => {
    return dispatch => {
        fetch(url + "?searchKey=" + searchKeyCategories)
        .then(data => data.json())
        .then(matchedCategories => {
            console.log(matchedCategories)
            dispatch({
                type: FETCH_MATCHED_CATEGORIES,
                payload: {
                    conditionForSpinner : {
                        divPointerEvents : 'all',
                        runSpinner: false
                    },
                    matchedCategories: matchedCategories.categories,
                },
            });
        });
    }

}
export const getMatchedSubCategories = (url,categories) => {
    
    if(Object.keys(categories) != 0)
    {
        var sic_codes = []
        Object.keys(categories).forEach((element,index) => {
            sic_codes.push(categories[element].sic_code)
        })
        return dispatch => {
            fetch(url,{
                method:"POST",
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({sic_codes:sic_codes})
            })
            .then(data => data.json())
            .then(data => {
                console.log(data.matchedSubCategories)
                dispatch({
                    type: FETCH_SUB_MATCHED_CATEGORIES,
                    payload: {
                        matchedSubCategories: data.matchedSubCategories,
                        
                    },
                });
            });
        }
    }
    else{
        return{
            type:FETCH_SUB_MATCHED_CATEGORIES,
            payload: {
                matchedSubCategories: [],
            },
        }
    }

}
// RENDER STATES COLUMN DEPENDING ON THE SEARCH KEYWORD
export const changeStateColumn = (event) => {
    return {
        type: CHANGE_STATES_COLUMN,
        payload: event.target.value
    }
}

export const insertChoosenStates = (event,type,id,state,abbreviation) => {
    console.log(type,id,state,abbreviation)
    return {
        type: INSERT_CHOOSEN_STATES,
        payload: {
            checked: event.target.checked,
            type:type,
            id:id,
            state: state,
            abbreviation: abbreviation
        }
    }
}
export const insertChoosenCategories = (event,type,id,category,sic_code) => {
    console.log("girdi")
    return {
        type: INSERT_CHOOSEN_CATEGORIES,
        payload: {
            checked: event.target.checked,
            type:type,
            id:id,
            category: category,
            sic_code : sic_code
        }
    }
}
export const insertParentCategories = (event,type,id,category,sic_code) => {
    console.log("girdi")
    return {
        type: INSERT_PARENT_CATEGORIES,
        payload: {
            checked: event.target.checked,
            type:type,
            id:id,
            category: category,
            sic_code: sic_code
        }
    }
}
export const getCitiesInState = (url,type,states) => {
    if(type === 'states'){
        if(Object.keys(states).length === 0){ 
            return dispatch => {
                dispatch ({
                    type: FETCH_CITIES_IN_STATE,
                    payload:{
                        matchedCities: [],
                        defaultCities : [],
                        matchedZipCodes: [],
                        defaultZipCodes : [],
                        /*conditionForSpinner : {
                            divPointerEvents : 'all',
                            runSpinner: false
                        }*/
                    }
                })
            }
        }
            let bodyStates = Object.keys(states)
            return dispatch => {
                fetch(url + 'getCitiesInState',{
                    method:"POST",
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({states:bodyStates})
                })
                .then(data => data.json())
                .then(data => {
                    console.log(data)
                    let temp = [];
                    for (let i = 0; i < data.cities.length; i++) {
                        temp.push(data.cities[i]);
                    }
                    dispatch({
                        type: FETCH_CITIES_IN_STATE,
                        payload:{
                            matchedCities: temp,
                            defaultCities : temp,
                            /*conditionForSpinner : {
                                divPointerEvents : 'all',
                                runSpinner: false
                            }*/

                        }
                    })
                })    
            }
    }
}
export const insertChoosenCities = (event,type,state,city) => {
    return {
        type: INSERT_CHOOSEN_CITIES,
        payload: {
            checked: event.target.checked,
            type:type,
            state:state,
            city: city
        }
    }
} 
export const getZipCodesInCities = (url,type,cities) => {
    if(type === 'cities'){
        console.log(cities)
        if(Object.entries(cities).length === 0){ 
            return dispatch => {
                dispatch ({
                    type: FETCH_ZIPCODES_IN_CITY,
                    payload:{
                        matchedZipCodes: [],
                        defaultZipCodes : [],
                        /*conditionForSpinner : {
                            divPointerEvents : 'all',
                            runSpinner: false
                        }*/
                    }
                })
            }
        }
            let bodyCities = Object.keys(cities).map((element,index) => {
                return [element,Object.values(cities)[index].state]
            })
            
            console.log(bodyCities)
            return dispatch => {
                fetch(url + 'getZipCodesInCities',{
                    method:"POST",
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({cities:bodyCities})
                })
                .then(data => data.json())
                .then(data => {
                    console.log(data)
                    let temp = [];
                    for (let i = 0; i < data.zipCodes.length; i++) {
                        temp.push(data.zipCodes[i]);
                    }
                    dispatch({
                        type: FETCH_ZIPCODES_IN_CITY,
                        payload:{
                            matchedZipCodes: temp,
                            defaultZipCodes : temp,
                            conditionForSpinner : {
                                divPointerEvents : 'all',
                                runSpinner: false
                            }

                        }
                    })
                })    
            }
    }
}
export const insertChoosenZipCodes = (event,type,id,zipCode,city) => {
    return {
        type: INSERT_CHOOSEN_ZIPCODES,
        payload: {
            checked: event.target.checked,
            type:type,
            id:id,
            zipCode: zipCode,
            city:city
        }
    }
} 
export const update_other_filter = (value,filter_type,index) => {
    return {
        type: UPDATE_OTHER_FILTER,
        payload: {
            value: value,
            filter_type: filter_type,
            index:index
        }
    }
}
export const setCitySearchKey =(event) => {
    return {
        type: SET_SEARCH_CITY_KEY,
        payload: {
            searchKeyCities: event.target.value
        }
    }
}
export const setZipCodeSearchKey =(event) => {
    console.log(event.target.value)
    return {
        type: SET_SEARCH_ZIPCODE_KEY,
        payload: {
            searchKeyZipCodes: event.target.value
        }
    }
}
export const searchZipCodesInList = (event,list) => {
    console.log("giriyor")
    return {
        type: SEARCH_ZIPCODES_IN_LIST,
        payload: {
            list: list,
            searchKeyZipCodes:event.target.value
        }
    }
}
export const searchCitiesInList = (event,list) => {
    return {
        type: SEARCH_CITIES_IN_LIST,
        payload: {
            list: list,
            searchKeyCities:event.target.value
        }
    }
}
export const getTotalData = (mainObject,url) => {
    let bodyData = {}
    let mainKeys = Object.keys(mainObject)
    let mainValues = Object.keys(mainObject)

    for (let i = 0; i < mainKeys.length; i++) {
        const element = mainObject[mainKeys[i]];
        if(typeof element == "boolean"){
            bodyData[mainKeys[i]] = element
        }
        else if(Number.isInteger(element)){
            bodyData[mainKeys[i]] = element
        }
        else{
            //categoriesupdate_other_filter
            if(mainKeys[i] == "categories"){
                console.log("kategori var",element)
                let categoryKeys = Object.keys(element);
                bodyData[mainKeys[i]] = categoryKeys
            }
            else if(mainKeys[i] == "states"){
                let statesKeys = Object.keys(element);
                bodyData[mainKeys[i]] = statesKeys
            }
            else if(mainKeys[i] == "cities"){
                let citiesHolder = []
                let citiesKeys = Object.keys(element);
                for (let i = 0; i < citiesKeys.length; i++) {
                    citiesHolder.push({city:citiesKeys[i],state:element[citiesKeys[i]].state})
                    
                }
                bodyData[mainKeys[i]] = citiesHolder
            }
            else if(mainKeys[i] == "zipCodes"){
                let zipCodesHolder = []
                let zipCodesKeys = Object.keys(element);
                for (let i = 0; i < zipCodesKeys.length; i++) {
                    zipCodesHolder.push({zipCode:zipCodesKeys[i],city:element[zipCodesKeys[i]].city});
                    
                }
                bodyData[mainKeys[i]] = zipCodesHolder
            }
            else if(mainKeys[i] == "scaleAnnualRevenue"){
                let scaleAnnualRevenue = []
                console.log(mainObject[mainKeys[i]])
                for (let i = mainObject["scaleAnnualRevenue"].first +1; i <= mainObject["scaleAnnualRevenue"].last; i++) {
                    scaleAnnualRevenue.push(i);
                    
                }
                bodyData['scaleAnnualRevenue'] = scaleAnnualRevenue
            }
            else if(mainKeys[i] == "scaleEmployeeCount"){
                let scaleEmployeeCount = []
                console.log(mainObject[mainKeys[i]])
                for (let i = mainObject["scaleEmployeeCount"].first +1; i <= mainObject["scaleEmployeeCount"].last; i++) {
                    scaleEmployeeCount.push(i);
                    
                }
                bodyData['scaleEmployeeCount'] = scaleEmployeeCount
            }
        }
        
        
    }
    console.log(bodyData)
    return dispatch => {
        fetch(url + 'getData',{
            method:"POST",
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(bodyData)
        })
        .then(data => data.json())
        .then(data => {
            console.log(data)
            dispatch({
                type: FETCH_TOTAL_DATA,
                payload:{
                    totalCount: data.totalCount,
                    countFacebook: data.countFacebook,
                    countTwitter: data.countTwitter,
                    countBBB: data.countBBB,
                    countFax: data.countFax,
                    countReviews: data.countReviews,
                    countEmail: data.countEmail,
                    countWebsite: data.countWebsite,
                    conditionForSpinner : {
                        divPointerEvents : 'all',
                        runSpinner: false
                    }

                }
            })
        })    
    }
}
export const set_customer_info = (data,type) => {
    return {
        type:SET_CUSTOMER_INFO,
        payload: {
            type: type,
            data : data
        }
    }
}
export const setSpinner = () => {
    return {
        type: SET_SPINNER,
    }
}

export const changeAlertBoxState = () =>{
    return {
        type: CHANGE_ALERT_BOX_STATE,
        payload:{
            alertOrNot: false
        }
    }
}

export const add_no_annual_revenue = () => {
    return {
        type:ADD_NO_ANNUAL_REVENUE
    }
}

export const add_no_employee_count = () => {
    return {
        type:ADD_NO_EMPLOYEE_COUNT
    }
}
export const alert_top_limit = () => {
    return {
        type: ALERT_TOP_LIMIT
    }
}
export const basic_contact = (value) => {
    return {
        type: BASIC_CONTACT,
        payload: value
    }
}
export const change_asked_question = (value) => {
    return {
        type: CHANGE_ASKED_QUESTION,
        payload: value
    }
}

export const send_contact_email = (mainObject,url,totalCount, askedQuestion) => {
    let bodyData = {}
    let mainKeys = Object.keys(mainObject)
    let mainValues = Object.keys(mainObject)
    
    bodyData['askedQuestion'] = askedQuestion
    bodyData['name'] = mainObject.name;
    bodyData['company_name'] = mainObject.company_name;
    bodyData['email'] = mainObject.email;
    bodyData['address'] = mainObject.address;
    bodyData['phone'] = mainObject.phone;
    bodyData['totalPrice'] = totalCount * 9;
    bodyData['state'] = mainObject.state;
    bodyData['city'] = mainObject.city;
    bodyData['street'] = mainObject.street;
    bodyData['zipCode'] = mainObject.zipCode;
    for (let i = 0; i < mainKeys.length; i++) {
        const element = mainObject[mainKeys[i]];
        if(typeof element == "boolean"){
            bodyData[mainKeys[i]] = element
        }
        else if(Number.isInteger(element)){
            bodyData[mainKeys[i]] = element
        }
        else{
            //categoriesupdate_other_filter
            if(mainKeys[i] == "categories" && Object.keys(element).length != 0){
                let categoryKeys = Object.keys(element);
                bodyData[mainKeys[i]] = categoryKeys
            }
            else if(mainKeys[i] == "states" && Object.keys(element).length != 0){
                let statesKeys = Object.keys(element);
                bodyData[mainKeys[i]] = statesKeys
            }
            else if(mainKeys[i] == "cities" && Object.keys(element).length != 0){
                let citiesHolder = []
                let citiesKeys = Object.keys(element);
                for (let i = 0; i < citiesKeys.length; i++) {
                    citiesHolder.push({city:citiesKeys[i],state:element[citiesKeys[i]].state})
                    
                }
                bodyData[mainKeys[i]] = citiesHolder
            }   
        }
        
        
    }
    return dispatch => {
        fetch(url + 'getContactAndSendMail',{
            method:"POST",
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(bodyData)
        })
        .then(data => data.json())
        .then(data => {
            console.log(data)
            dispatch({
                type: SEND_CONTACT_EMAIL,
                payload:{
                   message: 'Done',
                   
                }
            })
        })    
    }
}
export const contact_done = (value) => {
    return {
        type: CONTACT_DONE,
        payload : value
    }
}

export const set_type_of_data = (data) => {
    console.log(data)
    return {
        type: SET_TYPE_OF_DATA,
        payload: data
    }
}