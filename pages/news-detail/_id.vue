<template>
  <div class="news-detail-page-wrapper">
    <div class="article-wrapper-content">
      <div class="content-innerBox">
        <h1 class="main-title-name">
          {{ articleInfo.title }}
        </h1>
        <div class="news-article-desc">
          <div
            @click="toUserPage(articleInfo.User.id)"
            class="news-article-desc-item"
          >
            {{ articleInfo.User.nickname }}
          </div>
          <div class="news-article-desc-item">
            {{ articleInfo.NewsType.tagName }}
          </div>
          <div class="news-article-desc-item">18小时前</div>
          <div class="news-article-desc-item">
            阅读&nbsp;{{ articleInfo.newsReadNum }}
          </div>
        </div>
        <img class="theme-pic" :src="articleInfo.titlePic" alt="" />
        <div class="markdown-body" v-html="mdContent"></div>
      </div>
      <div class="more-article-list">
        <div class="more-article-list-header">
          相关资讯
        </div>
        <ul class="infinite-list list-wrapper" v-infinite-scroll="loadData">
          <li
            v-for="(item, index) in moreList"
            :key="index"
            class="infinite-list-item list-item"
            @click="toNewsPage(item.id)"
          >
            <div class="item-content">
              <div class="content-left">
                <h3 class="title">{{ item.title }}</h3>
                <div class="bottom-line">
                  <div class="name bottom-line-item">
                    {{ item.User.nickname }}
                  </div>
                  <div class="time bottom-line-item">20小时前</div>
                  <div class="like bottom-line-item">
                    {{ item.newsLikeNum }}点赞&nbsp;·&nbsp;{{
                      item.newsReadNum
                    }}阅读
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="article-wrapper-aside">
      <div class="send-news" id="news_detail_send_news">
        <div class="sen-news-t">
          <div class="send-news-title">资讯投递</div>
          <el-button
            @click="publishNews"
            type="primary"
            class="send-news-btn"
            size="mini"
            >立即投递</el-button
          >
        </div>
        <div class="send-news-desc">
          欢迎投递行业动态、软件更新、编程语言相关资讯线索
        </div>
      </div>
      <div class="new-news" id="news_detail_new">
        <div class="more-article-header">最新资讯</div>
        <div class="more-article-content">
          <div
            class="more-article-content-item"
            v-for="(item, index) in newList"
            :key="index"
            @click="toNewsPage(item.id)"
          >
            <div class="content-item-title">
              {{ item.title }}
            </div>
            <div class="content-item-line">
              <i
                :style="{
                  color: item.isLike ? '#2de938' : '#b2bac2'
                }"
                class="iconfont icon-dianzan1"
                @click.stop="likeNewArt(item.id)"
                >&nbsp;{{ item.newsLikeNum }}</i
              >
              <i class="iconfont icon-yanjing">&nbsp;{{ item.newsReadNum }}</i>
            </div>
          </div>
        </div>
      </div>
      <div class="hot-news">
        <div class="more-article-header">最热资讯</div>
        <div class="more-article-content">
          <div
            class="more-article-content-item"
            v-for="(item, index) in hotList"
            :key="index"
            @click="toNewsPage(item.id)"
          >
            <div class="content-item-title">
              {{ item.title }}
            </div>
            <div class="content-item-line">
              <i
                :style="{
                  color: item.isLike ? '#2de938' : '#b2bac2'
                }"
                class="iconfont icon-dianzan1"
                @click.stop="likeHotArt(item.id)"
                >&nbsp;{{ item.newsLikeNum }}</i
              >
              <i class="iconfont icon-yanjing">&nbsp;{{ item.newsReadNum }}</i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="fixed-left-box"
      :style="{ left: this.fixedLeft + 'px', top: this.fixedTop + 'px' }"
    >
      <div
        @click="likeArt"
        class="icon-item icon-item-badge"
        :badge="articleInfo.newsLikeNum"
      >
        <i
          :style="{
            color: articleInfo.isLike ? '#2de938' : '#b2bac2'
          }"
          class="iconfont icon-dianzan1"
        ></i>
      </div>
      <div class="icon-item icon-item-badge" :badge="articleInfo.newsReadNum">
        <i class="iconfont icon-yanjing"></i>
      </div>
      <div class="icon-item">
        <i class="iconfont icon-xinfangjubao"></i>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import { Message } from "element-ui";

