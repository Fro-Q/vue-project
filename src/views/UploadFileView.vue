<script>
import axios from 'axios'

export default {
  methods: {
    submit() {
      this.loading = true
      axios
        .post(`http://127.0.0.1:8000/api/choose_data/${this.$data.dataType}/`, {})
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.loading = false
          /* 在 2s 后清除定时器 */
          setTimeout(() => {
            clearInterval(this.Interval)
          }, 2000)
        })
      this.Interval = setInterval(() => {
        axios.get(`http://127.0.0.1:8000/api/progress/`).then((response) => {
          if (response.data.progress_status != 'completed') {
            this.progressStatus = '运行中……'
          } else {
            this.progressStatus = '运行完成'
          }
        })
      }, 100)
    }
  },
  data() {
    return {
      dataType: '',
      loading: false,
      Interval: null,
      progressStatus: ''
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

  <button @click="submit" :disabled="loading">确认</button>
  <div class="progress_list">
    <div :class="progressStatus == '运行完成' ? 'completed-status' : 'current-status'">
      {{ progressStatus }}
    </div>
    <div class="nextStep" v-show="progressStatus == '运行完成'">
      <RouterLink to="/spi">下一步</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.progress_list {
  position: absolute;
  left: 10px;
  right: 10px;
  height: 100px;
  bottom: 20px;
  overflow-y: scroll;
  border-top: 2px solid hsla(160, 100%, 37%, 1);
  padding: 10px;
}

.current-status {
  color: grey;
}

.completed-status {
  color: green;
}
</style>
