<template>
  <div class="article-wrapper">
    <div class="article-wrapper-content">
      <div class="content-innerBox">
        <div class="innerBox-author">
          <div class="innerBox-left">
            <img :src="articleInfo.User.avatar" class="avatar" />
            <div class="author-info">
              <div class="author-name">{{ articleInfo.User.nickname }}</div>
              <div class="author-info-detail">
                <div class="detail-time">2021年07月01日</div>
                &nbsp;&nbsp;
                <div class="read-times">
                  阅读&nbsp;{{ articleInfo.User.blogReadNum }}
                </div>
              </div>
            </div>
          </div>
          <el-button class="pay-attention" size="mini">关注</el-button>
        </div>
        <img class="theme-pic" :src="articleInfo.titlePic" alt="" />
        <h1 class="main-title-name">
          {{ articleInfo.title }}
        </h1>
        <div class="markdown-body" v-html="mdContent"></div>
        <div class="article-author-wrapper">
          <div class="article-tag-type">
            <div class="type">
              文章分类&nbsp;&nbsp;&nbsp;
              <div class="type-name">{{ articleInfo.Tag.tagName }}</div>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div class="tag">
              文章标签&nbsp;&nbsp;&nbsp;
              <div
                v-for="(item, index) in articleTagList"
                :key="index"
                class="tag-name"
              >
                {{ articleInfo.Tag.tagName }}
              </div>
            </div>
          </div>
          <div class="author-bottom-info">
            <div class="author-bottom-info-left">
              <img
                class="avatar bottom-avatar"
                :src="articleInfo.User.avatar"
              />
              <div class="info-left-author-detail">
                <div class="author-detail-info">
                  <div class="author-detail-info-name">
                    {{ articleInfo.User.nickname }}
                  </div>
                  <div class="author-detail-info-job">
                    {{ articleInfo.User.profession }}
                  </div>
                </div>
                <div class="author-detail-info-desc">
                  <div class="publish">发布了33篇文章</div>
                  &nbsp;·&nbsp;
                  <div class="like">
                    获得点赞&nbsp;{{ articleInfo.User.blogLikeNum }}
                  </div>
                  &nbsp;·&nbsp;
                  <div class="read">
                    获得阅读&nbsp;{{ articleInfo.User.blogReadNum }}
                  </div>
                </div>
              </div>
            </div>
            <el-button class="pay-attention" size="mini">关注</el-button>
          </div>
        </div>
        <div class="comment-body-wrapper">
          <div class="comment-body-innerBox">
            <div class="make-comments" id="make_comments">
              <div class="first-line">
                <img
                  src="https://user-gold-cdn.xitu.io/2020/1/18/16fb901f1bac3975?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
                  alt=""
                  class="avatar"
                />
                <el-input
                  class="input-btn"
                  v-model="comment"
                  placeholder="输入评论..."
                ></el-input>
              </div>
              <div class="second-line">
                <div class="emoj">表情</div>
                <el-button size="small" type="primary">评论</el-button>
              </div>
            </div>
            <div class="comments-main-body">
              <div class="comments-main-body-innerBox">
                <img
                  class="avatar"
                  src="https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/96edaca0277d56b4232e2aebafa2d982~300x300.image"
                  alt=""
                />
                <div class="comments-main-body-innerBox-right">
                  <div class="user-line">
                    <div class="user-line-name">彭道宽</div>
                    <div class="user-line-sign">
                      前端小兵成长营前端小兵成长营
                    </div>
                  </div>
                  <div class="comments-line">已阅</div>
                  <div class="bottom-line">
                    <div class="time">52分钟前</div>
                    <div class="bottom-line-right">
                      <i class="iconfont icon-dianzan"></i>
                      <i class="iconfont icon-liaotian">&nbsp;回复</i>
                    </div>
                  </div>
                  <div class="comments-reply-body">
                    <div class="comments-reply-body-line">
                      <img
                        class="avatar"
                        src="https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/bce60f0d6d1bc92907c435bb69b4f9c1~300x300.image"
                        alt=""
                      />
                      <div class="comments-reply-body-line-right">
                        <div class="reply-line-author-info">
                          <div class="username">橘猫很方</div>
                          <div class="identity">(作者)</div>
                          <div class="sign">前端小兵成长营前端小兵成长营</div>
                        </div>
                        <div class="reply-line-comments-body">
                          已阅
                        </div>
                        <div class="reply-line-bottom">
                          <div class="time">48分钟前</div>
                          <div class="bottom-right">
                            <i class="iconfont icon-dianzan"></i>
                            <i class="iconfont icon-liaotian">&nbsp;回复</i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="more-article-list">
        <div class="more-article-list-header">
          相关推荐
        </div>
        <ul
          class="infinite-list list-wrapper"
          v-infinite-scroll="loadData"
          :infinite-scroll-delay="500"
          :infinite-scroll-distance="60"
        >
          <li
            v-for="(item, index) in moreList"
            :key="index"
            class="infinite-list-item list-item"
            @click="toArticle"
          >
            <div class="item-info">
              <div class="author-name">{{ item.User.nickname }}</div>
              <div class="time">一小时前</div>
              <div class="tag-type">{{ item.Tag.tagName }}</div>
            </div>
            <div class="item-content">
              <div class="content-left">
                <h3 class="title">{{ item.title }}</h3>
                <div class="desc">
                  {{ item.description }}
                </div>
                <div class="operate">
                  <i class="iconfont icon-yanjing operate-item"
                    >&nbsp;{{ item.blogReadNum }}</i
                  >
                  <i class="iconfont icon-dianzan operate-item"
                    >&nbsp;{{ item.blogLikeNum }}</i
                  >
                  <i class="iconfont icon-pinglun"
                    >&nbsp;{{ item.commentNum }}</i
                  >
                </div>
              </div>
              <img class="content-right" :src="item.titlePic" />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="article-wrapper-aside">
      <div class="aside-author">
        <div class="aside-author-title">关于作者</div>
        <div class="aside-author-body">
          <div class="aside-author-body-top">
            <img class="avatar" :src="articleInfo.User.avatar" alt="" />
            <div class="author-body-top-info">
              <div class="top-info-name">{{ articleInfo.User.nickname }}</div>
              <div class="top-info-sign">{{ articleInfo.User.signature }}</div>
            </div>
          </div>
          <div class="aside-author-body-bottom">
            <div class="aside-author-body-bottom-item">
              <i class="iconfont icon-dianzan"></i
              ><span class="text"
                >获得点赞&nbsp;{{ articleInfo.User.blogLikeNum }}</span
              >
            </div>
            <div class="aside-author-body-bottom-item">
              <i class="iconfont icon-yanjing"></i
              ><span class="text"
                >文章被阅读&nbsp;{{ articleInfo.User.blogReadNum }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="qr-code-wrapper">
        <div class="qr-code"></div>
        <div class="qr-code-desc">
          <div class="qr-code-desc-title">下载得到客户端</div>
          <div class="qr-code-desc-word">一个旨在分享技术的社区</div>
        </div>
      </div>
      <div class="home-page-poster"></div>
      <div class="more-article">
        <div class="more-article-header">相关文章</div>
        <div class="more-article-content">
          <div
            class="more-article-content-item"
            v-for="(item, index) in hotList"
            :key="index"
          >
            <div class="content-item-title">
              {{ item.title }}
            </div>
            <div class="content-item-line">
              <i class="iconfont icon-dianzan1">&nbsp;{{ item.blogLikeNum }}</i>
              <i class="iconfont icon-pinglun2">&nbsp;{{ item.commentNum }}</i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="fixed-left-box"
      :style="{ left: this.fixedLeft + 'px', top: this.fixedTop + 'px' }"
    >
      <i class="iconfont icon-dianzan1"></i>
      <i class="iconfont icon-pinglun2"></i>
      <i class="iconfont icon-xingxingmianxing"></i>
      <i class="iconfont icon-xinfangjubao"></i>
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
      infoList: [1, 1, 1, 1, 1, 1, 1, 1, 1],
      articleTagList: [2, 1, 1, 1],
      hotList: [], // 热门文章推荐
      moreList: [], // 相关文章推荐
      comment: "",
      fixedLeft: 200, // 左侧点赞面板距离左侧位置
      fixedTop: 160, // 左侧点赞面板距离顶部位置
      pageSize: 10, //页容量
      pageIndex: 2 // 当前页
    };
  },
  async asyncData({ query, $axios }) {
    // 获取文章详情
    const data = await $axios.get("/blog/article", {
      params: { id: query.id }
    });

    if (data.error_code !== 0) {
      return Message.error("获取文章失败！");
    }

    const mdContent = marked(data.data.content || "", {
      sanitize: true
    });

    // 获取热门文章推荐
    const hotList = await $axios.get("/blog/hot", { params: { id: query.id } });

    if (hotList.error_code !== 0) {
      Message.error("获取热门文章推荐失败！");
    }

    // 获取相关文章推荐
    const moreList = await $axios.get("/blog/more", {
      params: { id: query.id, pageIndex: 1, pageSize: 10 }
    });

    if (moreList.error_code !== 0) {
      Message.error("获取相关文章推荐失败！");
    }

    return {
      mdContent,
      articleInfo: data.data,
      hotList: hotList.data.rows,
      moreList: moreList.data.rows,
      countNum: moreList.data.count
    };
  },
  mounted() {
    // 实时更新左侧操作面板的位置：
    this.setFixed();
  },
  methods: {
    loadData() {
      // 当前页大于总页数时停止请求数据：
      if (this.pageIndex > Math.ceil(this.countNum / this.pageSize)) return;

      // 下拉加载更多：
      this.getMoreBlog();
    },
    // 获取博客列表
    async getMoreBlog() {
      const listData = await this.$axios.get("/blog/more", {
        params: {
          id: query.id,
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
    setFixed() {
      window.addEventListener("resize", this.dealWithPosition);
    },
    toArticle() {
      window.open("/article", "_blank");
    },
    dealWithPosition() {
      this.fixedLeft = document.body.clientWidth * 0.1042;
      this.fixedTop = document.body.clientHeight * 0.083;
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.dealWithPosition);
  }
};
</script>

<style></style>
