<template>
  <div class="wrapper" @click="hidden">
    <el-container>
      <el-header>
        <Header @reload="reload" />
      </el-header>
      <el-main>
        <nuxt v-if="showMain" id="main" />
      </el-main>
    </el-container>
    <div id="to_top" class="to-top" @click="toTop">
      <i class="iconfont icon-toTop"></i>
    </div>
    <div class="to-comment" @click="toComment">
      <i class="iconfont icon-pinglun"></i>
    </div>
    <!-- 登录组件 -->
    <login v-if="isLogin" @reload="reload" />
  </div>
</template>

<script>
import throttle from "lodash/throttle";
import { getLocalStorage } from "@/utils/store";
import { getCookie } from "@/utils/cookie";

export default {
  data() {
    return {
      showMain: true
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.login.isLogin;
    }
  },
  created() {
    // 保存用户信息至vuex
    this.saveUserInfo();
  },
  mounted() {
    // 监听scroll事件
    window.addEventListener(
      "scroll",
      throttle(this.listenerScroll, 150, {
        leading: true,
        trailing: false
      })
    );
  },
  methods: {
    reload() {
      this.showMain = false;

      setTimeout(() => {
        this.showMain = true;
      }, 0);
    },
    // 保存用户信息至vuex
    saveUserInfo() {
      if (getLocalStorage("user_info") && getCookie(this, "user_token")) {
        this.$store.commit("login/saveUserInfo", getLocalStorage("user_info"));
      }
    },
    hidden() {
      // 隐藏用户登录信息浮窗面板
      if (!this.$store.state.login.isShowInfo) return;

      console.log("hidden");

      this.$store.commit("login/toggleInfoOpen", false);
    },
    toTop() {
      document.documentElement.scrollTop = 0;
    },
    toComment() {
      window.open("/circle", "_blank");
    },
    // 监听scroll事件
    listenerScroll() {
      const pathname = location.pathname; // 路径名
      const scrollTop = document.documentElement.scrollTop; // 滚动出去的距离

      // 首页
      const author_ranking = document.getElementById("author_ranking");
      const home_poster = document.getElementById("home_poster");
      const home_qr_code = document.getElementById("home_qr_code");

      // 互动页
      const circle_info_great = document.getElementById("circle_info_great");
      const circle_poster = document.getElementById("circle_poster");

      // 资讯页
      const news_send_news = document.getElementById("news_send_news");
      const news_qr_code = document.getElementById("news_qr_code");

      // 博客详情页
      const article_author_info = document.getElementById(
        "article_author_info"
      );
      const article_more_art = document.getElementById("article_more_art");

      // 互动详情页
      const circle_detail_greate = document.getElementById(
        "circle_detail_greate"
      );

      // 资讯详情页
      const news_detail_send_news = document.getElementById(
        "news_detail_send_news"
      );
      const news_detail_new = document.getElementById("news_detail_new");

      // 用户详情页
      const user_aside_userinfo = document.getElementById(
        "user_aside_userinfo"
      );
      const user_aside_attention = document.getElementById(
        "user_aside_attention"
      );
      const user_aside_footer = document.getElementById("user_aside_footer");

      if (scrollTop > 750) {
        document.getElementById("to_top").style.opacity = 1;

        // 首页
        if (pathname === "/") {
          author_ranking.style.position = "fixed";
          author_ranking.style.right =
            (352 * document.body.clientWidth) / 1920 + "px";
          author_ranking.style.top =
            (88 * document.body.clientWidth) / 1920 + "px";

          home_poster.style.position = "fixed";
          home_poster.style.right =
            (352 * document.body.clientWidth) / 1920 + "px";
          home_poster.style.top =
            (475 * document.body.clientWidth) / 1920 + "px";

          home_qr_code.style.position = "fixed";
          home_qr_code.style.right =
            (352 * document.body.clientWidth) / 1920 + "px";
          home_qr_code.style.top =
            (740 * document.body.clientWidth) / 1920 + "px";
        }

        // 互动页
        if (pathname === "/circle") {
          circle_info_great.style.position = "fixed";
          circle_info_great.style.right =
            (352 * document.body.clientWidth) / 1920 + "px";
          circle_info_great.style.top =
            (100 * document.body.clientWidth) / 1920 + "px";

          circle_poster.style.position = "fixed";
          circle_poster.style.right =
            (352 * document.body.clientWidth) / 1920 + "px";
          circle_poster.style.top =
            (523 * document.body.clientWidth) / 1920 + "px";
        }

        // 资讯页
        if (pathname === "/news") {
          news_send_news.style.position = "fixed";
          news_send_news.style.right =
            (352 * document.body.clientWidth) / 1920 + "px";
          news_send_news.style.top =
            (106 * document.body.clientWidth) / 1920 + "px";

          news_qr_code.style.position = "fixed";
          news_qr_code.style.right =
            (352 * document.body.clientWidth) / 1920 + "px";
          news_qr_code.style.top =
            (251 * document.body.clientWidth) / 1920 + "px";
        }

        // 文章页
        if (pathname.indexOf("/article") > -1) {
          article_author_info.style.position = "fixed";
          article_author_info.style.right =
            (352 * document.body.clientWidth) / 1920 + "px";
          article_author_info.style.top =
            (100 * document.body.clientWidth) / 1920 + "px";

          article_more_art.style.position = "fixed";
          article_more_art.style.right =
            (352 * document.body.clientWidth) / 1920 + "px";
          article_more_art.style.top =
            (366 * document.body.clientWidth) / 1920 + "px";
        }

        // 互动详情页
        if (pathname.indexOf("/circle-detail") > -1) {
          circle_detail_greate.style.position = "fixed";
          circle_detail_greate.style.right =
            (352 * document.body.clientWidth) / 1920 + "px";
          circle_detail_greate.style.top =
            (100 * document.body.clientWidth) / 1920 + "px";
        }

        // 资讯详情页
        if (pathname.indexOf("/news-detail") > -1) {
          news_detail_send_news.style.position = "fixed";
          news_detail_send_news.style.right =
            (352 * document.body.clientWidth) / 1920 + "px";
          news_detail_send_news.style.top =
            (100 * document.body.clientWidth) / 1920 + "px";

          news_detail_new.style.position = "fixed";
          news_detail_new.style.right =
            (352 * document.body.clientWidth) / 1920 + "px";
          news_detail_new.style.top =
            (248 * document.body.clientWidth) / 1920 + "px";
        }

        // 用户详情页
        if (pathname.indexOf("/user") > -1) {
          user_aside_userinfo.style.position = "fixed";
          user_aside_userinfo.style.right =
            (352 * document.body.clientWidth) / 1920 + "px";
          user_aside_userinfo.style.top =
            (100 * document.body.clientWidth) / 1920 + "px";

          user_aside_attention.style.position = "fixed";
          user_aside_attention.style.right =
            (352 * document.body.clientWidth) / 1920 + "px";
          user_aside_attention.style.top =
            (293 * document.body.clientWidth) / 1920 + "px";

          user_aside_footer.style.position = "fixed";
          user_aside_footer.style.right =
            (352 * document.body.clientWidth) / 1920 + "px";
          user_aside_footer.style.top =
            (400 * document.body.clientWidth) / 1920 + "px";
        }
      } else {
        document.getElementById("to_top").style.opacity = 0;

        // 首页
        if (pathname === "/") {
          author_ranking.style = null;
          home_poster.style = null;
          home_qr_code.style = null;
        }

        // 互动页
        if (pathname === "/circle") {
          circle_info_great.style = null;
          circle_poster.style = null;
        }

        // 资讯页
        if (pathname === "/news") {
          news_send_news.style = null;

          news_qr_code.style = null;
        }

        // 文章页
        if (pathname.indexOf("/article") > -1) {
          article_author_info.style = null;

          article_more_art.style = null;
        }

        // 互动详情页
        if (pathname.indexOf("/circle-detail") > -1) {
          circle_detail_greate.style = null;
        }

        // 资讯详情页
        if (pathname.indexOf("/news-detail") > -1) {
          news_detail_send_news.style = null;

          news_detail_new.style = null;
        }

        // 用户详情页
        if (pathname.indexOf("/user") > -1) {
          user_aside_userinfo.style = null;

          user_aside_attention.style = null;

          user_aside_footer.style = null;
        }
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.listenerScroll);
  }
};
</script>

<style></style>
