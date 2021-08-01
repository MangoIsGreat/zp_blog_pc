<template>
  <div class="circle-box" @click.stop="hiddenCommenBtn">
    <div class="circle-wrapper">
      <div class="circle-menu">
        <div class="circle-menu-item">
          推荐
        </div>
        <div class="circle-menu-item">
          热门
        </div>
        <div class="circle-menu-item circle-menu-item-attention">
          关注
        </div>
        <div class="cutting-line"></div>
        <div
          v-for="(item, index) in menuList"
          :key="index"
          class="circle-menu-item"
        >
          {{ item }}
        </div>
      </div>
      <div class="circle-content">
        <div class="circle-content-innerBox">
          <div class="innerBox-publish">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="留下你的想法，大家一起参与讨论吧..."
              v-model="content"
              resize="none"
            >
            </el-input>
            <div class="publish-operateLine">
              <div class="operateLine-left">
                <el-button class="operateLine-left-item" type="text"
                  >表情</el-button
                >
                <el-button class="operateLine-left-item" type="text"
                  >图片</el-button
                >
                <el-button class="operateLine-left-item" type="text"
                  ># 话题</el-button
                >
              </div>
              <el-button @click="publish" type="primary" size="small"
                >发布</el-button
              >
            </div>
          </div>
          <ul
            class="infinite-list circle-content-list-box"
            v-infinite-scroll="loadData"
            :infinite-scroll-delay="500"
            :infinite-scroll-distance="60"
          >
            <li
              v-for="(item, index) in listData"
              :key="index"
              class="infinite-list-item circle-content-list-item"
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
                        &nbsp; ·&nbsp;
                        <div class="details-time">一分钟前</div>
                      </div>
                    </div>
                  </div>
                  <el-button
                    @click="follow(item.userInfo.id)"
                    size="mini"
                    class="list-item-info-follow"
                  >
                    <span v-if="!item.isAttention">关注</span
                    ><span class="not-attention" v-else>已关注</span>
                  </el-button>
                </div>
                <div class="list-item-desc">
                  {{ item.content }}
                </div>
              </div>
              <div class="list-item-operate">
                <div class="list-item-operate-t">
                  <i class="iconfont icon-dianzan">&nbsp;赞</i>
                </div>
                <div
                  class="list-item-operate-t"
                  @click="toggleComment(item.id)"
                >
                  <i class="iconfont icon-pinglun">&nbsp;评论</i>
                </div>
                <div class="list-item-operate-t">
                  <i class="iconfont icon-fenxiang">&nbsp;分享</i>
                </div>
              </div>
              <div class="comment-box" v-if="dynamicId === item.id">
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
                      @click.stop="makeComment(item.id)"
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
                          <i class="iconfont icon-dianzan"></i>
                          <i
                            class="iconfont icon-pinglun"
                            @click.stop="showReply = true"
                            >&nbsp;回复</i
                          >
                        </div>
                      </div>
                      <!-- 回复评论 -->
                      <div v-if="showReply" class="make-comments" @click.stop>
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
                            :placeholder="`回复${item.userInfo.nickname}...`"
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
                              <i class="iconfont icon-dianzan"></i>
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
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="circle-info">
        <div class="circle-info-authorInfo">
          <div class="authorInfo-top">
            <img
              :src="userInfo && userInfo.avatar"
              class="authorInfo-top-avatar"
            />
            <div class="authorInfo-top-info">
              <div class="authorInfo-top-info-name">
                {{ userInfo && userInfo.nickname }}
              </div>
              <div class="authorInfo-top-info-job">
                {{ userInfo && userInfo.profession }}
              </div>
            </div>
          </div>
          <div class="authorInfo-bottom">
            <div class="authorInfo-bottom-item">
              <div class="bottom-item-box">
                <div class="authorInfo-bottom-item-title">关注</div>
                <div class="authorInfo-bottom-item-num">
                  {{ userInfo && userInfo.idolNum }}
                </div>
              </div>
            </div>
            <div class="authorInfo-bottom-item">
              <div class="bottom-item-box">
                <div class="authorInfo-bottom-item-title">关注者</div>
                <div class="authorInfo-bottom-item-num">
                  {{ userInfo && userInfo.fansNum }}
                </div>
              </div>
            </div>
            <div class="authorInfo-bottom-item">
              <div class="bottom-item-box">
                <div class="authorInfo-bottom-item-title">获赞</div>
                <div class="authorInfo-bottom-item-num">
                  {{ userInfo && userInfo.blogLikeNum }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="circle-info-great">
          <div class="great-title">精选留言</div>
          <div class="great-wrapper">
            <div
              class="great-wrapper-item"
              v-for="(item, index) in messageList"
              :key="index"
            >
              <div class="content-left">
                <div class="content-left-title">
                  {{ item.content }}
                </div>
                <div class="content-left-operate">
                  <div class="operate-star">0&nbsp;赞</div>
                  &nbsp;·&nbsp;
                  <div class="operate-comment">11&nbsp;评论</div>
                </div>
              </div>
              <img
                src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70dbcf3837cc47e5b951c7ff9e98ab48~tplv-k3u1fbpfcp-zoom-mark-crop-v2:460:460:0:0.awebp"
                class="content-pic"
              />
            </div>
          </div>
        </div>
        <div class="circle-poster"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLocalStorage } from "../utils/store";

