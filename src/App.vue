<template>
  <div id="app">
    <Header/>
    <div class="content">     
      <router-view></router-view>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: -0px !important;
}
h2, body {
  margin: 0;
}
.content {
  position: relative;
  text-align: center;
  margin: auto;
  width: 65%;
  padding: 10px;
}
.header {
  position: relative;
  min-height: 100px;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding-top: 20px;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  min-height: 50px;
  padding-top: 20px;
}
.styled-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}
.styled-table th,
.styled-table td {
  padding: 12px 15px 8px;
}
.styled-table th {
  cursor: pointer;
}
.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}
.pgnr {
  margin-top: 100px;
}
.table-controls {
  position: relative;
  min-height: 50px;
}
</style>
