<template>
  <div class="user-wrapper" @click.stop="hiddenCommenBtn">
    <div class="user-wrapper-innerBox">
      <div class="user-wrapper-innerBox-content">
        <div class="innerBox-content-user">
          <div class="innerBox-content-user-detail">
            <img
              class="avatar"
              src="https://user-gold-cdn.xitu.io/2020/1/18/16fb901f1bac3975?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1"
              alt=""
            />
            <div class="user-detail-right">
              <div class="user-detail-right-nickname">橘猫横放</div>
              <div class="user-detail-right-job">
                <i class="iconfont icon-work" />&nbsp;&nbsp;前端开发工程师
              </div>
              <div class="user-detail-right-desc">
                <i class="iconfont icon-mingpian" />&nbsp;&nbsp;你会变强的
              </div>
            </div>
          </div>
          <div class="innerBox-content-user-right">
            <el-button class="edit-userinfo" size="small" plain
              >编辑个人资料</el-button
            >
          </div>
        </div>
        <div class="innerBox-content-content">
          <div class="innerBox-content-content-type">
            <div
              :class="[
                { 'list-type-active': selectItem === 'dynamic' },
                'content-type-item'
              ]"
              @click="checkType('dynamic')"
            >
              动态
            </div>
            <div
              :class="[
                { 'list-type-active': selectItem === 'article' },
                'content-type-item'
              ]"
              @click="checkType('article')"
            >
              文章
            </div>
            <div
              :class="[
                { 'list-type-active': selectItem === 'chat' },
                'content-type-item'
              ]"
              @click="checkType('chat')"
            >
              互动
            </div>
            <div class="content-type-item">
              赞&nbsp;<span>184</span><i class="iconfont icon-xiangxia"></i>
            </div>
            <div class="content-type-item">
              更多<i class="iconfont icon-xiangxia"></i>
            </div>
          </div>
          <div class="innerBox-content-content-list">
            <div
              class="infinite-list list-wrapper"
              v-infinite-scroll="loadData"
              :infinite-scroll-delay="500"
              :infinite-scroll-distance="60"
            >
              <!-- 动态 -->
              <div
                v-if="selectItem === 'dynamic'"
                class="list-wrapper-innerBox list-wrapper-innerBox-dynamic"
              >
                <div
                  v-for="(item, index) in listData"
                  :key="index"
                  class="infinite-list-item list-item"
                  @click="toArticle(item.id)"
                ></div>
              </div>
              <!-- 文章 -->
              <div
                v-if="selectItem === 'article'"
                class="list-wrapper-innerBox list-wrapper-innerBox-article"
              >
                <div
                  v-for="(item, index) in listData"
                  :key="index"
                  class="infinite-list-item list-item"
                  @click="toArticle(item.id)"
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
                    <img class="content-right" :src="item.titlePic" />
                  </div>
                </div>
              </div>
              <!-- 互动 -->
              <div
                v-if="selectItem === 'chat'"
                class="list-wrapper-innerBox list-wrapper-innerBox-chat"
              >
                <div
                  v-for="(item, index) in listData"
                  :key="index"
                  class="infinite-list-item list-item"
                >
                  <div class="list-item-top">
                    <div class="list-item-info">
                      <div class="list-item-info-left">
                        <img
                          :src="item.userInfo.avatar"
                          class="list-item-info-left-avatar"
                        />
                        <div class="list-item-info-left-info">
                          <div class="list-item-info-left-info-title">
                            {{ item.userInfo.nickname }}
                          </div>
                          <div class="list-item-info-left-info-details">
                            <div class="details-job">
                              {{ item.userInfo.profession }}
                            </div>
                            &nbsp; <span v-if="item.userInfo.profession">·</span>&nbsp;
                            <div class="details-time">一分钟前</div>
                          </div>
                        </div>
                      </div>
                      <el-button
                        v-if="!item.isSelf"
                        @click="follow(item.userInfo.id)"
                        size="mini"
                        class="list-item-info-follow"
                      >
                        <span v-if="!item.isAttention">关注</span
                        ><span class="not-attention" v-else>已关注</span>
                      </el-button>
                    </div>
                    <div class="list-item-desc">
                      <span class="list-item-desc-theme" v-if="item.theme">{{
                        `#${item.theme}# `
                      }}</span
                      >{{ item.content }}
                    </div>
                  </div>
                  <div class="list-item-photo">
                    <img
                      :src="pic"
                      class="list-item-photo-t"
                      v-for="(pic, picIndex) in item.picUrl"
                      :key="picIndex"
                    />
                  </div>
                  <div class="list-item-operate">
                    <div
                      class="list-item-operate-t"
                      @click="likeDynamic(item.id)"
                    >
                      <i
                        :class="
                          `iconfont ${
                            item.isLike ? 'icon-dianzan1' : 'icon-dianzan'
                          }`
                        "
                        :style="{
                          color: item.isLike ? '#2de938' : '#4e5969'
                        }"
                        >&nbsp;{{ !item.likeNum ? "赞" : item.likeNum }}</i
                      >
                    </div>
                    <div
                      class="list-item-operate-t"
                      @click="toggleComment(item.id)"
                    >
                      <i class="iconfont icon-pinglun"
                        >&nbsp;{{ !item.commNum ? "评论" : item.commNum }}</i
                      >
                    </div>
                    <div class="list-item-operate-t">
                      <i class="iconfont icon-fenxiang">&nbsp;分享</i>
                    </div>
                  </div>
                  <!-- 动态-评论 -->
                  <div class="comment-box" v-if="dynamicId === item.id">
                    <div class="comment-box-innerBox">
                      <div class="make-comments" @click.stop>
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
                            @focus="showComment = true"
                          ></el-input>
                        </div>
                        <div class="second-line" v-if="showComment">
                          <div class="emoj">表情</div>
                          <el-button
                            @click.stop="makeComment(item.id)"
                            size="small"
                            type="primary"
                            >评论</el-button
                          >
                        </div>
                      </div>
                    </div>
                    <div class="comments-main-body">
                      <div
                        class="comments-main-body-innerBox"
                        v-for="(itm, idx) in commentList"
                        :key="idx"
                      >
                        <img class="avatar" :src="itm.userInfo.avatar" alt="" />
                        <div class="main-body-innerBox-right">
                          <div class="body-innerBox-right-firstline">
                            <div class="right-firstline-nickname">
                              {{ itm.userInfo.nickname }}
                            </div>
                            <div class="right-firstline-job">
                              {{ itm.userInfo.profession }}
                            </div>
                          </div>
                          <div class="body-innerBox-right-content">
                            {{ itm.content }}
                          </div>
                          <div class="body-innerBox-right-bottomline">
                            <div class="right-bottomline-time">两天前</div>
                            <div class="right-bottomline-reply">
                              <i
                                @click.stop="likeComment(itm.id)"
                                :class="
                                  `iconfont ${
                                    itm.isLike
                                      ? 'icon-dianzan1'
                                      : 'icon-dianzan'
                                  }`
                                "
                                :style="{
                                  color: itm.isLike ? '#2de938' : '#4e5969'
                                }"
                                >{{ !itm.likeNum ? "赞" : itm.likeNum }}</i
                              >
                              <i
                                class="iconfont icon-pinglun"
                                @click.stop="showReply = itm.id"
                                >&nbsp;回复</i
                              >
                            </div>
                          </div>
                          <!-- 回复评论 -->
                          <div
                            v-if="showReply === itm.id"
                            class="make-comments"
                            @click.stop
                          >
                            <div class="first-line">
                              <img
                                src="https://user-gold-cdn.xitu.io/2020/1/18/16fb901f1bac3975?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
                                alt=""
                                class="avatar"
                              />
                              <el-input
                                size="small"
                                class="input-btn"
                                v-model="replyComment"
                                :placeholder="
                                  `回复${item.userInfo.nickname}...`
                                "
                              ></el-input>
                            </div>
                            <div class="second-line">
                              <div class="emoj">表情</div>
                              <el-button
                                @click.stop="replyToComment(itm, item)"
                                size="small"
                                type="primary"
                                >评论</el-button
                              >
                            </div>
                          </div>
                          <div
                            class="body-innerBox-reply"
                            v-for="(t, i) in itm.child"
                            :key="i"
                          >
                            <img class="avatar" :src="t.from.avatar" alt="" />
                            <div class="main-body-innerBox-right">
                              <div class="body-innerBox-right-firstline">
                                <div class="right-firstline-nickname">
                                  {{ t.from.nickname }}
                                </div>
                                <div
                                  class="identity"
                                  v-if="item.userInfo.id === t.from.id"
                                >
                                  (作者)
                                </div>
                                <div class="right-firstline-job">
                                  {{ t.from.profession }}
                                </div>
                              </div>
                              <div class="body-innerBox-right-content">
                                回复&nbsp;<span class="reply">{{
                                  t.to.nickname
                                }}</span
                                >：{{ t.content }}
                              </div>
                              <div class="body-innerBox-right-bottomline">
                                <div class="right-bottomline-time">两天前</div>
                                <div class="right-bottomline-reply">
                                  <i
                                    :class="
                                      `iconfont ${
                                        t.isLike
                                          ? 'icon-dianzan1'
                                          : 'icon-dianzan'
                                      }`
                                    "
                                    :style="{
                                      color: t.isLike ? '#2de938' : '#4e5969'
                                    }"
                                    @click.stop="likeReply(t.id)"
                                    >{{ !t.likeNum ? "赞" : t.likeNum }}</i
                                  >
                                  <i
                                    @click.stop="showReplyToReply = t.id"
                                    class="iconfont icon-pinglun"
                                    >&nbsp;回复</i
                                  >
                                </div>
                              </div>
                              <!-- 回复“评论回复” -->
                              <div
                                v-if="showReplyToReply === t.id"
                                class="make-comments"
                                @click.stop
                              >
                                <div class="first-line">
                                  <img
                                    src="https://user-gold-cdn.xitu.io/2020/1/18/16fb901f1bac3975?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
                                    alt=""
                                    class="avatar"
                                  />
                                  <el-input
                                    size="small"
                                    class="input-btn"
                                    v-model="replyToReplyValue"
                                    :placeholder="`回复${t.from.nickname}...`"
                                  ></el-input>
                                </div>
                                <div class="second-line">
                                  <div class="emoj">表情</div>
                                  <el-button
                                    @click.stop="replyToReply(t, itm, item)"
                                    size="small"
                                    type="primary"
                                    >评论</el-button
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 查看评论详情页 -->
                    <div
                      class="comment-detail-page"
                      @click="toDetailPage(item.id)"
                    >
                      查看更多&gt;
                    </div>
                  </div>
                </div>
              </div>
              <!-- 赞-文章 -->
              <div
                v-if="selectItem === 'likeArt'"
                class="list-wrapper-innerBox"
              >
                <div
                  v-for="(item, index) in listData"
                  :key="index"
                  class="infinite-list-item list-item"
                  @click="toArticle(item.id)"
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
                        <div @click.stop="comment(item.id)">
                          <i class="iconfont icon-pinglun"
                            >&nbsp;{{ item.commentNum }}</i
                          >
                        </div>
                      </div>
                    </div>
                    <img class="content-right" :src="item.titlePic" />
                  </div>
                </div>
              </div>
              <!-- 赞-互动 -->
              <div
                v-if="selectItem === 'likeChat'"
                class="list-wrapper-innerBox"
              >
                <div
                  v-for="(item, index) in listData"
                  :key="index"
                  class="infinite-list-item list-item"
                  @click="toArticle(item.id)"
                ></div>
              </div>
              <!-- 赞-资讯 -->
              <div
                v-if="selectItem === 'likeNews'"
                class="list-wrapper-innerBox"
              >
                <div
                  v-for="(item, index) in listData"
                  :key="index"
                  class="infinite-list-item list-item"
                  @click="toArticle(item.id)"
                ></div>
              </div>
              <!-- 更多-收藏集 -->
              <div
                v-if="selectItem === 'moreCollection'"
                class="list-wrapper-innerBox"
              >
                <div
                  v-for="(item, index) in listData"
                  :key="index"
                  class="infinite-list-item list-item"
                  @click="toArticle(item.id)"
                ></div>
              </div>
              <!-- 更多-关注 -->
              <div
                v-if="selectItem === 'moreAttention'"
                class="list-wrapper-innerBox"
              >
                <div
                  v-for="(item, index) in listData"
                  :key="index"
                  class="infinite-list-item list-item"
                  @click="toArticle(item.id)"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="user-wrapper-innerBox-aside">
        <div class="innerBox-aside-userinfo"></div>
        <div class="innerBox-aside-attention"></div>
        <div class="innerBox-aside-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";

