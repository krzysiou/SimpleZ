<template>
  <div class="container">
    <div class="navbar">
      <button type="button">
        <img src="../assets/add.svg" alt="add">
      </button>
      <button type="button">
        <img src="../assets/profile.svg" alt="profile">
      </button>
      <button type="button">
        <img src="../assets/logout.svg" alt="logout" @click="logout()">
      </button>
    </div>
    <div class="inner-container">

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
      location.replace("http://localhost:8080/#/manage")
      deleteCookie('accessToken')
    }
	}
}

</script>

<style scoped src="../styles/accountstyle.css"></style>