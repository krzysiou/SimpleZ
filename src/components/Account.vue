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
    <div v-if="isFiles" class="alert">
      <h1>Oops...</h1>
      <p>Seems like you don't have any files. <br>Hit the button on the left to start generating files!</p>
    </div>
    <div class="inner-container" v-for="file in files" v-bind:key="file.name" :id="file.id">
      <div class="name">
        <p class ="file-name">{{ file.name }}</p>
      </div>
      <div class="date">
        <p class="file-date">{{ file.date }}</p>
      </div>
      <div class="task-bar">
        <ul>
          <li>
            <button type="button" class="ghost" @click="downloadFile(file.id)">
              <p>Download</p>
            </button>
          </li>
          <li>
            <button type="button" class="ghost" @click="editFile(file.id)">
              <p>Edit</p>
            </button>
          </li>
          <li>
            <button type="button" class="ghost" @click="deleteFile(file.id)">
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
  computed: {
    isFiles: function() {
      return this.files.length <= 0;
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
    },
    deleteFile: async function(fileId) {
      const element = document.getElementById(fileId)
      element.style.display = 'none';
      try {
        await axios.post('http://localhost:3000/users/files/delete', {
          fileId: fileId
        }, 
        {
          headers: {
            'Authorization': `Bearer ${getCookie('accessToken')}` 
          }
        })
      } catch (error) {
          this.error = error.response.data.error
      }
    },
    editFile: async function(fileId) {
      const userId = window.location.href.split("/")[5]
      location.replace("http://localhost:8080/#/users/"+userId+"/files/edit/"+fileId)
    },
    downloadFile: function(fileId) {
      const userId = window.location.href.split("/")[5]
      location.replace("http://localhost:8080/#/users/"+userId+"/files/download/"+fileId)
    }
	}
}

</script>

<style scoped src="../styles/accountstyle.css"></style>