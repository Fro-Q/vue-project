<script>
// import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';


export default {
  components: {
  },

  methods: {
    generateRandomId() {
      const random_id = uuidv4();
      this.$data.random_id = random_id;
    },
    submitPath() {
      const path = this.$data.path;
      console.log('Random ID in submitPath:', this.$data.random_id);

      axios.post(`http://127.0.0.1:8000/api/get_and_post/${this.$data.random_id}/`, { path })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
  data() {
    return {
      path: '',
      random_id: '',
      dataName: '',
    };
  },
}
</script>

<template>
  <header>
    <input type="file" ref="fileInput" webkitdirectory directory @change="generateRandomId" />

    <input type="text" v-model="dataName" placeholder="the name of the data you wish to see in following process"/>

    <button @click="submitPath">Submit</button>

  </header>

</template>

<style scoped>
input {
  margin: 0 0 1rem;
  padding: 0.5rem;
  border: 1px solid #eee;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}
</style>
