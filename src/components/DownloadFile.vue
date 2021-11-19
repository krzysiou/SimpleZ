<template>
 <div class="main-body">
   <div class="header">
     <div class="credits">
       <ul>
         <li>Nazwisko: {{ surname }}</li>
         <li>Imię: {{ name }}</li>
         <li>Nr Albumu: {{ index }}</li>
         <li>Kierunek Studiów: {{ faculty }}</li>
         <li>Studia stopnia: {{ degree }}</li>
         <li>e-mail: {{ email }}</li>
       </ul>
     </div>
     <div class="date">
       <p>Kraków, dnia {{ date }}</p>
     </div>
   </div>
   <div class="main">
     <div class="dean-signature">
       <h4>Prodziekan ds. studenckich<br>dr inż. Katarzyna MATUSIAK</h4>
     </div>
     <div class="message">
       <p>Proszę o wpisanie mnie na <b>{{ term }}</b> semestr studiów w roku akademickim <b>{{ term }}</b> oraz zatwierdzenie poniszego semestralnego planu zajęć.</p>
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
      <tr>
        <td class="left">Matematyka 3</td>
        <td class="mid">30/30/0/0/0</td>
        <td class="right">5</td>
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
      <tr>
        <td class="left-additional">Wstęp do Microsoft PowerShell i usługi Microsoft Active Directory</td>
        <td class="mid-additional">15/0/30/0/0</td>
        <td class="right-additional">4</td>
        <td class="faculty">Wydział Fizyki i Informatyki Stosowanej</td>
      </tr>
    </table>
   </div>

   <div class="sum">
     <p>Razem ECTS {{ ects }}<br>Łączna liczba godzin zajęć {{ hours }}</p>
    </div>
   <div class="footer">
     <p>{{ name }} {{ surname }}</p>
   </div>
 </div>
</template>
  
<script>
export default {
  name: 'DownloadFile',
  mounted() {
    //window.print();
  }
}
</script>

<style scoped src="../styles/downloadfilestyle.css"></style>