import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import msAccount from './modules/msAccount';


Vue.use(Vuex);

const accountState = createPersistedState({  
    paths: ['msaccount']
})
const store = new Vuex.Store({
    /*modules: {
        alert,
        account,
        users
    }*/
    modules: {
        msAccount
    },
    plugins: [accountState],

    state: { // = data
        siteInfo : {
            name: null,
            webUrl: null
        }
    },

    getters: { // = computed properties
        getSiteInfo(state, getters){
            return state.siteInfo;
        }
    },

    actions:{
        setSiteUrl({state, getters, commit, rootState, rootGetters}, info ){
            commit('setSiteUrlInfo', info);
        }
    },

    mutations: {
        setSiteUrlInfo(state, url){
            state.siteInfo.webUrl = url;
        }
    }

});

export default store;
