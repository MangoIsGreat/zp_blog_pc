<template>
  <div class="circle-detail-wrapper" @click.stop="hiddenReply">
    <div class="circle-detail-wrapper-innerBox">
      <div class="wrapper-innerBox-content">
        <div class="list-item-top">
          <div class="list-item-info">
            <div class="list-item-info-left">
              <img
                :src="dynData.User.avatar"
                class="list-item-info-left-avatar"
              />
              <div class="list-item-info-left-info">
                <div class="list-item-info-left-info-title">
                  {{ dynData.User.nickname }}
                </div>
                <div class="list-item-info-left-info-details">
                  <div class="details-job">
                    {{ dynData.User.profession }}
                  </div>
                  &nbsp; ·&nbsp;
                  <div class="details-time">一分钟前</div>
                </div>
              </div>
            </div>
            <el-button
              v-if="!dynData.User.isSelf"
              @click="follow(dynData.User.id)"
              size="mini"
              class="list-item-info-follow"
            >
              <span v-if="!dynData.isAttention">关注</span
              ><span class="not-attention" v-else>已关注</span>
            </el-button>
          </div>
          <div class="list-item-desc">
            <span class="list-item-desc-theme" v-if="dynData.theme">{{ `#${dynData.theme}#` }}</span
            >&nbsp;{{ dynData.content }}
          </div>
          <!-- <div class="list-item-theme" v-if="dynData.theme">
            {{ `#${dynData.theme}#` }}
          </div> -->
          <div class="list-item-photo">
            <img
              :src="pic"
              class="list-item-photo-t"
              v-for="(pic, picIndex) in dynData.picUrl"
              :key="picIndex"
            />
          </div>
        </div>
        <div class="list-item-operate">
          <div class="list-item-operate-t" @click="likeDynamic(dynData.id)">
            <i
              :class="
                `iconfont ${dynData.isLike ? 'icon-dianzan1' : 'icon-dianzan'}`
              "
              :style="{
                color: dynData.isLike ? '#2de938' : '#4e5969'
              }"
              >&nbsp;{{ !dynData.likeNum ? "赞" : dynData.likeNum }}</i
            >
          </div>
          <div class="list-item-operate-t">
            <i class="iconfont icon-pinglun"
              >&nbsp;{{ !dynData.commNum ? "评论" : dynData.commNum }}</i
            >
          </div>
          <div class="list-item-operate-t">
            <i class="iconfont icon-fenxiang">&nbsp;分享</i>
          </div>
        </div>
        <div class="comment-box">
          <!-- 评论 -->
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
                @click.stop="makeComment(dynData.id)"
                size="small"
                type="primary"
                >评论</el-button
              >
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
                          itm.isLike ? 'icon-dianzan1' : 'icon-dianzan'
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
                      :placeholder="`回复${itm.userInfo.nickname}...`"
                    ></el-input>
                  </div>
                  <div class="second-line">
                    <div class="emoj">表情</div>
                    <el-button
                      @click.stop="replyToComment(itm, dynData)"
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
                        v-if="dynData.User.id === t.from.id"
                      >
                        (作者)
                      </div>
                      <div class="right-firstline-job">
                        {{ t.from.profession }}
                      </div>
                    </div>
                    <div class="body-innerBox-right-content">
                      回复&nbsp;<span class="reply">{{ t.to.nickname }}</span
                      >：{{ t.content }}
                    </div>
                    <div class="body-innerBox-right-bottomline">
                      <div class="right-bottomline-time">两天前</div>
                      <div class="right-bottomline-reply">
                        <i
                          :class="
                            `iconfont ${
                              t.isLike ? 'icon-dianzan1' : 'icon-dianzan'
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
                          @click.stop="replyToReply(t, itm, dynData)"
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
        </div>
      </div>
      <div class="wrapper-innerBox-great">
        <div class="circle-info-great">
          <div class="great-title">精选留言</div>
          <div class="great-wrapper">
            <div
              class="great-wrapper-item"
              v-for="(item, index) in messageList"
              :key="index"
              @click="toDetailPage(item.id)"
            >
              <div class="content-left">
                <div class="content-left-title">
                  {{ item.content }}
                </div>
                <div class="content-left-operate">
                  <div class="operate-star">{{ item.likeNum }}&nbsp;赞</div>
                  &nbsp;·&nbsp;
                  <div class="operate-comment">
                    {{ item.commNum }}&nbsp;评论
                  </div>
                </div>
              </div>
              <div
                :style="{ backgroundImage: `url(${item.picUrl[0]})` }"
                v-if="item.picUrl"
                class="content-pic"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
  data() {
    return {
      comment: "", // 评论动态
      replyComment: "", // 回复评论动态
      replyToReplyValue: "", // 回复评论回复动态
      commentList: [], // 评论列表
      showComment: false, // 是否展示评论按钮
      showReplyToReply: "", // 是否展示评论回复评论按钮
      showReply: "" // 是否展示回复评论
    };
  },
  async asyncData({ $axios, query }) {
    // 获取"动态"列表数据
    const data = await $axios.get("/dynamic/dynamic", {
      params: {
        id: query.id
      }
    });

    if (data.error_code !== 0) {
      Message.error("动态数据获取失败");
    }

    if (data.data.picUrl) {
      data.data.picUrl = JSON.parse(data.data.picUrl);
    }

    // 获取精选留言数据
    const favList = await $axios.get("/dynamic/favlist");

    if (favList.error_code !== 0) {
      Message.error("精选留言获取失败");
    }

    favList.data.forEach(item => {
      if (item.picUrl) {
        item.picUrl = JSON.parse(item.picUrl);
      }
    });

    // 获取评论列表
    const commentList = await $axios.get("/dcomment/list", {
      params: { dynamicId: query.id }
    });

    if (commentList.error_code !== 0) {
      Message.error("获取评论列表失败！");
    }

    return {
      dynData: data.data, // 动态数据
      messageList: favList.data, // 精选留言
      commentList: commentList.data // 评论列表数据
    };
  },
  methods: {
    // 关注作者
    async follow(id) {
      const data = await this.$axios.post("/fans/follow", { leader: id });

      if (data.error_code === 0) {
        if (data.data === "ok") {
          if (this.dynData.User.id === id) {
            this.dynData.isAttention = true;
          }
        } else if (data.data === "cancel") {
          if (this.dynData.User.id === id) {
            this.dynData.isAttention = false;
          }
        }
      } else {
        Message.error("关注失败！");
      }
    },
    // 评论动态
    async makeComment(dId) {
      if (!this.comment) return;

      const data = await this.$axios.post("/dcomment/comment", {
        dynamic: this.$route.query.id,
        content: this.comment
      });

      if (data.error_code !== 0) {
        Message.error("评论失败！");
      }

      if (data.data === "ok") {
        if (this.dynData.id === dId) {
          this.dynData.commNum++;
        }
      }

      // 清空评论
      this.comment = "";

      // 重新请求评论数据：
      this.getReplyList();
    },
    // 获取动态评论
    async getReplyList() {
      // 获取评论列表
      const commentList = await this.$axios.get("/dcomment/list", {
        params: { dynamicId: this.$route.query.id }
      });

      if (commentList.error_code !== 0) {
        Message.error("获取评论列表失败！");
      }

      this.commentList = commentList.data; // 评论列表
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
      this.getReplyList();
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
      this.getReplyList();
    },
    // 点赞动态
    async likeDynamic(dynamicId) {
      const data = await this.$axios.post("/dlike/like", {
        dynamicId: dynamicId
      });

      if (data.error_code === 0) {
        if (data.data === "ok") {
          if (this.dynData.id === dynamicId) {
            this.dynData.isLike = true;
            this.dynData.likeNum++;
          }
        } else if (data.data === "cancel") {
          if (this.dynData.id === dynamicId) {
            this.dynData.isLike = false;
            this.dynData.likeNum--;
          }
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
    // 隐藏输入按钮等
    hiddenReply() {
      // 隐藏评论按钮
      this.showComment = false;

      // 隐藏评论回复按钮
      this.showReply = "";

      // 隐藏评论回复评论按钮
      this.showReplyToReply = "";
    },
    // 跳转至动态详情页
    toDetailPage(id) {
      window.open(`/circle-detail?id=${id}`);
    }
  }
};
</script>

<style></style>
