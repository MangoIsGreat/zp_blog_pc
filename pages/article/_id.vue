<template>
  <div class="article-root" @click="hiddenToComment">
    <div class="article-wrapper">
      <div class="article-wrapper-content">
        <div class="content-innerBox">
          <div class="innerBox-author">
            <div class="innerBox-left" @click="toUserPage(articleInfo.User.id)">
              <img :src="articleInfo.User.avatar" class="avatar" />
              <div class="author-info">
                <div class="author-name">{{ articleInfo.User.nickname }}</div>
                <div class="author-info-detail">
                  <div class="detail-time">
                    {{ articleInfo.created_at | formatTime }}
                  </div>
                  &nbsp;&nbsp;
                  <div class="read-times">
                    阅读&nbsp;{{ articleInfo.User.blogReadNum }}
                  </div>
                </div>
              </div>
            </div>
            <el-button
              v-if="!articleInfo.User.isSelf"
              class="pay-attention"
              size="mini"
              @click="follow(articleInfo.User.id)"
              ><span v-if="!articleInfo.User.isAttention">关注</span
              ><span class="not-attention" v-else>已关注</span></el-button
            >
          </div>
          <img class="theme-pic" :src="articleInfo.titlePic" alt="" />
          <h1 class="main-title-name">
            {{ articleInfo.title }}
          </h1>
          <div class="markdown-body" v-html="compiledMarkdown"></div>
          <div class="article-author-wrapper">
            <div class="article-tag-type">
              <div class="type">
                文章分类&nbsp;&nbsp;&nbsp;
                <div class="type-name">{{ articleInfo.Tag.tagName }}</div>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            </div>
            <div class="author-bottom-info">
              <div class="author-bottom-info-left">
                <img
                  class="avatar bottom-avatar"
                  :src="articleInfo.User.avatar"
                />
                <div
                  class="info-left-author-detail"
                  @click="toUserPage(articleInfo.User.id)"
                >
                  <div class="author-detail-info">
                    <div class="author-detail-info-name">
                      {{ articleInfo.User.nickname }}
                    </div>
                    <div class="author-detail-info-job">
                      {{ articleInfo.User.profession }}
                    </div>
                  </div>
                  <div class="author-detail-info-desc">
                    <div class="publish">
                      粉丝数{{ articleInfo.User.fansNum }}
                    </div>
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
              <el-button
                v-if="!articleInfo.User.isSelf"
                class="pay-attention"
                size="mini"
                @click="follow(articleInfo.User.id)"
                ><span v-if="!articleInfo.User.isAttention">关注</span
                ><span class="not-attention" v-else>已关注</span></el-button
              >
            </div>
          </div>
          <div class="comment-body-wrapper">
            <div class="comment-body-innerBox">
              <!-- 评论 -->
              <div class="make-comments" id="make_comments" @click.stop>
                <div class="first-line">
                  <img
                    :src="
                      currentUserInfo ? currentUserInfo.avatar : defaultAvatar
                    "
                    alt=""
                    class="avatar"
                  />
                  <el-input
                    id="b_comm_emoji_ipt"
                    class="input-btn"
                    v-model="comment"
                    placeholder="输入评论..."
                    @focus="showInputBtn"
                  ></el-input>
                </div>
                <div class="second-line" v-if="showCommentBtn">
                  <div
                    class="emoj"
                    @click.stop="showCommEmoji = !showCommEmoji"
                  >
                    <i class="iconfont icon-hanhan-01-01"></i>表情
                  </div>
                  <el-button
                    size="small"
                    :autofocus="true"
                    type="primary"
                    @click="makeComment"
                    >评论</el-button
                  >
                  <VEmojiPicker
                    class="emoji-picker"
                    v-if="showCommEmoji"
                    @select="selectCommEmoji"
                  />
                </div>
              </div>
              <div class="comments-main-body">
                <!-- 回复评论 -->
                <div
                  @click.stop
                  class="comments-main-body-innerBox"
                  :key="index"
                  v-for="(item, index) in commentList"
                >
                  <img
                    @click="toUserPage(item.comment.id)"
                    class="avatar"
                    :src="item.comment.avatar"
                    alt=""
                  />
                  <div class="comments-main-body-innerBox-right">
                    <div class="user-line" @click="toUserPage(item.comment.id)">
                      <div class="user-line-name">
                        {{ item.comment.nickname }}
                      </div>
                      <div class="user-line-sign">
                        {{ item.comment.profession }}
                      </div>
                    </div>
                    <div class="comments-line">{{ item.content }}</div>
                    <div class="bottom-line">
                      <div class="time">
                        {{ item.created_at | relativeTime }}
                      </div>
                      <div class="bottom-line-right">
                        <div>
                          <i
                            @click.stop="likeComment(item.id)"
                            :class="
                              `iconfont ${
                                item.isLike ? 'icon-dianzan1' : 'icon-dianzan'
                              }`
                            "
                            :style="{
                              color: item.isLike ? '#2de938' : '#b2bac2'
                            }"
                          ></i>
                          <span v-show="item.likeNum !== 0">{{
                            item.likeNum
                          }}</span>
                        </div>
                        <i
                          class="iconfont icon-pinglun"
                          @click.stop="showToComment(item.id)"
                          >&nbsp;回复</i
                        >
                      </div>
                    </div>
                    <!-- 评论输入框 -->
                    <div
                      @click.stop
                      class="reply-to-comment"
                      v-if="commentId === item.id"
                    >
                      <div class="first-line">
                        <el-input
                          id="b_reply_comm_emoji_ipt"
                          size="small"
                          class="input-btn"
                          v-model="replyComment"
                          :autofocus="true"
                          :placeholder="`回复${item.comment.nickname}...`"
                        ></el-input>
                      </div>
                      <div class="second-line">
                        <div
                          class="emoj"
                          @click.stop="showReplyCommEmoji = !showReplyCommEmoji"
                        >
                          <i class="iconfont icon-hanhan-01-01"></i>表情
                        </div>
                        <el-button
                          size="mini"
                          type="primary"
                          @click="replyToComment(item)"
                          >评论</el-button
                        >
                        <VEmojiPicker
                          class="emoji-picker"
                          v-if="showReplyCommEmoji"
                          @select="selectReplyCommEmoji"
                        />
                      </div>
                    </div>
                    <div class="comments-reply-body">
                      <div
                        class="comments-reply-body-line"
                        :key="i"
                        v-for="(t, i) in item.child"
                        @click.stop
                      >
                        <img
                          @click="toUserPage(t.from.id)"
                          class="avatar"
                          :src="t.from.avatar"
                          alt=""
                        />
                        <div
                          @click="toUserPage(t.from.id)"
                          class="comments-reply-body-line-right"
                        >
                          <div class="reply-line-author-info">
                            <div class="username">{{ t.from.nickname }}</div>
                            <div
                              class="identity"
                              v-if="item.comment.id === t.from.id"
                            >
                              (作者)
                            </div>
                            <div class="sign">{{ t.from.profession }}</div>
                          </div>
                          <div class="reply-line-comments-body">
                            回复&nbsp;<span
                              @click.stop="toUserPage(t.to.id)"
                              class="reply"
                              >{{ t.to.nickname }}</span
                            >：{{ t.content }}
                          </div>
                          <div class="reply-line-bottom">
                            <div class="time">
                              {{ t.created_at | relativeTime }}
                            </div>
                            <div class="bottom-right">
                              <div>
                                <i
                                  @click.stop="likeReply(t.id)"
                                  :class="
                                    `iconfont ${
                                      t.isLike
                                        ? 'icon-dianzan1'
                                        : 'icon-dianzan'
                                    }`
                                  "
                                  :style="{
                                    color: t.isLike ? '#2de938' : '#b2bac2'
                                  }"
                                ></i>
                                <span v-show="t.likeNum !== 0">{{
                                  t.likeNum
                                }}</span>
                              </div>
                              <i
                                @click.stop="showReply(t.id)"
                                class="iconfont icon-pinglun"
                                >&nbsp;回复</i
                              >
                            </div>
                          </div>
                          <!-- 回复输入框 -->
                          <div
                            @click.stop
                            class="reply-to-comment"
                            v-if="t.id === replyId"
                          >
                            <div class="first-line">
                              <el-input
                                id="b_reply_reply_emoji_ipt"
                                size="small"
                                class="input-btn"
                                v-model="replyContent"
                                :autofocus="true"
                                :placeholder="`回复${t.from.nickname}...`"
                              ></el-input>
                            </div>
                            <div class="second-line">
                              <div
                                @click.stop="
                                  showReplyReplyEmoji = !showReplyReplyEmoji
                                "
                                class="emoj"
                              >
                                <i class="iconfont icon-hanhan-01-01"></i>表情
                              </div>
                              <el-button
                                size="mini"
                                type="primary"
                                @click.stop="replyToReply(t, item)"
                                >评论</el-button
                              >
                              <VEmojiPicker
                                class="emoji-picker"
                                v-if="showReplyReplyEmoji"
                                @select="selectReplyReplyEmoji"
                              />
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
              @click="toArticle(item.id)"
            >
              <div class="list-item-wrapper">
                <div class="item-info">
                  <div
                    @click.stop="toUserPage(item.User.id)"
                    class="author-name"
                  >
                    {{ item.User.nickname }}
                  </div>
                  <div class="time">{{ item.created_at | relativeTime }}</div>
                  <div class="tag-type">{{ item.Tag.tagName }}</div>
                </div>
                <div class="item-content">
                  <div class="content-left">
                    <h3 class="title">{{ item.title }}</h3>
                    <div class="desc">
                      {{ item.description }}
                    </div>
                    <div class="operate">
                      <div class="operate-item">
                        <i class="iconfont icon-yanjing"
                          >&nbsp;{{ item.blogReadNum }}</i
                        >
                      </div>
                      <div
                        class="operate-item"
                        @click.stop="likeBlog(item.id)"
                        :style="{
                          color: item.isLike ? '#2de938' : '#4e5969'
                        }"
                      >
                        <i class="iconfont icon-dianzan1"
                          >&nbsp;{{ item.blogLikeNum }}</i
                        >
                      </div>
                      <div @click.stop="toComment(item.id)">
                        <i class="iconfont icon-pinglun"
                          >&nbsp;{{ item.commentNum }}</i
                        >
                      </div>
                    </div>
                  </div>
                  <div
                    v-lazy:background-image="item.titlePic"
                    class="content-right"
                  ></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="article-wrapper-aside">
        <div class="aside-author" id="article_author_info">
          <div class="aside-author-title">关于作者</div>
          <div class="aside-author-body">
            <div
              class="aside-author-body-top"
              @click="toUserPage(articleInfo.User.id)"
            >
              <img class="avatar" :src="articleInfo.User.avatar" alt="" />
              <div class="author-body-top-info">
                <div class="top-info-name">{{ articleInfo.User.nickname }}</div>
                <div class="top-info-sign">
                  {{ articleInfo.User.signature }}
                </div>
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
        <div class="more-article" id="article_more_art">
          <div class="more-article-header">相关文章</div>
          <div class="more-article-content">
            <div
              class="more-article-content-item"
              v-for="(item, index) in hotList"
              :key="index"
              @click="toArticle(item.id)"
            >
              <div class="content-item-title">
                {{ item.title }}
              </div>
              <div class="content-item-line">
                <i
                  @click.stop="likeHotArticle(item.id)"
                  class="iconfont icon-dianzan1"
                  :style="{
                    color: item.isLike ? '#2de938' : '#b2bac2'
                  }"
                  >&nbsp;{{ item.blogLikeNum }}</i
                >
                <i
                  @click.stop="toHotArticle(item.id)"
                  class="iconfont icon-pinglun2"
                  >&nbsp;{{ item.commentNum }}</i
                >
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
          :badge="articleInfo.blogLikeNum"
        >
          <i
            :style="{
              color: articleInfo.isLike ? '#2de938' : '#b2bac2'
            }"
            class="iconfont icon-dianzan1"
          ></i>
        </div>
        <div
          class="icon-item icon-item-badge"
          @click="leaveWord"
          :badge="commentList.length"
        >
          <i class="iconfont icon-pinglun2"></i>
        </div>
        <div class="icon-item item-collection">
          <i
            class="iconfont icon-xingxingmianxing"
            @click.stop="makeCollection"
            :style="{
              color: articleInfo.isCollect ? '#ffc347' : '#b2bac2'
            }"
          ></i>
          <div @click.stop class="collection-panel" v-if="showCollection">
            <div class="collection-panel-header">添加到收藏集</div>
            <div class="collection-panel-body">
              <div
                class="collection-panel-body-item"
                v-for="(item, index) in collectionList"
                @click="collectBlog(item)"
                :key="index"
              >
                <div class="collection-panel-body-item-left">
                  <span class="panel-body-item-type">{{ item.type }}</span>
                  <span class="panel-body-item-number">{{ item.number }}</span>
                </div>
                <div class="collection-panel-body-item-right">
                  <i
                    v-if="item.isCollection"
                    class="iconfont icon-xuanzhong"
                  ></i>
                </div>
              </div>
            </div>
            <div class="collection-panel-footer">
              <el-button
                class="collection-panel-footer-create"
                v-if="!newCollection"
                type="text"
                size="mini"
                @click="newCollection = true"
                >新建收藏集</el-button
              >
              <div v-else class="collection-panel-footer-input">
                <el-input
                  placeholder="请输入收藏夹名..."
                  class="collection-panel-footer-input-text"
                  v-model="collectionType"
                ></el-input>
                <el-button @click="createCollection" size="mini" plain
                  >添加</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dev from "@/env";
