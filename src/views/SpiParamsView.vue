<script>
import axios from 'axios'

export default {
  components: {},

  data() {
    return {
      periodicity: '',
      timeScale: 1,
      calibrationStart: '',
      calibrationEnd: '',
      progressStatus: 'not started'
    }
  },
  methods: {
    submit() {
      this.progressStatus = 'running'
      console.log({
        periodicity: this.periodicity,
        timeScale: this.timeScale,
        calibrationStart: this.calibrationStart,
        calibrationEnd: this.calibrationEnd
      })
      axios
        .post(`http://127.0.0.1:8000/api/calc_spi/`, {
          periodicity: this.periodicity,
          timeScale: this.timeScale,
          calibrationStart: this.calibrationStart,
          calibrationEnd: this.calibrationEnd
        })
        .then((response) => {
          if (response.data.success == false) {
            this.progressStatus = 'error'
            console.log(response.data)
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
  }
}
</script>

<template>
  <div class="optionLine">
    <label for="time">数据单位：</label>
    <input type="radio" value="day" name="time" id="time" v-model="periodicity" />日
    <input type="radio" value="month" name="time" id="time" v-model="periodicity" />月
  </div>
  <div class="optionLine">
    <label for="scale">尺度：</label>
    <input type="text" v-model="timeScale" id="scale" />
    <div v-show="periodicity != ''">{{ periodicity == 'day' ? '日' : '月' }}</div>
  </div>
  <div>
    <div class="optionLine">
      <label for="startTime">校准数据：</label>
    </div>

    <div class="optionLine indentation-1">
      <label for="startTime">起始时间：</label>
      <input v-model="calibrationStart" type="date" name="startTime" id="startTime" />
    </div>
    <div class="optionLine indentation-1">
      <label for="endTime">结束时间：</label>
      <input v-model="calibrationEnd" type="date" name="endTime" id="endTime" />
    </div>
  </div>
  <button class="actionButton" @click="submit" :disabled="progressStatus == 'running'" id="comfirm">
    确认
  </button>
  <div class="progress_list">
    <div
      :class="progressStatus == 'completed' ? 'completed-status' : 'current-status'"
      v-show="progressStatus != 'not started'"
    >
      <div v-if="progressStatus == 'running'">运行中……</div>
      <div v-else-if="progressStatus == 'completed'">运行完成</div>
    </div>
    <div class="nextStep" v-show="progressStatus == 'completed'">
      <RouterLink to="/spi" class="actionButton">下一步</RouterLink>
    </div>
  </div>
</template>
