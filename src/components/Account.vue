<template>
 <h1>Logged on</h1>
 <router-link to="/manage" @click="logout()">Log Out</router-link>
</template>

<script>

import { deleteCookie } from '../utils/cookies';

export default {
  name: 'Account',
	methods: {
		logout: function() {
      deleteCookie('accessToken')
    },
	}
}


</script>

<style scoped src="../styles/homestyle.css"></style>