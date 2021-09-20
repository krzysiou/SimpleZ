<template>
  <div class ="nav" id="nav">
      <router-link to='/login'>Log In</router-link>
      <router-link to='/register'>Register</router-link>
  </div>
  <div>
    <router-view/>
  </div>
</template>

<style src="./styles/appstyle.css"></style>
