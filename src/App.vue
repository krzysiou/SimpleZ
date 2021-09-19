<template>
  <div id="nav">
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-link to="/helloworld">Cick me</router-link>
  </div>
  <router-view/>
</template>

<style src="./styles/AppStyle.css"></style>