export default {
  layout: "default",
  data() {
    return {
      selectItem: "dynamic", // 选中的类型
      listData: [], // 列表数据
      pageSize: 15,
      pageIndex: 2,
      comment: "", // "动态"评论
      commentList: [], // 评论列表
      dynamicId: "", // 当前选中的“动态”id号
      showComment: false, // 是否展示评论输入框
      replyComment: "", // 回复评论
      replyToReplyValue: "", // 回复评论回复
      showReply: false, // 是否展示评论回复输入框
      showReplyToReply: "" // 是否展示回复评论输入框
    };
  },
  methods: {
    loadData() {},
    // 选中的要展示的数据
    checkType(value) {
      this.selectItem = value;
      // 清空数据
      this.listData = [];

      switch (this.selectItem) {
        case "article":
          this.getArtData();
          break;
        case "chat":
          this.getChatData();
          break;
        default:
          break;
      }
    },
    // 获取文章列表数据
    async getArtData() {
      const data = await this.$axios.get("/author/artlist", {
        params: {
          uid: this.$route.query.id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      });

      if (data.error_code === 0) {
        this.listData = data.data.rows;
      } else {
        Message.error("文章数据获取失败");
      }
    },
    // 获取动态列表数据
    async getChatData() {
      const data = await this.$axios.get("/author/dynlist", {
        params: {
          uid: this.$route.query.id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      });

      if (data.error_code === 0) {
        data.data.rows.forEach(item => {
          if (item.picUrl) {
            item.picUrl = JSON.parse(item.picUrl);
          }
        });

        this.listData = data.data.rows;
      } else {
        Message.error("文章数据获取失败");
      }
    },
    // 跳转到文章页
    toArticle(id) {
      window.open(`/article?id=${id}`, "_blank");
    },
    // 点赞博客
    async likeBlog(blogId) {
      const data = await this.$axios.post("/blike/like", { blog: blogId });

      if (data.error_code === 0) {
        if (data.data === "ok") {
          this.listData.forEach(item => {
            if (item.id === blogId) {
              item.isLike = true;
              item.blogLikeNum++;
            }
          });
        } else if (data.data === "cancel") {
          this.listData.forEach(item => {
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
    // 关注"动态"作者
    async follow(id) {
      const data = await this.$axios.post("/fans/follow", { leader: id });

      if (data.error_code === 0) {
        if (data.data === "ok") {
          this.listData.forEach(item => {
            if (item.userInfo.id === id) {
              item.isAttention = true;
            }
          });
        } else if (data.data === "cancel") {
          this.listData.forEach(item => {
            if (item.userInfo.id === id) {
              item.isAttention = false;
            }
          });
        }
      } else {
        Message.error("关注失败！");
      }
    },
    // 评论动态
    async makeComment(dId) {
      if (!this.comment) return;

      const data = await this.$axios.post("/dcomment/comment", {
        dynamic: dId,
        content: this.comment
      });

      if (data.error_code !== 0) {
        Message.error("评论失败！");
      }

      if (data.data === "ok") {
        this.listData.forEach(item => {
          if (item.id === dId) {
            item.commNum++;
          }
        });
      }

      // 清空评论
      this.comment = "";

      // 重新请求评论数据：
      this.getReplyList(this.dynamicId);
    },
    // 获取动态评论
    async getReplyList(dId) {
      // 获取评论列表
      const commentList = await this.$axios.get("/dcomment/list", {
        params: { dynamicId: dId }
      });

      if (commentList.error_code !== 0) {
        Message.error("获取评论列表失败！");
      }

      this.commentList = commentList.data; // 评论列表
    },
    // 是否展示评论面板
    toggleComment(commenId) {
      // 未展开评论面板则展开
      if (!this.dynamicId) {
        this.dynamicId = commenId;

        // 重新请求评论数据：
        this.getReplyList(commenId);

        return;
      }

      // 否则关闭评论面板
      this.dynamicId = "";
      // 关闭面板清空数据
      this.commentList = [];
    },
    // 隐藏评论按钮
    hiddenCommenBtn() {
      // 隐藏“动态”评论输入框
      this.showComment = false;
      // 隐藏"动态评论"回复输入框
      this.showReply = false;
      // 隐藏“动态评论回复”回复输入框
      this.showReplyToReply = "";
      // 隐藏选择"主题"面板
      this.showTheme = false;
      // 隐藏图片上传按钮
      this.showUpload = false;
    },
    // 评论"动态评论"
    async replyToComment(comment, dynamic) {
      if (!this.replyComment) return;

      const data = await this.$axios.post("/dcomment/reply", {
        dynamicId: dynamic.id,
        commentId: comment.id,
        content: this.replyComment,
        toUid: comment.userInfo.id
      });

      if (data.error_code !== 0) {
        Message.error("评论失败！");
      }

      // 清空评论
      this.replyComment = "";

      // 重新请求评论数据：
      this.getReplyList(this.dynamicId);
    },
    // 回复"评论回复"
    async replyToReply(value, item, dynamic) {
      const data = await this.$axios.post("/dcomment/reply", {
        dynamicId: dynamic.id,
        commentId: item.id,
        content: this.replyToReplyValue,
        toUid: value.from.id
      });

      if (data.error_code !== 0) {
        Message.error("评论失败！");
      }

      // 清空评论
      this.replyToReplyValue = "";

      // 隐藏评论框
      this.showReplyToReply = "";

      // 重新获取评论列表数据
      this.getReplyList(this.dynamicId);
    },
    // 点赞动态
    async likeDynamic(dynamicId) {
      const data = await this.$axios.post("/dlike/like", {
        dynamicId: dynamicId
      });

      if (data.error_code === 0) {
        if (data.data === "ok") {
          this.listData.forEach(item => {
            if (item.id === dynamicId) {
              item.isLike = true;
              item.likeNum++;
            }
          });
        } else if (data.data === "cancel") {
          this.listData.forEach(item => {
            if (item.id === dynamicId) {
              item.isLike = false;
              item.likeNum--;
            }
          });
        }
      } else {
        Message.error("操作失败！");
      }
    },
    // 点赞评论
    async likeComment(id) {
      const data = await this.$axios.post("/cDlike/like", {
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
      const data = await this.$axios.post("/rDlike/like", {
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
    // 跳转至动态详情页
    toDetailPage(id) {
      window.open(`/circle-detail?id=${id}`);
    },
    toComment(id) {
      window.open(`/article?id=${id}#make_comments`, "_blank");
    },
    // 隐藏评论输入框
    hiddenToComment() {}
  }
};
</script>

<style></style>
