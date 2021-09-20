<template>
  <div id="line1L" class="topLine"></div>
  <div id="line2L" class="sideLine"></div>
  <div id="line3L" class="bottomLine"></div>
  <div class="login" id="main">
    <h1>Log In</h1>\
  </div>
</template>

<script>



export default {
  name: 'LogIn',
  data: function() {
    return {
      windowWidth: 0,
      windowHeight: 0,
    }
  },

   mounted() {
    this.$nextTick(function() {

      window.addEventListener('resize', this.calculateWindowSize);
      window.addEventListener('resize', this.resizeTopLine);
      window.addEventListener('resize', this.resizeBottomLine);
      //Init
      this.calculateWindowSize()
      this.resizeTopLine()
      this.resizeBottomLine()
    })

  },

  methods: {
    calculateWindowSize() {
      this.windowWidth = document.documentElement.clientWidth;
      this.windowHeight = document.documentElement.clientHeight;
    },

    resizeTopLine() {
      const desiredWidth = this.windowWidth/2 - 330;
      document.getElementById("line1L").style.width = desiredWidth+'px';
    },
    resizeBottomLine() {
      const desiredWidth = this.windowWidth/2 - 300;
      document.getElementById("line3L").style.width = desiredWidth+'px';
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.getWindowSize);
  }
}

</script>

<style scoped src="../styles/loginstyle.css"></style>
