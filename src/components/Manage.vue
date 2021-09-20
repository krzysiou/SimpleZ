<template>
	<div class="outer-container">
		<div class="container" id="container">
			<div class="form-container sign-up-container">
				<form action="#">
					<h1>Sign Up</h1>
					<input type="text" placeholder="Name" />
					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<button>Register</button>
				</form>
			</div>
			<div class="form-container sign-in-container">
				<form action="#">
					<h1>Sign in</h1>
					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<button>Log In</button>
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
						<h1>Welcome to SimpleZ</h1>
						<p>Create your account and get access to main features.</p>
						<button class="ghost" id="signUp">Register</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>



export default {
  name: 'Manage',
   mounted() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
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