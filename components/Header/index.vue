<template>
  <div class="header-wrapper">
    <div class="header-wrapper-top">
      <div class="header-wrapper-top-box">
        <div class="left-wrapper">
          <h1 @click="$router.push('/')" class="logo">得到</h1>
          <div v-for="(item, index) in titleList" :key="index" class="item">
            <div
              :style="{
                color: selectPath === item.route ? '#00c58e' : '#4e5969'
              }"
              class="item-link"
              @click="clickItem(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="right-wrapper">
          <div class="input-wrapper">
            <el-input
              :style="{ width: !showWrite ? '280px' : '203px' }"
              class="item input-wrapper-item"
              size="small"
              v-model="input"
              suffix-icon="el-icon-search"
              placeholder="探索得到"
              @focus="showWrite = false"
              @blur="showWrite = true"
              @change="search"
            ></el-input>
            <el-button
              v-if="showWrite"
              class="item input-wrapper-item"
              @click="openPage('/writing')"
              type="primary"
              size="small"
              >写文章</el-button
            >
          </div>
          <div @click.stop="login">
            <el-avatar
              class="avatar item"
              :src="currentUserInfo ? currentUserInfo.avatar : ''"
            ></el-avatar>
          </div>
          <!-- 用户面板 -->
          <UserInfo @reload="reload" v-if="isShowInfo" />
        </div>
      </div>
    </div>
    <div class="header-wrapper-bottom"></div>
  </div>
</template>

<script>
import { getLocalStorage } from "@/utils/store";
import { getCookie } from "@/utils/cookie";
import UserInfo from "./userInfo.vue";

export default {
  components: { UserInfo },
  data() {
    return {
      selectPath: this.$route.path, // 选中的路径
      showWrite: true, // 是否展示“写文章”按钮
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
  computed: {
    isLogin() {
      return this.$store.state.login.isLogin;
    },
    isShowInfo() {
      return this.$store.state.login.isShowInfo;
    },
    currentUserInfo() {
      return this.$store.state.login.userinfo;
    }
  },
  created() {
    this.search();
  },
  methods: {
    reload() {
      // 触发页面刷新
      this.$emit("reload");
    },
    openPage(path) {
      window.open(`${path}/article`, "_blank");
    },
    login() {
      const isLogin =
        getLocalStorage("user_info") && getCookie(this, "user_token")
          ? true
          : false;

      if (!isLogin) {
        return this.$store.commit("login/toggleOpen", true);
      }

      this.$store.commit("login/toggleInfoOpen", true);
    },
    clickItem(item) {
      this.selectPath = item.route;
      this.$router.push(item.route);

      // 清空搜索框
      this.input = "";
      this.$store.commit("search/setSearchValue", []);
    },
    async search() {
      const listData = await this.$axios.get("/blog/search", {
        params: {
          tag: 10000,
          content: this.input
        }
      });

      if (listData.error_code === 0) {
        this.$store.commit("search/setSearchValue", listData.data.rows);

        this.$router.push("/search");
      } else {
        Message.error("搜索失败！");
      }
    }
  }
};
</script>

<style></style>