export default {
  layout: "default",
  data() {
    return {
      userInfo: null, // 用户信息
      menuList: ["上班摸鱼", "内推招聘"],
      listData: [], // "动态"列表数据
      messageList: [], // 精选留言
      content: "", // 输入的内容
      theme: "", // 当前选中的动态主题
      type: "new", // 当前选中的"动态"类型 -- recommend/hot/attention
      picUrl: "", // 上传的图片
      pageIndex: 2, // 当前动态是第几页
      pageSize: 15, // 当前请求数据数
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
  async asyncData({ $axios }) {
    // 获取"动态"列表数据
    const data = await $axios.get("/dynamic/list", {
      params: {
        type: "new", // 动态类型 -- 推荐/热门/关注
        theme: "", // 当前选中的动态主题
        pageIndex: 1,
        pageSize: 15
      }
    });

    if (data.error_code !== 0) {
      Message.error("标签类型获取失败");
    }

    // 获取精选留言数据
    const favList = await $axios.get("/dynamic/favlist");

    if (favList.error_code !== 0) {
      Message.error("精选留言获取失败");
    }

    return {
      listData: data.data, // 动态列表数据
      countNum: data.data.count, // 总"动态"条数
      messageList: favList.data // 精选留言
    };
  },
  mounted() {
    console.log(111);
    // 获取用户信息
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      console.log(222);
      this.userInfo = getLocalStorage("user_info");
      console.log(this.userInfo);
    },
    loadData() {
      // 当前页大于总页数时停止请求数据：
      if (this.pageIndex > Math.ceil(this.countNum / this.pageSize)) return;

      // 下拉加载更多：
      this.getList();
    },
    // 发布动态
    async publish() {
      const data = await this.$axios.post("/dynamic/create", {
        theme: this.theme,
        content: this.content,
        picUrl: this.picUrl
      });

      if (data.error_code === 0) {
        // 还原pageIndex到第一页:
        this.pageIndex = 1;
        // 还原listData
        this.listData = [];
        // 清空输入框
        this.content = "";

        this.getList();
      } else {
        Message.error("发布动态失败！");
      }
    },
    // 获取动态列表
    async getList() {
      const data = await this.$axios.get("/dynamic/list", {
        params: {
          type: this.type, // 动态类型 -- 推荐/热门/关注
          theme: this.theme, // 当前选中的动态主题
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      });

      if (data.error_code === 0) {
        data.data.forEach(item => {
          this.listData.push(item);
        });

        // 当前页数+1
        this.pageIndex += 1;
      } else {
        Message.error("获取数据失败！");
      }
    },
    // 关注作者
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
    }
  }
};
</script>

<style></style>
