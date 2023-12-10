<script>
// import axios from "axios"

export default {
  mounted() {
    this.params.dataType = this.$route.params.dataType
  },
  data() {
    return {
      filterType: [
        {
          name: "高斯滤波",
          value: "gaussian"
        },
        {
          name: "中值滤波",
          value: "median"
        },
        {
          name: "均值滤波",
          value: "mean"
        }
      ],
      kernelSize: 3
    }
  }
}
</script>

<template>
  <div class="option-line">
    <label for="filterType">滤波类型：</label>
    <select v-model="params.filterType" id="filterType">
      <option disabled value="">请选择</option>
      <option v-for="item in filterType" :key="item.value" :value="item.value">
        {{ item.name }}
      </option>
    </select>
  </div>
  <div class="option-line">
    <label for="kernelSize">核大小：</label>
    <input type="text" v-model="kernelSize" id="kernelSize" />
  </div>
</template>
