<script>
import axios from 'axios'

export default {
  methods: {
    submit() {
      this.progressStatus = 'running'
      axios
        .post(`http://127.0.0.1:8000/api/choose_data/${this.$data.dataType}/`, {})
        .then((response) => {
          if (response.data.success == false) {
            this.progressStatus = 'error'
            return
          }
          console.log(response.data)
          this.progressStatus = 'completed'
        })
        .catch((error) => {
          console.log(error)
          this.progressStatus = 'error'
        })
    }
  },
  data() {
    return {
      dataType: '',
      loading: false,
      Interval: null,
      progressStatus: 'not started'
    }
  }
}
</script>

<template>
  <div class="optionLine">
    <label for="dataType">选择数据：</label>
    <select v-model="dataType" id="dataType" class="selectEntry">
      <option disabled value="">请选择数据</option>
      <option>MERRA2</option>
      <option>TRMM</option>
    </select>
  </div>

  <button class="actionButton" @click="submit" :disabled="progressStatus == 'running'" id="comfirm">
    确认
  </button>
  <div class="progress_list">
    <div
      :class="
        progressStatus == 'completed'
          ? 'completed-status'
          : progressStatus == 'error'
            ? 'error-status'
            : 'current-status'
      "
      v-show="progressStatus != 'not started'"
    >
      <div v-if="progressStatus == 'running'">运行中……</div>
      <div v-else-if="progressStatus == 'completed'">运行完成</div>
      <div v-else-if="progressStatus == 'error'">运行出错</div>
    </div>
    <div class="nextStep" v-show="progressStatus == 'completed'">
      <RouterLink to="/spi" class="actionButton">下一步</RouterLink>
    </div>
  </div>
</template>

<style scoped style="scss"></style>
