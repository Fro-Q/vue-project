<script>
import axios from "axios"

export default {
  mounted() {
    axios.get(`http://127.0.0.1:8000/api/setup/get_meta/`).then((response) => {
      this.dataList = response.data.data_list
    })
  },
  data() {
    return {
      dataList: {}
    }
  }
}
</script>

<template>
  <div>
    <h2>Instruction</h2>
    <div class="dataRouterList">
      <RouterLink
        v-for="item in dataList"
        :key="item.data_type"
        :to="`/spi_params/${item.data_type}`"
      >
        {{ item.data_type }}
      </RouterLink>
    </div>
  </div>
</template>
