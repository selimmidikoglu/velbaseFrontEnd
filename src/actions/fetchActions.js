export const FETCH_DEFAULT_CATEGORIES_AND_STATES ='FETCH_DEFAULT_CATEGORIES_AND_STATES';
export const FETCH_MATCHED_CATEGORIES = 'FETCH_MATCHED_CATEGORIES';
export const FETCH_TOTAL_DATA = 'FETCH_TOTAL_DATA'
export const CHANGE_SEARCH_KEY_CATEGORIES = 'CHANGE_SEARCH_KEY_CATEGORIES';
export const CHANGE_STATES_COLUMN = 'CHANGE_STATES_COLUMN'
export const FETCH_CITIES_IN_STATE = 'FETCH_CITIES_IN_STATE'
export const FETCH_ZIPCODES_IN_CITY = 'FETCH_ZIPCODES_IN_CITY'
export const INSERT_CHOOSEN_CATEGORIES = 'INSERT_CHOOSEN_CATEGORIES'
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

//conditional action for UI like run spinner
export const SET_SPINNER = 'SET_SPINNER'
// GETTING RANDOM CATEGORY AND  ALL STATES maybe later cities and zip
export const getDefaultCategoriesAndStates = url => {
    return dispatch => {
        fetch(url).then(data => data.json()).then(data => {
            let temp = [];
            for (let i = 0; i < data.states.length; i++) {
                const element = data.states[i];
                temp.push(element);
            }
            dispatch({
                type: FETCH_DEFAULT_CATEGORIES_AND_STATES,
                payload: {
                    defaultCategories: data.categories,
                    defaultStates: temp,
                    matchedStates : temp
                },
            });
        });
    };
};
export const send_temp_email = (mainObject,url,totalCount) => {
    let bodyData = {}
    let mainKeys = Object.keys(mainObject)
    let mainValues = Object.keys(mainObject)
    bodyData['name'] = mainObject.name;
    bodyData['surname'] = mainObject.surname;
    bodyData['email'] = mainObject.email;
    bodyData['address'] = mainObject.address;
    bodyData['phone'] = mainObject.phone;
    bodyData['card_number'] = mainObject.card_number;
    bodyData['exp_month'] = mainObject.exp_month;
    bodyData['exp_year'] = mainObject.exp_year;
    bodyData['cvc'] = mainObject.cvc;
    bodyData['totalPrice'] = totalCount * 9 
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
                for(var j=1;j<mainObject[mainKeys[i]].length;j++){
                    if(mainObject[mainKeys[i]][j] === true){
                        scaleAnnualRevenue.push(j)
                    }
                }
                bodyData['scaleAnnualRevenue'] = scaleAnnualRevenue
            }
            else if(mainKeys[i] == "scaleEmployeeCount"){
                let employeeCountArr = mainObject['scaleEmployeeCount']
                let scaleEmployeeCount = []
                for(var j=1;j<employeeCountArr.length;j++){
                    if(employeeCountArr[j]=== true){
                        scaleEmployeeCount.push(j)
                        console.log("scaleEmployee",scaleEmployeeCount)
                    }
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
                if(locations[i].stateFullName.toLowerCase().startsWith(searchKeyLocations.toLowerCase()) || locations[i].state.toLowerCase().startsWith(searchKeyLocations.toLowerCase())){

                    locationsObj.states.push({stateFullName:locations[i].stateFullName,state:locations[i].state})
                }
                else if(locations[i].city.toLowerCase().startsWith(searchKeyLocations.toLowerCase())){
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
// RENDER STATES COLUMN DEPENDING ON THE SEARCH KEYWORD
export const changeStateColumn = (event) => {
    return {
        type: CHANGE_STATES_COLUMN,
        payload: event.target.value
    }
}

export const insertChoosenStates = (event,type,id,state,abbreviation) => {
    console.log("girdi")
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
export const insertChoosenCategories = (event,type,id,category) => {
    console.log("girdi")
    return {
        type: INSERT_CHOOSEN_CATEGORIES,
        payload: {
            checked: event.target.checked,
            type:type,
            id:id,
            category: category
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
                        conditionForSpinner : {
                            divPointerEvents : 'all',
                            runSpinner: false
                        }
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
