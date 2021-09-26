<template>
	<div class="outer-container">
		<div class="container" id="container">
			<div class="form-container sign-up-container">
				<form>
					<h1>Sign Up</h1>
					<p class="error-message error-right">{{ errorR }}</p>
					<input type="text" placeholder="Name" id="nameR"/>
					<input type="email" placeholder="Email" id="emailR"/>
					<input type="password" placeholder="Password" id="passwordR"/>
					<button type="button" @click="register()">Register</button>
					<router-link to="/" class="exit">Home</router-link>
				</form>
			</div>
			<div class="form-container sign-in-container">
				<form>
					<h1>Sign in</h1>
					<p class="error-message error-left">{{ errorL }}</p>
					<input type="text" placeholder="Name" id="nameL"/>
					<input type="password" placeholder="Password" id="passwordL"/>
					<button type="button" @click="login()">Log In</button>
					<router-link to="/" class="exit">Home</router-link>
				</form>
			</div>
			<div class="overlay-container">
				<div class="overlay">
					<div class="overlay-panel overlay-left">
						<h1>Already got an account?</h1>
						<p>Click the button below to proceed signing in.</p>
						<button class="ghost" id="signIn">Log In</button>
					</div>
					<div class="overlay-panel overlay-right">
						<h1>Don't have an account?</h1>
						<p>Create your account and get access to main features.</p>
						<button class="ghost" id="signUp">Register</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

const axios = require('axios')
const { uuid } = require('uuidv4');
const { setCookie } = require('../utils/cookies')

export default {
  name: 'Manage',
	data() {
		return {
			errorR: null,
			errorL: null,
		}
	},

	methods: {
      register: async function(){
        const name = document.getElementById("nameR").value;
        const email = document.getElementById("emailR").value;
        const password = document.getElementById("passwordR").value;
        const id = uuid()

        try {
            const response = await axios.post('http://localhost:3000/users/register', {
                id: id,
                name: name,
                email: email,
                password: password
            })
						setCookie('accessToken', response.data.accessToken, 1)
            if(response.data.id){
            location.replace("http://localhost:8080/#/users/")
            }
        } catch (error) {
            this.errorR = error.response.data.error
        }
    },

		login: async function(){
        const name = document.getElementById("nameL").value;
        const password = document.getElementById("passwordL").value;

        try {
            const response = await axios.post('http://localhost:3000/users/login', {
                name: name,
                password: password,
            })
            setCookie('accessToken', response.data.accessToken, 1)
            if(response.data.id){
            location.replace("http://localhost:8080/#/users/")
            }
        } catch(error) {
            this.errorL = error.response.data.error
        }
    }
  },

   mounted() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
			//clear inputs
			setTimeout(function () {
				document.getElementById("nameL").value = ''
				document.getElementById("passwordL").value = ''
			}, 400);
				this.errorL = null;
    });

    signInButton.addEventListener('click', () => {
    	container.classList.remove("right-panel-active");
			//clear inputs
			setTimeout(function () {
				document.getElementById("nameR").value = ''
				document.getElementById("emailR").value = ''
				document.getElementById("passwordR").value = ''
			}, 400);
				this.errorR = null;
    });
  },

  beforeUnmount() {
    const signInButton = document.getElementById('signIn');
    const signUpButton = document.getElementById('signUp');
    const container = document.getElementById('container');
    
    signUpButton.removeEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.removeEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }
}

</script>

<style scoped src="../styles/managestyle.css"></style>