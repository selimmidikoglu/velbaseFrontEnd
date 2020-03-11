import CHOOSE_OTHER_SEARCH from '../actions/chooseSearchActions'
let initialState = {
    //buttonCategory: '#81d4fa',
    buttonCategory: '#FCBD17',
    buttonLocation: 'white',
    buttonOtherFilters : 'white',
    textColorCategory: 'white',
    textColorLocation :'gray',
    textColorOtherFilters: 'gray',
    categoryHidden : false,
    locationHidden : true,
    otherFiltersHidden : true,
    overflowYMain: 'scroll',
    
}

export const chooseSearchReducer = (state = initialState,action) => {
    switch(action.type){
        case 'CHOOSE_OTHER_SEARCH':
            console.log(action.payload)
            if(action.payload === "category"){
                return{
                    ...state,
                    buttonCategory: '#FCBD17',
                    buttonLocation: 'white',
                    buttonOtherFilters: 'white',
                    textColorCategory: 'white',
                    textColorLocation :'gray',
                    textColorOtherFilters: 'gray',
                    categoryHidden : false,
                    locationHidden : true,
                    otherFiltersHidden: true,
                    overflowYMain: 'scroll'
                    
                }
            }
            else if(action.payload === "location"){
                return{
                    ...state,
                    buttonCategory: 'white',
                    buttonLocation: '#FCBD17',
                    buttonOtherFilters: 'white',
                    textColorCategory: 'gray',
                    textColorLocation :'white',
                    textColorOtherFilters: 'gray',
                    categoryHidden : true,
                    locationHidden : false,
                    otherFiltersHidden: true,
                    overflowYMain: 'hidden'
                }
            }
            else if(action.payload === "otherFilters"){
                return{
                    ...state,
                    buttonCategory: 'white',
                    buttonLocation: 'white',
                    buttonOtherFilters: '#FCBD17',
                    textColorCategory: 'gray',
                    textColorLocation :'gray',
                    textColorOtherFilters:'white',
                    categoryHidden : true,
                    locationHidden : true,
                    otherFiltersHidden: false,
                    overflowYMain: 'hidden'
                }
            }
        default:
            return state;
    }
}