// import marked from "marked";
import { Message } from "element-ui";

let marked = require("marked");
let hljs = require("highlight.js");

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  // sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code, true).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  }
});

export default {
  layout: "default",
  data() {
    return {
      showCommEmoji: false, // 是否展示评论emoji表情选择器
      showReplyCommEmoji: false, // 是否展示回复评论emoji表情选择器
      showReplyReplyEmoji: false, // 是否展示回复回复emoji表情选择器
      defaultAvatar: dev[process.env.NODE_ENV].PIC_URL + "/default_avatar.png", // 默认头像
      commentList: [], // 评论列表
      hotList: [], // 热门文章推荐
      moreList: [], // 相关文章推荐
      comment: "", // 评论内容
      replyComment: "", // 回复"评论内容"
      replyContent: "", // 回复"回复内容"
      fixedLeft: 200, // 左侧点赞面板距离左侧位置
      fixedTop: 160, // 左侧点赞面板距离顶部位置
      pageSize: 10, //页容量
      pageIndex: 1, // 当前页
      commentId: "", // 要评论的博客评论
      replyId: "", // 要回复的评论id
      showCommentBtn: false, // 是否展示评论框按钮
      newCollection: "", // 新建收藏集
      showCollection: false, // 是否展示收藏集面板
      collectionList: [], // 收藏集列表
      newCollection: false, // 新建收藏集
      collectionType: "", // 输入的新建收藏集名称
      countNum: 0 // 更多文章总文章数
    };
  },
  async asyncData({ params, $axios }) {
    // 获取文章详情
    const data = await $axios.get("/blog/article", {
      params: { id: params.id }
    });

    if (data.error_code !== 0) {
      Message.error("获取文章失败！");
    }

    // const mdContent = marked(data.data.content || "");
    const mdContent = data.data.content || "";

    // 获取热门文章推荐
    const hotList = await $axios.get("/blog/hot", {
      params: { id: params.id }
    });

    if (hotList.error_code !== 0) {
      Message.error("获取热门文章推荐失败！");
    }

    return {
      mdContent, // 博客内容
      articleInfo: data.data, // 作者信息
      hotList: hotList.data.rows // 热门文章推荐
    };
  },
  computed: {
    currentUserInfo() {
      return this.$store.state.login.userinfo;
    },
    compiledMarkdown() {
      return marked(this.mdContent || "");
    }
  },
  created() {
    // 获取更多博客列表
    this.getMoreBlog();

    // 获取评论列表数据
    this.getReplyList();
  },
  mounted() {
    // 实时更新左侧操作面板的位置：
    this.setFixed();
  },
  methods: {
    // 选择评论emoji表情
    selectCommEmoji(emoji) {
      let input = document.getElementById("b_comm_emoji_ipt");
      let startPos = input.selectionStart;
      let endPos = input.selectionEnd;
      let resultText =
        input.value.substring(0, startPos) +
        emoji.data +
        input.value.substring(endPos);
      input.value = resultText;
      input.focus();
      input.selectionStart = startPos + emoji.data.length;
      input.selectionEnd = startPos + emoji.data.length;
      this.comment = resultText;
    },
    // 选择回复评论emoji表情
    selectReplyCommEmoji(emoji) {
      let input = document.getElementById("b_reply_comm_emoji_ipt");
      let startPos = input.selectionStart;
      let endPos = input.selectionEnd;
      let resultText =
        input.value.substring(0, startPos) +
        emoji.data +
        input.value.substring(endPos);
      input.value = resultText;
      input.focus();
      input.selectionStart = startPos + emoji.data.length;
      input.selectionEnd = startPos + emoji.data.length;
      this.replyComment = resultText;
    },
    // 选择回复回复emoji表情
    selectReplyReplyEmoji(emoji) {
      let input = document.getElementById("b_reply_reply_emoji_ipt");
      let startPos = input.selectionStart;
      let endPos = input.selectionEnd;
      let resultText =
        input.value.substring(0, startPos) +
        emoji.data +
        input.value.substring(endPos);
      input.value = resultText;
      input.focus();
      input.selectionStart = startPos + emoji.data.length;
      input.selectionEnd = startPos + emoji.data.length;
      this.replyContent = resultText;
    },
    // 跳转至评论页面
    toComment(id) {
      window.open(`/article/${id}#make_comments`, "_blank");
    },
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
          id: this.$route.params.id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      });

      if (listData.error_code === 0) {
        this.moreList.push(...listData.data.rows);

        this.countNum = listData.data.count; // 更多文章总文章数

        // 当前页数+1
        this.pageIndex += 1;
      } else {
        Message.error("更多文章获取失败！");
      }
    },
    // 获取评论列表
    async getReplyList() {
      // 获取评论列表
      const commentList = await this.$axios.get("/bcomment/list", {
        params: { blog: this.$route.params.id }
      });

      if (commentList.error_code !== 0) {
        return Message.error("获取评论列表失败！");
      }

      this.commentList = commentList.data; // 评论列表
    },
    setFixed() {
      window.addEventListener("resize", this.dealWithPosition);
    },
    toArticle(id) {
      window.open(`/article/${id}`, "_blank");
    },
    toHotArticle(id) {
      window.open(`/article/${id}#make_comments`, "_blank");
    },
    dealWithPosition() {
      this.fixedLeft = document.body.clientWidth * 0.1042;
      this.fixedTop = document.body.clientHeight * 0.083;
    },
    // 评论博客
    async makeComment() {
      if (!this.comment) return;

      const data = await this.$axios.post("/bcomment/comment", {
        blog: this.$route.params.id,
        content: this.comment
      });

      if (data.error_code !== 0) {
        Message.error("评论失败！");
      }

      // 清空评论
      this.comment = "";

      // 重新请求评论数据：
      this.getReplyList();
    },
    // 展示评论"评论"
    showToComment(id) {
      this.commentId = id;
    },
    // 隐藏评论输入框
    hiddenToComment() {
      // 隐藏博客评论输入框
      this.commentId = "";

      // 隐藏回复评论输入框
      this.replyId = "";

      // 隐藏评论输入框按钮
      this.showCommentBtn = false;

      // 隐藏展示收藏集面板
      this.showCollection = false;

      // 新建收藏集按钮回复初始状态
      this.newCollection = false;

      this.showCommEmoji = false; // 是否展示评论emoji表情选择器
      this.showReplyCommEmoji = false; // 是否展示回复评论emoji表情选择器
      this.showReplyReplyEmoji = false; // 是否展示回复回复emoji表情选择器
    },
    // 评论"博客评论"
    async replyToComment(value) {
      if (!this.replyComment) return;

      const data = await this.$axios.post("/bcomment/reply", {
        blog: this.$route.params.id,
        comment: value.id,
        content: this.replyComment,
        toUid: value.comment.id
      });

      if (data.error_code !== 0) {
        Message.error("评论失败！");
      }

      // 清空评论
      this.replyComment = "";

      // 重新请求评论数据：
      this.getReplyList();
    },
    // 回复"博客评论"
    async replyToReply(value, item) {
      if (!this.replyContent) return;

      const data = await this.$axios.post("/bcomment/reply", {
        blog: this.$route.params.id,
        comment: item.id,
        content: this.replyContent,
        toUid: value.from.id
      });

      if (data.error_code !== 0) {
        Message.error("评论失败！");
      }

      // 清空评论
      this.replyContent = "";

      // 隐藏评论框
      this.replyId = "";

      // 重新获取评论列表数据
      this.getReplyList();
    },
    // 展示回复评论输入框
    showReply(id) {
      this.replyId = id;
    },
    // 关注作者
    async follow(id) {
      const data = await this.$axios.post("/fans/follow", { leader: id });

      if (data.error_code === 0) {
        if (data.data === "ok") {
          this.articleInfo.User.isAttention = true;
        } else if (data.data === "cancel") {
          this.articleInfo.User.isAttention = false;
        }
      } else {
        Message.error("关注失败！");
      }
    },
    // 点赞博客
    async likeBlog(blogId) {
      const data = await this.$axios.post("/blike/like", { blog: blogId });

      if (data.error_code === 0) {
        if (data.data === "ok") {
          this.moreList.forEach(item => {
            if (item.id === blogId) {
              item.isLike = true;
              item.blogLikeNum++;
            }
          });
        } else if (data.data === "cancel") {
          this.moreList.forEach(item => {
            if (item.id === blogId) {
              item.isLike = false;
              item.blogLikeNum--;
            }
          });
        }
      } else {
        Message.error("操作失败！");
      }
    },
    // 点击评论按钮页面停留在评论框位置
    leaveWord() {
      let url = window.location.href;

      url = url.split("#make_comments")[0];

      window.location.href = url + "#make_comments";
    },
    // 点赞该篇博客
    async likeArt() {
      const data = await this.$axios.post("/blike/like", {
        blog: this.$route.params.id
      });

      if (data.error_code === 0) {
        if (data.data === "ok") {
          this.articleInfo.isLike = true;
          this.articleInfo.blogLikeNum += 1;
        } else if (data.data === "cancel") {
          this.articleInfo.isLike = false;
          this.articleInfo.blogLikeNum -= 1;
        }
      } else {
        Message.error("操作失败！");
      }
    },
    // 点赞评论
    async likeComment(id) {
      const data = await this.$axios.post("/clike/like", {
        commentId: id
      });

      if (data.error_code === 0) {
        if (data.data === "ok") {
          this.commentList.forEach(item => {
            if (item.id === id) {
              item.isLike = true;
              item.likeNum++;
            }
          });
        } else if (data.data === "cancel") {
          this.commentList.forEach(item => {
            if (item.id === id) {
              item.isLike = false;
              item.likeNum--;
            }
          });
        }
      } else {
        Message.error("点赞失败！");
      }
    },
    // 点赞评论回复
    async likeReply(id) {
      const data = await this.$axios.post("/rlike/like", {
        replyId: id
      });

      if (data.error_code === 0) {
        if (data.data === "ok") {
          this.commentList.forEach(item => {
            item.child.forEach(t => {
              if (t.id === id) {
                t.isLike = true;
                t.likeNum++;
              }
            });
          });
        } else if (data.data === "cancel") {
          this.commentList.forEach(item => {
            item.child.forEach(t => {
              if (t.id === id) {
                t.isLike = false;
                t.likeNum--;
              }
            });
          });
        }
      } else {
        Message.error("点赞失败！");
      }
    },
    // 展示评论框按钮
    showInputBtn() {
      this.showCommentBtn = true;
    },
    // 获取收藏集
    async makeCollection() {
      if (this.showCollection) {
        // 如果已经展开收藏面板，则隐藏面板
        this.showCollection = false;
        // 新建收藏集按钮回复初始状态
        this.newCollection = false;
        return;
      }

      // 收藏面板未展开，则展开收藏面板
      this.showCollection = true;

      // 获取收藏集列表
      this.getCollection();
    },
    // 获取收藏集列表
    async getCollection() {
      const result = await this.$axios.get("/collect/list", {
        params: {
          collectionId: this.$route.params.id
        }
      });

      if (result.error_code === 0) {
        this.collectionList = result.data;
      } else {
        Message.error("获取收藏集失败！");
      }
    },
    // 创建收藏集
    async createCollection() {
      const result = await this.$axios.post("/collect/create", {
        type: this.collectionType
      });

      if (result.error_code === 0) {
        if (result.data.type === 0) {
          this.getCollection();
        } else if (result.data.type === 1) {
          Message.error("收藏集名称已存在！");
        } else {
          Message.error("创建收藏集失败！");
        }
      } else {
        Message.error("创建收藏集失败！");
      }
    },
    // 收藏博客
    async collectBlog(data) {
      const result = await this.$axios.post("/collect/blog", {
        blogId: this.$route.params.id,
        collectionId: data.id,
        collectType: data.type
      });

      if (result.error_code === 0) {
        if (result.data.type === 0) {
          this.getCollection();

          // 更改收藏状态
          this.articleInfo.isCollect = true;
        } else if (result.data.type === 1) {
          return;
        } else {
          Message.error("收藏失败！");
        }
      } else {
        Message.error("收藏失败！");
      }
    },
    async likeHotArticle(blogId) {
      const data = await this.$axios.post("/blike/like", { blog: blogId });

      if (data.error_code === 0) {
        if (data.data === "ok") {
          this.hotList.forEach(item => {
            if (item.id === blogId) {
              item.isLike = true;
              item.blogLikeNum++;
            }
          });
        } else if (data.data === "cancel") {
          this.hotList.forEach(item => {
            if (item.id === blogId) {
              item.isLike = false;
              item.blogLikeNum--;
            }
          });
        }
      } else {
        Message.error("操作失败！");
      }
    },
    // 跳转至用户页
    toUserPage(id) {
      window.open(`/user/${id}`);
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.dealWithPosition);
  }
};
</script>

<style></style>
