// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
import {msalConfig, loginRequest, tokenRequest} from './authConfig';
import { Avatar } from 'element-ui';
import {callMSGraph} from './graph';
import {mapState, mapGetters, mapActions} from 'vuex';
export const msUser = {
    signIn,
    signOut,
    getTokenPopup,
    seeProfile,
    readMail,
    seeRootSite,
    username,
    site_info
};

const myMSALObj = new msal.PublicClientApplication(msalConfig);
let username="";
let site_info="";
let myMSALObjJson = "";

  function isUserSignedIn(){
      return myMSALObj.account!==null;
    //return updateLoggedInStatus(myMSALObj.getAccount());
  }
  
  function signIn() {
    myMSALObj.loginPopup(loginRequest)
      .then(loginResponse => {
        console.log("id_token acquired at: " + new Date().toString());
        console.log(loginResponse);
        myMSALObjJson = JSON.parse(JSON.stringify(myMSALObj));
        //console.log("myMSALObj is : " + JSON.stringify(myMSALObj));
        console.log("myMSALObj2 account is : " + JSON.stringify(myMSALObjJson));
        console.log("myMSALObj get account is : "+ myMSALObj.account);
        if (myMSALObj.account) {
            $store.msAccount.dispatch('login',myMSALObj.account);
          //showWelcomeMessage(myMSALObj.getAccount());
        }
      }).catch(error => {
        console.log(error);
      });
  }
  
  function signOut() {
    myMSALObj.logout();
  }
  
  function getTokenPopup(request) {
    return myMSALObj.acquireTokenSilent(request)
      .catch(error => {
        console.log(error);
        console.log("silent token acquisition fails. acquiring token using popup");
            
        // fallback to interaction when silent call fails
          return myMSALObj.acquireTokenPopup(request)
            .then(tokenResponse => {
              return tokenResponse;
            }).catch(error => {
              console.log(error);
            });
      });
  }

  function seeRootSite(){
    if (myMSALObj.getAccount()) {
        getTokenPopup(loginRequest)
          .then(response => {
            console.log("the accesstoken = " + response.accessToken);
            callMSGraph(graphConfig.graphMeRootSiteEndpoint, response.accessToken, getRootSiteInfo);
            //profileButton.classList.add("d-none");
            //mailButton.classList.remove("d-none");
          }).catch(error => {
            console.log(error);
          });
      }
  }
  
  function getRootSiteInfo(data, endpoint){
      console.log("getRootInfo data is" + JSON.stringify(data));
      $store.dispatch('setSiteUrl', data.webUrl);
  }

  function seeProfile() {
    if (myMSALObj.getAccount()) {
      getTokenPopup(loginRequest)
        .then(response => {
          console.log("the accesstoken = " + response.accessToken);
          callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, updateUI);
          profileButton.classList.add("d-none");
          mailButton.classList.remove("d-none");
        }).catch(error => {
          console.log(error);
        });
    }
  }
  
  function readMail() {
    if (myMSALObj.getAccount()) {
      getTokenPopup(tokenRequest)
        .then(response => {
          callMSGraph(graphConfig.graphMailEndpoint, response.accessToken, updateUI);
        }).catch(error => {
          console.log(error);
        });
    }
  }