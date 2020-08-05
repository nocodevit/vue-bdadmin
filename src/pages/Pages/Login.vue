<template>
  <div class="container">
    <div class="col-lg-4 col-md-4 ml-auto mr-auto">
      <card style="width: 30rem;">
        <img slot="image" class="card-img-top" src="img/login-people4.png" alt="login"/>
        <h4 class="card-title"></h4>
        <br />
        <p class="card-text">Project Pluto by Links Field is connecting to microsoft 365 to obtain data and service, please login first.</p>       
        <div class="text-center">
        <br/>
        <br/>
        <base-button class="animation-on-hover" type="primary" v-on:click="logIn">
          <i class="tim-icons icon-components"> </i>  Sign in with Microsoft 
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
  </div>
</template>
<script>

import { extend } from "vee-validate";
import { required, email, min } from "vee-validate/dist/rules";
import { mapState, mapActions } from 'vuex';
import { msUser} from "../../auth/authPopup";

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
      subscribe: true,
    };
  },
  computed: {
        ...mapState('account', ['status'])
  },
  created() {
        // reset login status
        this.logout();
    },
  methods: {
    ...mapActions('account', ['login', 'logout']),

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
    logIn(){
      console.log("trying to login");
      msUser.signIn();
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
