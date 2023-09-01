<template>
  <div id="app">
    <el-container v-show="!$store.state.LoggingOrRegistering">
      <el-header>
        <Header></Header>
      </el-header>
      <el-main style="background-color: rgb(243,245,245);">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  name: 'App',
  data() {
    return {
    }
  },
  components:{
    Header,
  },
  methods:{
    skipToPage(path){
      this.$router.push({
        name:path,
      })
    }
  },
  created(){
    this.$bus.$on('skip',this.skipToPage)
    this.$router.push({
        name:'homepage',
      })
  }
}

</script>


<style></style>
