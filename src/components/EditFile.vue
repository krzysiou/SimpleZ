<template>
  <h5>{{ error }}</h5>
    <div class="main-info inner-container">
      <form>
        <p>Info</p>
        <input type="text" class="inner-input-top" placeholder="name your file" id="fileName">
        <ul>
          <li>
            <input type="text" placeholder="name" id="userName"/>
            <input type="text" placeholder="surname" id="userSurname"/>
          </li>
          <li>
            <input type="text" placeholder="album number" id="userAlbumNumber"/>
            <input type="text" placeholder="field of study" id="userFOS"/>
          </li>
          <li>
            <input type="text" placeholder="email" id="userEmail"/>
            <input type="text" placeholder="level" id="userLevel"/>
          </li>
          <li>
            <input type="text" placeholder="term" id="userTerm"/>
            <input type="text" placeholder="year" id="userYear"/>
          </li>
        </ul>
      </form>
    </div>

    <div class="main-subjects inner-container">
      <form>
        <p>Main Subjects</p>
        <input v-model="mainNumber" class="inner-input" type="text" placeholder="number of main subjects" id="numberMain">
        <ul class="lower">
          <li v-for="x in mainListLimit" v-bind:key="x">
            <input class="inner-input-high" type="text" placeholder="subject name" :id="'userMainSubjectName'+x">
            <input class="inner-input-high" type="text" placeholder="W/C/L/P/S" :id="'wclpsMain'+x"/>
            <input class="inner-input-high" type="text" placeholder="ects" :id="'ectsMain'+x"/>
          </li>
        </ul>
      </form>
    </div>

    <div class="side-subjects inner-container">
      <form>
        <p class="low-text">Side Subjects</p>
        <input v-model="sideNumber" class="inner-input" type="text" placeholder="number of side subjects" id="numberSide">
        <ul class="lower">
          <li v-for="x in sideListLimit" v-bind:key="x" :id="'side'+x">
            <input class="inner-input-low" type="text" placeholder="subject name" :id="'userSideSubjectName'+x"/>
            <input class="inner-input-low" type="text" placeholder="W/C/L/P/S" :id="'wclpsSide'+x"/>
            <input class="inner-input-low" type="text" placeholder="ects" :id="'ectsSide'+x"/>
            <input class="inner-input-low" type="text" placeholder="faculty" :id="'faculty'+x"/>
          </li>
        </ul>
      </form>
    </div>
    <div class="buttons">
      <button type="button" class="button" @click="returnToAccount()">Return</button>
      <button type="button" class="button" @click="submit()">Update</button>
    </div>
</template>

<script>

const axios = require('axios')
const { uuid } = require('uuidv4');
const { getCookie } = require('../utils/cookies')

