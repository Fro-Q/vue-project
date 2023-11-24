<script>
// import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios'

export default {
  components: {},

  methods: {
    submit() {
      axios
        .post(`http://127.0.0.1:8000/api/upload_file/${this.$data.dataType}/`, {})
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  data() {
    return {
      dataType: ''
    }
  }
}
</script>

<template>
  <div class="option">
    <label for="dataType">选择数据</label>
    <select v-model="dataType" id="dataType">
      <option disabled value="">请选择数据</option>
      <option>MERRA2</option>
      <option>TRMM</option>
    </select>
  </div>
  <button @click="submit">确认</button>

  <RouterLink to="/spi">Next</RouterLink>
</template>

<style scoped>
input {
  margin: 0 0 1rem;
  padding: 0.5rem;
  border: 1px solid #eee;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}
</style>
