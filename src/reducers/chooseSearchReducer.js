import CHOOSE_OTHER_SEARCH from '../actions/chooseSearchActions'
let initialState = {
    buttonCategory: '#81d4fa',
    buttonLocation: 'white',
    textColorCategory: 'white',
    textColorLocation :'gray',
    categoryHidden : false,
    locationHidden : true,
    overflowYMain: 'scroll',
    
}

export const chooseSearchReducer = (state = initialState,action) => {
    switch(action.type){
        case 'CHOOSE_OTHER_SEARCH':
            console.log(action.payload)
            if(action.payload === "category"){
                console.log("gimred")
                return{
                    ...state,
                    buttonCategory: '#81d4fa',
                    buttonLocation: 'white',
                    textColorCategory: 'white',
                    textColorLocation :'gray',
                    categoryHidden : false,
                    locationHidden : true,
                    overflowYMain: 'scroll'
                    
                }
            }
            else{
                return{
                    ...state,
                    buttonCategory: 'white',
                    buttonLocation: '#81d4fa',
                    textColorCategory: 'gray',
                    textColorLocation :'white',
                    categoryHidden : true,
                    locationHidden : false,
                    overflowYMain: 'hidden'
                }
            }
        default:
            return state;
    }
}