<template>
  <div class="header-wrapper">
    <div class="left-wrapper">
      <h1 class="logo">得到</h1>
      <div class="item">首页</div>
      <div class="item">互动</div>
      <div class="item">发现</div>
      <div class="item">作者简历</div>
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
      <i class="el-icon-bell item"></i>
      <div class="avatar item"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ""
    };
  },
  methods: {}
};
</script>

<style></style>
