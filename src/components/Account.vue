<template>
<div class="container">
  <nav>
    <router-link to="/users/files/create">Create File</router-link>
    <router-link to="/users/files">Files</router-link>
    <router-link to="/users" >Home</router-link>
    <router-link to="/manage" @click="logout()">Log Out</router-link>
  </nav>
  <div class="welcome">
    <h1>Hello {{ name }}!</h1>
    <p>Navigate the tabs above to create or view files.</p>
  </div>
  <div class="inner-container">
    <router-view/>
  </div>
</div>
</template>

<script>

import { getCookie, deleteCookie } from '../utils/cookies';
import jwt from 'jsonwebtoken'

export default {
  name: 'Account',
  data() {
    return {
      name: null
    }
  },
  mounted() {
    const token = getCookie("accessToken")
    if(token){
      this.name= jwt.decode(token).name
    }
  },
	methods: {
		logout: function() {
      deleteCookie('accessToken')
    },
	}
}

</script>

<style scoped src="../styles/accountstyle.css"></style>