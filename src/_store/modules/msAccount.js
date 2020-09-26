//this module is not responsible for logging the user in,
//but only to manage and store the user account, 
//loign is handled by MSAL

export default {
    namespaced: true,
  
    state: {
        msaccount:null //ms-account is the complete response from msal login: the object myMASLObj
    },
    getters:{
        user(state, getters){
            if(getters.isUserValid){
                return{
                    name:state.msaccount.idTokenClaims.name,
                    //accessToken: state.msaccount.accessToken,
                    email:state.msaccount.account.username,
                    //tokenExpiry: state.msaccount.expiresOn
                }
            }
            else return null;
            
        },
        rawAccount(state,getters){
            return state.msaccount;
        },
        isUserValid(state, getters){
            return state.msaccount!==null;
        },
        isLoggedIn(state,getters){
            return getters.isUserValid();
        }
    },
    actions:{
        login({state, getters, commit, rootState, rootGetters},resp){
            commit('saveAccount',resp);
        },
        logout({state, getters, commit, rootState, rootGetters},){
            commit('deleteAccount');
        }
    },
    mutations:{
        saveAccount(state, resp){
            state.msaccount = resp;
        },
        deleteAccount(state){
            state.msaccount = null;
        }
    }


}