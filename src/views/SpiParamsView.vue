<script>
import axios from "axios"
import get_progress from "../utils/progress.js"

export default {
  components: {},

  mounted() {
    this.params.dataType = this.$route.params.dataType
    axios.get(`http://127.0.0.1:8000/api/setup/get_meta/`).then((response) => {
      this.dataMeta = response.data.data_list.find((item) => {
        return item.data_type == this.params.dataType
      })
      this.lonList = Array.from(
        { length: this.dataMeta.lon_end / this.dataMeta.lon_step },
        (_, index) => index * 0.625
      )
      this.latList = Array.from(
        { length: this.dataMeta.lat_end / this.dataMeta.lat_step + 1 },
        (_, index) => index * 0.5
      )
    })
    this.clearProgress()
  },

  data() {
    return {
      dataMeta: {},
      params: {
        dataType: "",
        timeScale: 1,
        calibrationStart: "",
        calibrationEnd: "",
        errorIn: ""
      },
      Interval: null,
      progressList: [],
      progress: {
        description: "",
        percentage: null,
        status: "not started"
      },
      progressError: {
        description: "运行出错",
        percentage: null,
        status: "error"
      },
      isFinished: false,
      calibration: "default",
      lonList: [],
      latList: [],
      startLon: "",
      endLon: "",
      startLat: "",
      endLat: "",
      calcStart: "",
      calcEnd: ""
    }
  },
  methods: {
    submit() {
      this.clearProgress()
      this.progressList = []
      axios
        .post(`http://127.0.0.1:8000/api/calc_spi/`, {
          params: this.params
        })
        .then((response) => {
          console.log(response.data)
          if (response.data.success == false) {
            this.progress = this.progressError
            this.progressList.push(this.progress)
            clearInterval(this.Interval)
            this.clearProgress()
          }
        })
        .catch((error) => {
          this.progress = this.progressError
          this.progressList.push(this.progress)
          console.log(error)
          clearInterval(this.Interval)
          this.clearProgress()
        })
        .finally(() => {
          clearInterval(this.Interval)
          this.clearProgress()
        })
      this.Interval = setInterval(() => {
        const returnJson = get_progress(this.progressList, this.progress)
        this.progressList = returnJson.progressList
        this.progress = returnJson.progress
        this.progressStatus = returnJson.progressStatus
        if (this.isFinished) {
          clearInterval(this.Interval)
          this.clearProgress()
        }
      }, 100)
    },
    clearProgress() {
      axios.get(`http://127.0.0.1:8000/api/progress/clear_progress/`).then((response) => {
        console.log(response.data)
      })
    }
  }
}
</script>

<template>
  <div class="optionLine">
    <label for="calcStart">起始时间：</label>
    <input v-model="calcStart" type="date" id="calcStart" />
  </div>
  <div class="optionLine">
    <label for="calcEnd">结束时间：</label>
    <input v-model="calcEnd" type="date" id="calcEnd" />
  </div>
  <div class="optionLine">
    <label for="scale">尺度：</label>
    <input type="text" v-model="params.timeScale" id="scale" />
    <div v-show="dataMeta.periodicity != ''">{{ dataMeta.periodicity == "day" ? "日" : "月" }}</div>
  </div>
  <div class="optionLine">
    <div>计算区域：</div>
  </div>
  <div class="optionLine indentation-1 lonArea">
    <div>经度</div>
    <select v-model="startLon" id="startLon">
      <option disabled value="">起始</option>
      <option v-for="lon in lonList" :key="lon">{{ lon }}</option>
    </select>
    <div>-</div>
    <select v-model="endLon" id="endLon">
      <option disabled value="">结束</option>
      <option v-for="lon in lonList" :key="lon">{{ lon }}</option>
    </select>
  </div>
  <div class="optionLine indentation-1 latArea">
    <div>纬度</div>
    <select v-model="startLat" id="startLat">
      <option disabled value="">起始</option>
      <option v-for="lat in latList" :key="lat">{{ lat }}</option>
    </select>
    <div>-</div>
    <select v-model="endLat" id="endLat">
      <option disabled value="">结束</option>
      <option v-for="lat in latList" :key="lat">{{ lat }}</option>
    </select>
  </div>
  <div>
    <div class="optionLine">
      <div>校准数据：</div>
      <input type="radio" value="default" v-model="calibration" id="default" />
      <label for="default">默认</label>
      <input type="radio" value="custom" v-model="calibration" id="custom" />
      <label for="custom">自定义</label>
    </div>
    <div class="optionLine indentation-1">
      <div>起始时间：</div>
      <input
        v-if="calibration == 'custom'"
        v-model="params.calibrationStart"
        type="date"
        name="startTime"
        id="calibrationStart"
      />
      <div v-else id="calibrationStart">1980 年 01 月</div>
    </div>
    <div class="optionLine indentation-1">
      <div>结束时间：</div>
      <input
        v-if="calibration == 'custom'"
        v-model="params.calibrationEnd"
        type="date"
        name="endTime"
        id="calibrationEnd"
      />
      <div v-else id="calibrationStart">2022 年 12 月</div>
    </div>
  </div>

  <button
    class="actionButton"
    @click="submit"
    :disabled="progress.progressStatus == 'running'"
    id="comfirm"
  >
    确认
  </button>
  <div class="progress_list">
    <div v-for="item in progressList" :key="item.description">
      <div
        :class="item.status == 'completed' ? 'completed-status' : 'current-status'"
        v-show="item.status != 'not started'"
      >
        <div>{{ item.description }}</div>
        <div v-if="item.status == 'running'">{{ item.percentage }}</div>
      </div>
    </div>
    <RouterLink to="/filter" class="actionButton">图像滤波</RouterLink>
    <div class="nextStep" v-show="params.progressStatus == 'completed'">
      <RouterLink to="/" class="actionButton">下一步</RouterLink>
    </div>
  </div>
</template>
