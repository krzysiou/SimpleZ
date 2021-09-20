<template>
  <div id="line1R" class="topLine"></div>
  <div id="line2R" class="sideLine"></div>
  <div id="line3R" class="bottomLine"></div>
  <div class="register" id="main">
    <h1>Register</h1>\
  </div>
</template>

<script>
export default {
  name: 'Register',
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
      document.getElementById("line1R").style.width = desiredWidth+'px';
    },
    resizeBottomLine() {
      const desiredWidth = this.windowWidth/2 - 300;
      document.getElementById("line3R").style.width = desiredWidth+'px';
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.getWindowSize);
  }
}
</script>

<style scoped src="../styles/registerstyle.css"></style>
