<template>
  <div class="header-wrapper">
    <div class="left-wrapper">
      <h1 class="logo">得到</h1>
      <div v-for="(item, index) in titleList" :key="index" class="item">
        <nuxt-link :to="item.route">{{ item.name }}</nuxt-link>
      </div>
    </div>
    <div class="right-wrapper">
      <el-input
        class="item"
        size="small"
        v-model="input"
        suffix-icon="el-icon-search"
        placeholder="探索得到"
      ></el-input>
      <el-button
        class="item"
        @click="openPage('/writing')"
        type="primary"
        size="small"
        >写文章</el-button
      >
      <el-badge :value="3" class="item">
        <i class="el-icon-bell"></i>
      </el-badge>
      <!-- <el-avatar
        @click="login()"
        class="avatar item"
        :src="circleUrl"
      ></el-avatar> -->
      <div class="avatar item" :src="circleUrl" @click="login"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      circleUrl: "",
      titleList: [
        {
          name: "首页",
          route: "/"
        },
        {
          name: "互动",
          route: "/circle"
        },
        {
          name: "资讯",
          route: "/news"
        }
      ]
    };
  },
  methods: {
    openPage(path) {
      window.open(path, "_blank");
    },
    login() {
      const isLogin = false;

      if (!isLogin) {
        this.$store.commit("login/toggleOpen", true);
      }
    }
  }
};
</script>

<style></style>
