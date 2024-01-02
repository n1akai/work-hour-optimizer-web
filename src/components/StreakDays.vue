<template>
  <div class="streak-days">
    <h2>Days:</h2>
    <ul id="days">
      <li>1</li>
    </ul>
    <hr>
    <ul class="info">
      <li><span id="green"></span> Green - Done</li>
      <li><span id="red"></span> Red - Not done</li>
      <li><span id="white"></span> White - Absent</li>
    </ul>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>
.streak-days {
  flex-basis: 20%;
  padding: 30px;
  box-shadow: 1px 0 2px rgb(0 0 0 / 50%);
}

.streak-days input {
  margin: auto;
  display: block;
  font-family: inherit;
}

input[type="month"]::-webkit-datetime-edit {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}

ul#days {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 10px;
}

ul#days li {
  border: 1px solid #222222;
  border-radius: 6px;
  padding: 2px;
  margin: 5px 3px;
  width: calc(100%/6 - 6px);
  text-align: center;
  background-color: #fff;
}

ul.info {
  padding: 20px 10px;
}

li span {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  box-shadow: 0 1px 2px 1px rgb(0 0 0 / 50%);
}

span#green {
  background-color: green;
}

span#red {
  background-color: red;
}

span#white {
  background-color: #fff;
}
</style>