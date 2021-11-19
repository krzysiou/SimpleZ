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
            <input class="inner-input-high" type="text" placeholder="subject name" :id="'userMainSubjectName'+x"/>
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
      <button type="button" class="button" @click="submit()">Submit</button>
    </div>

</template>

<script>

const axios = require('axios')
const { uuid } = require('uuidv4');
const { getCookie } = require('../utils/cookies')

export default {
  name: 'CreateFile',
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
      const id = window.location.href.split("/")[5]
      const tempMain = [];
      const tempSide = [];
      const numberMain = document.getElementById("numberMain").value
      const numberSide = document.getElementById("numberSide").value

      const today = new Date();
      const date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();

      let ectsSum = 0
      let hoursSum = 0

      for(let i = 0; i < parseInt(document.getElementById("numberMain").value); i++){
        if(parseInt(document.getElementById("ectsMain"+(i+1)).value) <= 15 || parseInt(document.getElementById("ectsMain"+(i+1)).value) >= 0){
          ectsSum += parseInt(document.getElementById("ectsMain"+(i+1)).value)
        }
        let temp = document.getElementById("wclpsMain"+(i+1)).value.split(/[/, ]/)
        if(temp.length === 5 || temp.length === 2){
          if(temp.length === 5){
            for(let i=0; i < temp.length; i++){
              hoursSum += parseInt(temp[i])
            }
          } else {
            hoursSum += parseInt(temp[1])
          }
        }
        const subjectMain = {
          name: document.getElementById("userMainSubjectName"+(i+1)).value,
          wclps: document.getElementById("wclpsMain"+(i+1)).value,
          ects: document.getElementById("ectsMain"+(i+1)).value
        }
        tempMain.push(subjectMain);
      }

      for(let i = 0; i < parseInt(document.getElementById("numberSide").value); i++){
        if(parseInt(document.getElementById("ectsSide"+(i+1)).value) <= 15 || parseInt(document.getElementById("ectsSide"+(i+1)).value) >= 0){
          ectsSum += parseInt(document.getElementById("ectsSide"+(i+1)).value)
        }
        let temp = document.getElementById("wclpsSide"+(i+1)).value.split(/[/, ]/)
        if(temp.length === 5 || temp.length === 2){
          if(temp.length === 5){
            for(let i=0; i < temp.length; i++){
              hoursSum += parseInt(temp[i])
            }
          } else {
            hoursSum += parseInt(temp[1])
          }
        }

        const subjectSide = {
          name: document.getElementById("userSideSubjectName"+(i+1)).value,
          wclps: document.getElementById("wclpsSide"+(i+1)).value,
          ects: document.getElementById("ectsSide"+(i+1)).value,
          faculty: document.getElementById("faculty"+(i+1)).value
        }

        tempSide.push(subjectSide);
      }

      const file = {
        id: uuid(),
        name: document.getElementById("fileName").value,
        date: date,
        sumEcts: String(ectsSum),
        sumHours: String(hoursSum),
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
        await axios.post('http://localhost:3000/users/files/create', {
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

<style scoped src="../styles/createfilestyle.css"></style>