<script>
import axios from "axios"

export default {
  mounted() {
    this.params.dataType = this.$route.params.dataType
    axios.get(`http://127.0.0.1:8000/api/setup/get_meta/`).then((response) => {
      this.dataMeta = response.data.data_list.find((item) => {
        return item.data_type == this.params.dataType
      })
    })
    const container = document.getElementById("zoomContainer")
    const zoomableContent = document.getElementById("zoomable")
    let scale = 1 // 初始缩放比例

    container.addEventListener("wheel", (event) => {
      event.preventDefault() // 阻止默认滚动行为

      // 计算鼠标在容器内的相对位置
      const mouseX = event.clientX - container.getBoundingClientRect().left
      const mouseY = event.clientY - container.getBoundingClientRect().top

      // 根据滚轮方向调整缩放比例
      scale += event.deltaY * -0.01

      // 限制缩放范围
      scale = Math.min(Math.max(0.5, scale), 3)

      // 计算缩放中心的偏移量
      const offsetX = (mouseX - container.offsetWidth / 2) * (1 - scale)
      const offsetY = (mouseY - container.offsetHeight / 2) * (1 - scale)

      // 应用缩放和偏移
      zoomableContent.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`
    })
  },
  data() {
    return {
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
  <div class="mapBox" id="zoomContainer">
    <img :src="imageSrc" id="zoomable" />
  </div>
  <input
    type="range"
    id="time"
    v-model="params.timeIndex"
    min="0"
    max="516"
    @change="get_img()"
    oninput="get_img()"
  />
  <label for="time">时间</label>
</template>
