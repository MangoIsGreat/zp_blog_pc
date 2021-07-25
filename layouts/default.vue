<template>
  <div class="wrapper">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <nuxt />
      </el-main>
    </el-container>
    <div class="to-top">
      <i class="iconfont icon-zhcc_xiangshangjiantou"></i>
    </div>
    <div class="to-comment">
      <i class="iconfont icon-huabanfuben"></i>
    </div>
    <!-- 登录组件 -->
    <login :style="{ display: isLogin ? 'flex' : 'none' }" />
  </div>
</template>

<script>
import Login from "@/components/Login";

export default {
  components: {
    Login
  },
  computed: {
    isLogin() {
      return this.$store.state.login.isLogin;
    }
  }
};
</script>

<style></style>
