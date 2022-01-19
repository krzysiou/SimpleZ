<template>
 <div class="main-body">
   <div class="header">
     <div class="credits">
       <ul>
         <li>Nazwisko: {{ surname }}</li>
         <li>Imię: {{ name }}</li>
         <li>Nr Albumu: {{ index }}</li>
         <li>Kierunek Studiów: {{ field }}</li>
         <li>Studia stopnia: {{ level }}</li>
         <li><a href="#">e-mail: {{ email }}</a></li>
       </ul>
     </div>
     <div class="date">
       <p>Kraków, dnia {{ date }}</p>
     </div>
   </div>
   <div class="main">
     <div class="dean-signature">
       <h4>Prodziekan ds. studenckich<br>dr inż. John Doe</h4>
     </div>
     <div class="message">
       <p>Proszę o wpisanie mnie na <b>{{ term }}</b> semestr studiów w roku akademickim <b>{{ year }}</b> oraz zatwierdzenie poniszego semestralnego planu zajęć.</p>
     </div>
   </div>
   <div class="header">
     <h3>Semestralny plan zajęć</h3>
  </div>

   <div class="tab">
     <table>
       <tr>
        <th colspan="3" class="tab-header"><b>Przedmioty obowiązkowe</b></th>
      </tr>
      <tr>
        <th class="lesser">Przedmiot</th>
        <th class="lesser">Liczba W/C/L/P/S</th>
        <th class="lesser">ECTS</th>
      </tr>
      <tr v-for="x in mainListLimit" v-bind:key="x">
        <td class="left" :id="'userMainSubjectName'+x"></td>
        <td class="mid" :id="'wclpsMain'+x"></td>
        <td class="right" :id="'ectsMain'+x"></td>
      </tr>
    </table>
   </div>

   <div class="tab">
     <table>
       <tr>
        <th colspan="4" class="tab-header"><b>Przedmioty obieralne</b></th>
      </tr>
      <tr>
        <th class="lesser">Przedmiot</th>
        <th class="lesser">Liczba W/C/L/P/S</th>
        <th class="lesser">ECTS</th>
        <th class="lesser">Wydział, na którym<br>prowadzony jest<br>przedmiot</th>
      </tr>
      <tr v-for="x in sideListLimit" v-bind:key="x" :id="'side'+x">
        <td class="left-additional" :id="'userSideSubjectName'+x"></td>
        <td class="mid-additional" :id="'wclpsSide'+x"></td>
        <td class="right-additional" :id="'ectsSide'+x"></td>
        <td class="faculty" :id="'faculty'+x"></td>
      </tr>
    </table>
   </div>

   <div class="sum">
     <p>Razem ECTS {{ sumEcts }}<br>Łączna liczba godzin zajęć {{ sumHours }}</p>
    </div>
   <div class="footer">
     <p>{{ name }} {{ surname }}</p>
   </div>
 </div>
</template>
  
<script>

const axios = require('axios')
const { getCookie } = require('../utils/cookies')

export default {
  name: 'DownloadFile',
  data() {
    return {
      error: null,
      active: true,
      mainNumber: null,
      mainList: [1,2,3,4,5,6,7,8,9,10],
      sideNumber: null,
      sideList: [1,2,3,4,5,6,7,8,9,10],

      surname: null,
      name: null,
      index: null,
      field: null,
      level: null,
      email: null,
      date: null,

      sumEcts: null,
      sumHours: null
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
      this.name = response.data.file.info.name
      this.surname = response.data.file.info.surname
      this.index = response.data.file.info.albumNumber
      this.field = response.data.file.info.field
      this.email = response.data.file.info.email
      this.level = response.data.file.info.level
      this.term = response.data.file.info.term
      this.year = response.data.file.info.year
      this.date = response.data.file.date

      this.sumEcts = response.data.file.sumEcts
      this.sumHours = response.data.file.sumHours
    
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
        document.getElementById("userMainSubjectName"+(i+1)).innerHTML = response.data.file.mainSubjects[i].name
        document.getElementById("wclpsMain"+(i+1)).innerHTML = response.data.file.mainSubjects[i].wclps
        document.getElementById("ectsMain"+(i+1)).innerHTML = response.data.file.mainSubjects[i].ects
      }
      for(let i = 0; i < parseInt(response.data.file.info.numberSide); i++){
        document.getElementById("userSideSubjectName"+(i+1)).innerHTML = response.data.file.sideSubjects[i].name
        document.getElementById("wclpsSide"+(i+1)).innerHTML = response.data.file.sideSubjects[i].wclps
        document.getElementById("ectsSide"+(i+1)).innerHTML = response.data.file.sideSubjects[i].ects
        document.getElementById("faculty"+(i+1)).innerHTML = response.data.file.sideSubjects[i].faculty
      }

      setTimeout(() => {window.print();}, 200);

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
}

</script>

<style scoped src="../styles/downloadfilestyle.css"></style>