export default {
  name: 'EditFile',
  data() {
    return {
      error: null,
      active: true,
      mainNumber: null,
      mainList: [1,2,3,4,5,6,7,8,9,10],
      sideNumber: null,
      sideList: [1,2,3,4,5,6,7,8,9,10],
    }
  },
  async created(){
    try{
      const fileId = window.location.href.split("/")[8]
      const response = await axios.post('http://localhost:3000/users/files/load', {
        fileId: fileId
      }, {
        headers: {
          'Authorization': `Bearer ${getCookie('accessToken')}` 
        }
      })
      document.getElementById("fileName").value = response.data.file.name
      document.getElementById("userName").value = response.data.file.info.name
      document.getElementById("userSurname").value = response.data.file.info.surname
      document.getElementById("userAlbumNumber").value = response.data.file.info.albumNumber
      document.getElementById("userFOS").value = response.data.file.info.field
      document.getElementById("userEmail").value = response.data.file.info.email
      document.getElementById("userLevel").value = response.data.file.info.level
      document.getElementById("userTerm").value = response.data.file.info.term
      document.getElementById("userYear").value = response.data.file.info.year
    
      this.mainNumber = response.data.file.info.numberMain
      this.sideNumber = response.data.file.info.numberSide

    } catch(error) {
      this.error = error.response.data.error
    }
  },
  async mounted() {
    try{
      const fileId = window.location.href.split("/")[8]
      const response = await axios.post('http://localhost:3000/users/files/load', {
        fileId: fileId
      }, {
        headers: {
          'Authorization': `Bearer ${getCookie('accessToken')}` 
        }
      })
     for(let i = 0; i < parseInt(response.data.file.info.numberMain); i++){
        document.getElementById("userMainSubjectName"+(i+1)).value = response.data.file.mainSubjects[i].name
        document.getElementById("wclpsMain"+(i+1)).value = response.data.file.mainSubjects[i].wclps
        document.getElementById("ectsMain"+(i+1)).value = response.data.file.mainSubjects[i].ects
      }
      for(let i = 0; i < parseInt(response.data.file.info.numberSide); i++){
        document.getElementById("userSideSubjectName"+(i+1)).value = response.data.file.sideSubjects[i].name
        document.getElementById("wclpsSide"+(i+1)).value = response.data.file.sideSubjects[i].wclps
        document.getElementById("ectsSide"+(i+1)).value = response.data.file.sideSubjects[i].ects
        document.getElementById("faculty"+(i+1)).value = response.data.file.sideSubjects[i].faculty
      }
    } catch(error) {
      this.error = error.response.data.error
    }
  },
  computed: {
    mainListLimit(){
      return this.mainList.slice(0,this.mainNumber)
    },
    sideListLimit(){
      return this.mainList.slice(0,this.sideNumber)
    }
  },
  methods: {
    returnToAccount() {
      const id = window.location.href.split("/")[5]
      window.location.replace("http://localhost:8080/#/users/"+id)
    },
    async submit() {
      const fileId = window.location.href.split("/")[8]
      const id = window.location.href.split("/")[5]
      const tempMain = [];
      const tempSide = [];
      const numberMain = document.getElementById("numberMain").value
      const numberSide = document.getElementById("numberSide").value

      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

      for(let i = 0; i < parseInt(document.getElementById("numberMain").value); i++){
        const subjectMain = {
          name: document.getElementById("userMainSubjectName"+(i+1)).value,
          wclps: document.getElementById("wclpsMain"+(i+1)).value,
          ects: document.getElementById("ectsMain"+(i+1)).value
        }
        tempMain.push(subjectMain);
      }

      for(let i = 0; i < parseInt(document.getElementById("numberSide").value); i++){
        const subjectSide = {
          name: document.getElementById("userSideSubjectName"+(i+1)).value,
          wclps: document.getElementById("wclpsSide"+(i+1)).value,
          ects: document.getElementById("ectsSide"+(i+1)).value,
          faculty: document.getElementById("faculty"+(i+1)).value
        }

        tempSide.push(subjectSide);
      }

      const file = {
        id: fileId,
        name: document.getElementById("fileName").value,
        date: date,
        info: {
          name: document.getElementById("userName").value,
          surname: document.getElementById("userSurname").value,
          albumNumber: document.getElementById("userAlbumNumber").value,
          field: document.getElementById("userFOS").value,
          email: document.getElementById("userEmail").value,
          level: document.getElementById("userLevel").value,
          term: document.getElementById("userTerm").value,
          year: document.getElementById("userYear").value,
          numberMain: numberMain,
          numberSide: numberSide
        },
        mainSubjects: tempMain,
        sideSubjects: tempSide
      }

      if(numberMain === ""){
        file.info.numberMain = "0";
      }
      if(numberSide === ""){
        file.info.numberSide = "0";
      }

      try {
        const response = await axios.patch('http://localhost:3000/users/files/edit', {
          file: file
        }, {
          headers: {
            'Authorization': `Bearer ${getCookie('accessToken')}` 
          }
        })
        window.location.replace("http://localhost:8080/#/users/"+id)
      } catch (error) {
          this.error = error.response.data.error
      }
    }
  }
}

</script>

<style scoped src="../styles/editfilestyle.css"></style>