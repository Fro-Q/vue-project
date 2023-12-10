<script>
import axios from "axios"
import get_progress from "../utils/progress.js"
import CustomOption from "../components/CustomOption.vue"

export default {
  components: {
    CustomOption
  },

  mounted() {
    this.params.dataType = this.$route.params.dataType
    axios.get(`http://127.0.0.1:8000/api/setup/get_info/`).then((response) => {
      this.dataInfo = response.data.data_info_list.find((item) => {
        return item.data_type == this.params.dataType
      })
      this.lonList = Array.from(
        { length: this.dataInfo.lon_end / this.dataInfo.lon_step },
        (_, index) => index * 0.625
      )
      this.latList = Array.from(
        { length: this.dataInfo.lat_end / this.dataInfo.lat_step + 1 },
        (_, index) => index * 0.5
      )
    })
    this.clearProgressCache()
  },

  data() {
    return {
      dataInfo: {},
      params: {
        dataType: "",
        timeScale: "",
        distribution: "",
        calcTimeStart: "",
        calcTimeEnd: "",
        errorIn: ""
      },
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
      Interval: null
    }
  },
  methods: {
    submit() {
      console.log(this.params.calcTimeStart)
      axios
        .post(`http://127.0.0.1:8000/api/calc_spi/`, {
          params: this.params
        })
        .then((response) => {
          console.log(response.data)
          if (response.data.success == false) {
            this.dealError()
          }
        })
        .catch((error) => {
          console.error(error)
          this.dealError()
        })
        .finally(() => {
          clearInterval(this.Interval)
          this.clearProgressCache()
        })
      this.Interval = setInterval(() => {
        const returnJson = get_progress(this.progressList)
        this.progressList = returnJson.progressList
        this.progress = returnJson.progress
        if (this.isFinished) {
          clearInterval(this.Interval)
          this.clearProgressCache()
        }
      }, 100)
    },
    clearProgressCache() {
      axios.get(`http://127.0.0.1:8000/api/progress/clear_progress/`).then((response) => {
        console.log(response.data)
      })
    },
    dealError() {
      this.progress = this.progressError
      this.progressList.push(this.progress)
      clearInterval(this.Interval)
      this.clearProgressCache()
    }
  }
}
</script>

<template>
  <div class="option-panel">
    <div class="option-line">
      <CustomOption
        id="calcTimeStart"
        v-model="params.calcTimeStart"
        optionLabel="起始时间"
        optionDescription="选择需要计算的起始时间"
        type="month"
        :max="params.calcTimeEnd == '' ? dataInfo.time_end : params.calcTimeEnd"
        :min="dataInfo.time_start"
      >
      </CustomOption>
    </div>
    <div class="option-line">
      <CustomOption
        id="calcTimeEnd"
        v-model="params.calcTimeEnd"
        optionLabel="结束时间"
        optionDescription="选择需要计算的结束时间"
        type="month"
        :max="dataInfo.time_end"
        :min="params.calcTimeStart == '' ? dataInfo.time_start : params.calcTimeStart"
      >
      </CustomOption>
    </div>
    <div class="option-line">
      <CustomOption
        id="timeScale"
        v-model.number="params.timeScale"
        optionLabel="时间尺度"
        optionDescription="选择需要计算的时间尺度"
        type="select"
        :options="dataInfo.supported_time_scale"
        placeholder="请选择时间尺度"
      >
        <template #suffix>
          <div>{{ dataInfo.periodicity == "monthly" ? "月" : "日" }}</div>
        </template>
      </CustomOption>
    </div>
    <div class="option-line">
      <CustomOption
        id="distribution"
        v-model="params.distribution"
        optionLabel="分布类型"
        optionDescription="选择分布类型"
        type="select"
        :options="dataInfo.supported_distribution"
        placeholder="请选择分布类型"
      >
      </CustomOption>
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
      <div class="nextStep" v-show="params.progressStatus == 'completed'">
        <RouterLink to="/" class="actionButton">下一步</RouterLink>
      </div>
    </div>
  </div>
</template>
