<template>
<div class="container">
    <div class="col-lg-4 col-md-4 ml-auto mr-auto" v-if="loginState==='initial'">
        <card style="width: 30rem;">
            <img slot="image" class="card-img-top" src="img/login-people4.png" alt="login" />
            <h4 class="card-title"></h4>
            <br />
            <p class="card-text">Project Pluto by Links Field is connecting to microsoft 365 to obtain data and service, please login first.</p>
            <div class="text-center">
                <br />
                <br />
                <base-button class="animation-on-hover" type="primary" v-on:click="logIn">
                    <i class="tim-icons icon-components"> </i> Sign in with Microsoft
                </base-button>
            </div>
        </card>

        <!--
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <card class="card-login card-white">
            <template slot="header">
              <img src="img/card-primary.png" alt="" >
              <h5 class="card-title">Log in</h5>
            </template>

            <div>
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ passed, failed, errors }"
              >
              <base-input
                required
                v-model="email"
                type="email"
                placeholder="Email"
                addon-left-icon="tim-icons icon-email-85"
                :error="errors[0]"
                :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
              </base-input>
             </ValidationProvider>

             <ValidationProvider
               name="password"
               rules="required|min:5"
               v-slot="{ passed, failed, errors }"
             >
             <base-input
               required
               v-model="password"
               placeholder="Password"
               addon-left-icon="tim-icons icon-lock-circle"
               type="password"
               :error="errors[0]"
               :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
             </base-input>
            </ValidationProvider>
            </div>

            <div slot="footer">
              <base-button native-type="submit" type="primary" class="mb-3" size="lg" block>
                Get Started
              </base-button>
              <div class="pull-left">
                <h6>
                  <router-link class="link footer-link" to="/register">
                    Create Account
                  </router-link>
                </h6>
              </div>

              <div class="pull-right">
                <h6><a href="#pablo" class="link footer-link">Need Help?</a></h6>
              </div>
            </div>
          </card>
        </form>
      </ValidationObserver>
      -->
    </div>
    <div class="col-lg-4 col-md-4 ml-auto mr-auto" v-if="loginState==='loggedIn'">
        <card style="width: 30rem;">
            <img slot="image" class="card-img-top" src="img/login-people4.png" alt="login" />
            <h4 class="card-title"></h4>
            <br />
            <p class="card-text">Welcom back, {{name}}, redirecting...</p>
            <div class="text-center">
                <br />
                <br />
                <!--base-button class="animation-on-hover" type="primary" v-on:click="redirect">
          <i class="tim-icons icon-components"> </i> enter
        </base-button-->
            </div>
        </card>
    </div>
    <div class="col-lg-4 col-md-4" v-if="loginState==='loggedIn'">
        <h4>
            Site info: id= {{ siteInfo.id}} <br />
            url = {{siteInfo.webUrl}} <br />

        </h4>
    </div>
</div>
</template>

<script>
import {
    extend
} from "vee-validate";
import {
    required,
    email,
    min
} from "vee-validate/dist/rules";
import {
    mapState,
    mapActions
} from 'vuex';
import {
    msUser
} from "../../auth/authPopup";
import router from '../../routes/router';
/*
extend("email", email);
extend("min", min);
extend("required", required);
*/
export default {
    data() {
        return {
            email: "",
            password: "",
            loginState: "initial",
            user: null,
            name: "",
            subscribe: true,
            siteInfo: ""
        };
    },
    computed: {
        ...mapState('account', ['status']),

    },
    created() {
        // reset login status
        //this.logout();
        this.changeState("initial");
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        changeState(newState) {
            this.loginState = newState;
        },
        logout() {
            console.log("trying to log out");
            msUser.signOut();
        },
        submit() {
            //alert("Form has been submitted!");
            /*
              should implement api - authenticate here
            */
            /* comment for microsoft-login
            this.submitted = true;
            var username = email;
            const { email, password } = this;
            if (username && password) {
              this.login({ username, password })
            }
            */
            //microsoft login

        },
        getSiteInfo() {
            msUser.seeRootSite();
            this.siteInfo = msUser.site_info;
        },
        logIn() {
            console.log("trying to login");
            msUser.signIn();
            //success:
            console.log("log in complete");
            this.user = localStorage.getItem('masluser');
            console.log("thisuser=" + this.user);
            if (this.user) {
                console.log("changing state...");
                this.changeState("loggedIn");
                this.name = JSON.parse(this.user).idTokenClaims.name;
                //this.router.push('/');
                this.getSiteInfo();
            }
        }
    }
};
</script>

<style>
.navbar-nav .nav-item p {
    line-height: inherit;
    margin-left: 5px;
}
</style>
