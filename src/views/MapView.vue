<script>
import axios from "axios"

export default {
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
    }
  }
}
</script>

<template>
  <img :src="imageSrc" />
  <input type="range" id="time" v-model="params.timeIndex" min="0" max="516" @change="get_img()" />
  <label for="time">时间</label>
</template>
