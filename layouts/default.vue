<template>
  <div class="wrapper" @click="hidden">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <nuxt id="main" />
      </el-main>
    </el-container>
    <div class="to-top" @click="toTop">
      <i class="iconfont icon-toTop"></i>
    </div>
    <div class="to-comment" @click="toComment">
      <i class="iconfont icon-pinglun"></i>
    </div>
    <!-- 登录组件 -->
    <login v-if="isLogin" />
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.state.login.isLogin;
    }
  },
  methods: {
    hidden() {
      // 隐藏用户登录信息浮窗面板
      if (!this.$store.state.login.isShowInfo) return;

      this.$store.commit("login/toggleInfoOpen", false);
    },
    toTop() {
      document.getElementsByClassName("el-main")[0].scrollTop = 0;
    },
    toComment() {
      window.open("/circle", "_blank");
    }
  }
};
</script>

<style></style>
