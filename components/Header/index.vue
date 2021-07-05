<template>
  <div class="header-wrapper">
    <div class="left-wrapper">
      <h1 class="logo">得到</h1>
      <div v-for="item in titleList" :key="item" class="item">{{ item }}</div>
    </div>
    <div class="right-wrapper">
      <el-input
        class="item"
        size="small"
        v-model="input"
        suffix-icon="el-icon-search"
        placeholder="探索得到"
      ></el-input>
      <el-button class="item" type="primary" size="small">写文章</el-button>
      <el-badge :value="3" class="item">
        <i class="el-icon-bell"></i>
      </el-badge>
      <!-- <div class="avatar item"></div> -->
      <el-avatar class="avatar item" :src="circleUrl"></el-avatar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      circleUrl: "",
      titleList: ["首页", "互动", "发现", "作者简历"]
    };
  },
  methods: {}
};
</script>

<style></style>