export default {
  layout: "default",
  data() {
    return {
      hotList: [], // 热门文章推荐
      moreList: [], // 相关文章推荐
      pageSize: 10, //页容量
      pageIndex: 2, // 当前页
      moreList: [], // 相关文章推荐
      fixedLeft: 200, // 左侧点赞面板距离左侧位置
      fixedTop: 160 // 左侧点赞面板距离顶部位置
    };
  },
  async asyncData({ params, $axios }) {
    // 获取文章详情
    const data = await $axios.get("/news/article", {
      params: { id: params.id }
    });

    if (data.error_code !== 0) {
      Message.error("获取文章失败！");
    }

    const mdContent = marked(data.data.content || "");

    // 获取热门文章推荐
    const hotList = await $axios.get("/news/hot", { params: { id: params.id } });

    if (hotList.error_code !== 0) {
      Message.error("获取热门文章推荐失败！");
    }

    // 获取最新文章推荐
    const newList = await $axios.get("/news/new", { params: { id: params.id } });

    if (newList.error_code !== 0) {
      Message.error("获取热门文章推荐失败！");
    }

    // 获取相关文章推荐
    const moreList = await $axios.get("/news/more", {
      params: { id: params.id, pageIndex: 1, pageSize: 10 }
    });

    if (moreList.error_code !== 0) {
      Message.error("获取相关文章推荐失败！");
    }

    return {
      mdContent, // 博客内容
      articleInfo: data.data, // 作者信息
      hotList: hotList.data.rows, // 热门文章推荐
      newList: newList.data.rows, // 最新文章推荐
      moreList: moreList.data.rows, // 更多相关文章推荐
      countNum: moreList.data.count // 更多文章总文章数
    };
  },
  mounted() {
    // 实时更新左侧操作面板的位置：
    this.setFixed();
  },
  methods: {
    setFixed() {
      window.addEventListener("resize", this.dealWithPosition);
    },
    dealWithPosition() {
      this.fixedLeft = document.body.clientWidth * 0.1042;
      this.fixedTop = document.body.clientHeight * 0.083;
    },
    loadData() {
      // 当前页大于总页数时停止请求数据：
      if (this.pageIndex > Math.ceil(this.countNum / this.pageSize)) return;

      // 下拉加载更多：
      this.getMoreNews();
    },
    toNewsPage(id) {
      window.open(`/news-detail/${id}`, "_blank");
    },
    // 获取更多资讯列表
    async getMoreNews() {
      const listData = await this.$axios.get("/news/more", {
        params: {
          id: this.$route.params.id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      });

      if (listData.error_code === 0) {
        listData.data.rows.forEach(item => {
          this.moreList.push(item);
        });

        // 当前页数+1
        this.pageIndex += 1;
      } else {
        Message.error("更多文章获取失败！");
      }
    },
    // 点赞该篇资讯
    async likeArt() {
      const data = await this.$axios.post("/newslike/like", {
        newsId: this.$route.params.id
      });

      if (data.error_code === 0) {
        if (data.data === "ok") {
          this.articleInfo.isLike = true;
          this.articleInfo.newsLikeNum += 1;
        } else if (data.data === "cancel") {
          this.articleInfo.isLike = false;
          this.articleInfo.newsLikeNum -= 1;
        }
      } else {
        Message.error("操作失败！");
      }
    },
    // 点赞最新资讯
    async likeNewArt(id) {
      const data = await this.$axios.post("/newslike/like", {
        newsId: id
      });

      if (data.error_code === 0) {
        if (data.data === "ok") {
          this.newList.forEach(item => {
            if (item.id === id) {
              item.isLike = true;
              item.newsLikeNum++;
            }
          });
        } else if (data.data === "cancel") {
          this.newList.forEach(item => {
            if (item.id === id) {
              item.isLike = true;
              item.newsLikeNum--;
            }
          });
        }
      } else {
        Message.error("操作失败！");
      }
    },
    // 点赞最热资讯
    async likeHotArt(id) {
      const data = await this.$axios.post("/newslike/like", {
        newsId: id
      });

      if (data.error_code === 0) {
        if (data.data === "ok") {
          this.hotList.forEach(item => {
            if (item.id === id) {
              item.isLike = true;
              item.newsLikeNum++;
            }
          });
        } else if (data.data === "cancel") {
          this.hotList.forEach(item => {
            if (item.id === id) {
              item.isLike = true;
              item.newsLikeNum--;
            }
          });
        }
      } else {
        Message.error("操作失败！");
      }
    },
    // 打开投递“资讯”页
    publishNews() {
      window.open("/writing/news", "_blank");
    },
    // 跳转至用户页
    toUserPage(id) {
      window.open(`/user/${id}`);
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.dealWithPosition);
  }
};
</script>

<style></style>
