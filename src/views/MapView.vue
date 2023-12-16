<script>
import axios from "axios"
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
    })
  },
  data() {
    return {
      dataInfo: {},
      params: {
        dataType: "",
        timeScale: 1,
        timeIndex: 0,
        filterMethod: "",
        kernelSize: 3,
        errorIn: ""
      },
      imageSrc: ""
    }
  },
  methods: {
    get_img() {
      // 从 SpiParamsView.vue 中获取参数

      axios
        .post(`http://127.0.0.1:8000/api/img/`, {
          params: this.params
        })
        .then((response) => {
          console.log(response)
          this.imageSrc = "data:image/png;base64," + response.data.image
        })
        .catch((error) => {
          console.error("Error generating image:", error)
        })
    },
    updateImage() {
      this.get_img()
    }
  }
}
</script>

<template>
  <div class="img-filter-panel option-panel">
    <div class="option-line">
      <CustomOption
        v-model="params.filterMethod"
        option-label="滤波方法"
        option-description="选择滤波方法"
        :options="['None', 'Mean', 'Median', 'Gaussian']"
        type="select"
        id="filterMethod"
        placeholder="选择滤波方法"
      ></CustomOption>
    </div>
    <div class="option-line">
      <CustomOption
        v-model="params.kernelSize"
        option-label="核大小"
        option-description="选择核大小"
        :options="[3, 5, 7, 9, 11, 13, 15]"
        type="select"
        id="kernelSize"
        placeholder="选择核大小"
      ></CustomOption>
    </div>
    <button class="actionButton" @click="updateImage" id="comfirm">确认</button>
  </div>

  <img :src="imageSrc" />
  <input type="range" id="time" v-model="params.timeIndex" min="0" :max="996" @change="get_img" />
  <label for="time">时间</label>
</template>
