<template>
  <div class="container">
    <div class="navbar">
      <button type="button" @click="createFile()">
        <p>Create File</p>
      </button>
      <button type="button" @click="logout()">
        <p>Log out</p>
      </button>
    </div>
    <div class="inner-container" v-for="file in files" v-bind:key="file.name">
      <div class="name">
        <p class ="file-name">{{ file.name }}</p>
      </div>
      <div class="date">
        <p class="file-date">{{ file.date }}</p>
      </div>
      <div class="task-bar">
        <ul>
          <li>
            <button type="button" class="ghost">
              <p>Download</p>
            </button>
          </li>
          <li>
            <button type="button" class="ghost">
              <p>Edit</p>
            </button>
          </li>
          <li>
            <button type="button" class="ghost">
              <p>Delete</p>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import { deleteCookie, getCookie } from '../utils/cookies';
const axios = require('axios')

export default {
  name: 'Account',
  data() {
    return {
      error: null,
      files: []
    }
  },
  async mounted() {
    try {
      const response = await axios.post('http://localhost:3000/users/files', {}, {
        headers: {
          'Authorization': `Basic ${getCookie('accessToken')}` 
        }
      })
      this.files = response.data.files
    } catch (error) {
        this.error = error.response.data.error
    }
  },
	methods: {
		logout: function() {
      location.replace("http://localhost:8080/#/manage")
      deleteCookie('accessToken')
    },
    createFile: function() {
      const id = window.location.href.split("/")[5]
      location.replace("http://localhost:8080/#/users/"+id+"/files/create")
    }
	}
}

</script>

<style scoped src="../styles/accountstyle.css"></style>