<template>
 <div class="outer-container">
		<div class="container" id="container">
				<div class="overlay">
					<div class="overlay-panel overlay-top">
						<h1>Welcome to SimpleZ!</h1>
            <p>SimpleZ is a tool designed to help students fill their documents regarding university.</p>
					</div>
					<div class="overlay-panel overlay-bottom">
						<p>Are you ready? Hit the button below to proceed.</p>
            <router-link to="/manage">Get Started</router-link>
					</div>
				</div>
		</div>
	</div>
</template>

<script>

export default {
  name: 'Home',
}

</script>

<style scoped src="../styles/homestyle.css"></style>