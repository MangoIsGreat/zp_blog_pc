<template>
  <div class="circle-box" @click="hiddenCommenBtn">
    <div class="circle-wrapper">
      <div class="circle-menu">
        <div
          class="circle-menu-item"
          @click="setMenu('new')"
          :style="{
            color: selectedMenu === 'new' ? '#fff' : '#909090',
            backgroundColor: selectedMenu === 'new' ? '#00c58e' : '#fff'
          }"
        >
          推荐
        </div>
        <div
          class="circle-menu-item"
          @click="setMenu('hot')"
          :style="{
            color: selectedMenu === 'hot' ? '#fff' : '#909090',
            backgroundColor: selectedMenu === 'hot' ? '#00c58e' : '#fff'
          }"
        >
          热门
        </div>
        <div
          class="circle-menu-item circle-menu-item-attention"
          @click="setMenu('attention')"
          :style="{
            color: selectedMenu === 'attention' ? '#fff' : '#909090',
            backgroundColor: selectedMenu === 'attention' ? '#00c58e' : '#fff'
          }"
        >
          关注
        </div>
        <div class="cutting-line"></div>
        <div
          v-for="(item, index) in menuList"
          :key="index"
          class="circle-menu-item"
          @click="setMenu(item.themeName)"
          :style="{
            color: selectedMenu === item.themeName ? '#fff' : '#909090',
            backgroundColor:
              selectedMenu === item.themeName ? '#00c58e' : '#fff'
          }"
        >
          {{ item.themeName }}
        </div>
      </div>
      <div class="circle-content">
        <div class="circle-content-innerBox">
          <div class="innerBox-publish">
            <el-input
              id="circle_input"
              type="textarea"
              :rows="3"
              placeholder="留下你的想法，大家一起参与讨论吧..."
              v-model="content"
              resize="none"
              :maxlength="300"
              :show-word-limit="true"
            >
            </el-input>
            <div class="publish-operateLine">
              <div class="operateLine-left">
                <el-button
                  @click.stop="showEmoji = !showEmoji"
                  class="operateLine-left-item"
                  type="text"
                  ><i class="iconfont icon-hanhan-01-01"></i>表情</el-button
                >
                <el-button
                  @click.stop="showUpload = true"
                  class="operateLine-left-item"
                  type="text"
                  >图片</el-button
                >
                <div class="operateLine-left-item operateLine-left-item-topic">
                  <el-button
                    @click.stop="addTheme"
                    class="topic-btn"
                    type="text"
                    ># 话题</el-button
                  >
                  <div @click.stop v-if="showTheme" class="topic-panel">
                    <div class="topic-panel-header">话题列表</div>
                    <div class="topic-panel-innerBox">
                      <div class="topic-panel-innerBox-item">
                        <div
                          @click="setTheme({ themeName: '', id: '' })"
                          class="panel-innerBox-item-name"
                        >
                          不添加任何话题
                        </div>
                      </div>
                      <div
                        class="topic-panel-innerBox-item"
                        :key="index"
                        v-for="(item, index) in themeList"
                        @click="setTheme(item)"
                      >
                        <div class="panel-innerBox-item-name">
                          {{ item.themeName }}
                        </div>
                        <div class="panel-innerBox-item-num">
                          {{ item.artNum }}动态
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <el-button @click="publish" type="primary" size="small"
                >发布</el-button
              >
              <VEmojiPicker
                class="emoji-picker"
                v-if="showEmoji"
                @select="selectEmoji"
              />
            </div>
            <div class="publish-photo" @click.stop v-if="showUpload">
              <el-upload
                :data="{ type: 'circle' }"
                :action="uploadURL"
                list-type="picture-card"
                :auto-upload="true"
                :limit="3"
                :headers="{ Authorization: token }"
                :on-exceed="limit"
                :on-success="uploadSuccess"
                :on-error="uploadError"
              >
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                </div>
              </el-upload>
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
                      @click="toUserPage(item.userInfo.id)"
                    />
                    <div class="list-item-info-left-info">
                      <div
                        @click="toUserPage(item.userInfo.id)"
                        class="list-item-info-left-info-title"
                      >
                        {{ item.userInfo.nickname }}
                      </div>
                      <div class="list-item-info-left-info-details">
                        <div class="details-job">
                          {{ item.userInfo.profession }}
                        </div>
                        &nbsp;
                        <span v-if="item.userInfo.profession">·</span>&nbsp;
                        <div class="details-time">
                          {{ item.created_at | relativeTime }}
                        </div>
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
                  class="list-item-photo-t"
                  v-lazy="pic"
                  v-for="(pic, picIndex) in item.picUrl"
                  :key="picIndex"
                  @click="previewImg(pic)"
                />
              </div>
              <div class="list-item-operate">
                <div class="list-item-operate-t" @click="likeDynamic(item.id)">
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
                <div
                  :data-clipboard-text="`${host}/circle-detail/${item.id}`"
                  class="list-item-operate-t list-item-operate-t-fenxiang"
                  @click="copy"
                >
                  <i class="iconfont icon-fenxiang">&nbsp;分享</i>
                </div>
              </div>
              <div class="comment-box" v-if="dynamicId === item.id">
                <!-- 评论 -->
                <div class="comment-box-innerBox">
                  <div class="make-comments" @click.stop>
                    <div class="first-line">
                      <img
                        :src="
                          currentUserInfo
                            ? currentUserInfo.avatar
                            : defaultAvatar
                        "
                        alt=""
                        class="avatar"
                      />
                      <el-input
                        id="comm_emoji_ipt"
                        class="input-btn"
                        v-model="comment"
                        placeholder="输入评论..."
                        @focus="showComment = true"
                      ></el-input>
                    </div>
                    <div class="second-line" v-if="showComment">
                      <div
                        class="emoj"
                        @click.stop="showCommEmoji = !showCommEmoji"
                      >
                        <i class="iconfont icon-hanhan-01-01"></i>表情
                      </div>
                      <el-button
                        @click.stop="makeComment(item.id)"
                        size="small"
                        type="primary"
                        >评论</el-button
                      >
                      <VEmojiPicker
                        class="emoji-picker"
                        v-if="showCommEmoji"
                        @select="selectCommEmoji"
                      />
                    </div>
                  </div>
                </div>
                <div class="comments-main-body">
                  <div
                    class="comments-main-body-innerBox"
                    v-for="(itm, idx) in commentList"
                    :key="idx"
                  >
                    <img
                      @click="toUserPage(itm.userInfo.id)"
                      class="avatar"
                      :src="itm.userInfo.avatar"
                      alt=""
                    />
                    <div class="main-body-innerBox-right">
                      <div class="body-innerBox-right-firstline">
                        <div
                          @click="toUserPage(itm.userInfo.id)"
                          class="right-firstline-nickname"
                        >
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
                        <div class="right-bottomline-time">
                          {{ item.created_at | relativeTime }}
                        </div>
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
                            :src="
                              currentUserInfo
                                ? currentUserInfo.avatar
                                : defaultAvatar
                            "
                            alt=""
                            class="avatar"
                          />
                          <el-input
                            id="reply_comm_emoji_ipt"
                            size="small"
                            class="input-btn"
                            v-model="replyComment"
                            :placeholder="`回复${item.userInfo.nickname}...`"
                          ></el-input>
                        </div>
                        <div class="second-line">
                          <div
                            class="emoj"
                            @click.stop="
                              showReplyCommEmoji = !showReplyCommEmoji
                            "
                          >
                            <i class="iconfont icon-hanhan-01-01"></i>表情
                          </div>
                          <el-button
                            @click.stop="replyToComment(itm, item)"
                            size="small"
                            type="primary"
                            >评论</el-button
                          >
                          <VEmojiPicker
                            class="emoji-picker"
                            v-if="showReplyCommEmoji"
                            @select="selectReplyCommEmoji"
                          />
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
                            <div
                              @click="toUserPage(t.from.id)"
                              class="right-firstline-nickname"
                            >
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
                            回复&nbsp;<span
                              @click.stop="toUserPage(t.to.id)"
                              class="reply"
                              >{{ t.to.nickname }}</span
                            >：{{ t.content }}
                          </div>
                          <div class="body-innerBox-right-bottomline">
                            <div class="right-bottomline-time">
                              {{ t.created_at | relativeTime }}
                            </div>
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
                                :src="
                                  currentUserInfo
                                    ? currentUserInfo.avatar
                                    : defaultAvatar
                                "
                                alt=""
                                class="avatar"
                              />
                              <el-input
                                id="reply_reply_emoji_ipt"
                                size="small"
                                class="input-btn"
                                v-model="replyToReplyValue"
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
                                @click.stop="replyToReply(t, itm, item)"
                                size="small"
                                type="primary"
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
                <!-- 查看评论详情页 -->
                <div class="comment-detail-page" @click="toDetailPage(item.id)">
                  查看更多&gt;
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="circle-info">
        <div
          @click="toUserPage(currentUserInfo.id, 'author')"
          class="circle-info-authorInfo"
          v-if="currentUserInfo"
        >
          <div class="authorInfo-top">
            <img :src="currentUserInfo.avatar" class="authorInfo-top-avatar" />
            <div class="authorInfo-top-info">
              <div class="authorInfo-top-info-name">
                {{ currentUserInfo.nickname }}
              </div>
              <div class="authorInfo-top-info-job">
                {{ currentUserInfo.profession }}
              </div>
            </div>
          </div>
          <div class="authorInfo-bottom">
            <div
              @click.stop="toUserPage(currentUserInfo.id, 'attention')"
              class="authorInfo-bottom-item"
            >
              <div class="bottom-item-box">
                <div class="authorInfo-bottom-item-title">关注</div>
                <div class="authorInfo-bottom-item-num">
                  {{ currentUserInfo.idolNum }}
                </div>
              </div>
            </div>
            <div
              @click.stop="toUserPage(currentUserInfo.id, 'beAttention')"
              class="authorInfo-bottom-item"
            >
              <div class="bottom-item-box">
                <div class="authorInfo-bottom-item-title">关注者</div>
                <div class="authorInfo-bottom-item-num">
                  {{ currentUserInfo.fansNum }}
                </div>
              </div>
            </div>
            <div class="authorInfo-bottom-item">
              <div class="bottom-item-box">
                <div class="authorInfo-bottom-item-title">获赞</div>
                <div class="authorInfo-bottom-item-num">
                  {{ currentUserInfo.blogLikeNum }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="circle-info-great" id="circle_info_great">
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
                v-if="item.picUrl"
                :style="{ backgroundImage: `url(${item.picUrl})` }"
                class="content-pic"
              ></div>
            </div>
          </div>
        </div>
        <div class="circle-poster" id="circle_poster"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import dev from "@/env";
import { encode } from "@/utils/encode";
import { getCookie } from "@/utils/cookie";
import { Message } from "element-ui";

export default {
  layout: "default",
  data() {
    return {
      host: "",
      showEmoji: false, // 是否展示emoji表情选择器
      showCommEmoji: false, // 是否展示评论emoji表情选择器
      showReplyCommEmoji: false, // 是否展示回复评论emoji表情选择器
      showReplyReplyEmoji: false, // 是否展示回复回复emoji表情选择器
      defaultAvatar: dev[process.env.NODE_ENV].PIC_URL + "/default_avatar.png", // 默认头像
      uploadURL: dev[process.env.NODE_ENV].ENV_API + "/upload", // 图片上传地址
      token: "", // token
      menuList: [],
      listData: [], // "动态"列表数据
      messageList: [], // 精选留言
      content: "", // 输入的内容
      theme: "", // 当前选中的动态主题
      type: "new", // 当前选中的"动态"类型 -- recommend/hot/attention
      picUrl: [], // 上传的图片
      pageIndex: 1, // 当前动态是第几页
      pageSize: 15, // 当前请求数据数
      countNum: 0, // 总“动态”条数
      comment: "", // "动态"评论
      commentList: [], // 评论列表
      dynamicId: "", // 当前选中的“动态”id号
      showComment: false, // 是否展示评论输入框
      replyComment: "", // 回复评论
      replyToReplyValue: "", // 回复评论回复
      showReply: false, // 是否展示评论回复输入框
      showReplyToReply: "", // 是否展示回复评论输入框
      selectedMenu: "new", // 选中的menu
      showTheme: false, // 是否显示话题选择面板
      themeList: [], // 话题列表
      selectedTheme: "", // 选中的主题
      showUpload: false, // 是否展示图片上传按钮
      userInfo: null // 用户信息页
    };
  },
  async asyncData({ $axios }) {
    // 获取"动态"类型
    const theme = await $axios.get("/theme/list");

    if (theme.error_code !== 0) {
      Message.error("动态类型获取失败");
    }

    return {
      menuList: theme.data // 动态类型
    };
  },
  computed: {
    currentUserInfo() {
      return this.$store.state.login.userinfo;
    }
  },
  created() {
    // 获取token
    this.getToken();

    // 获取"动态"列表
    this.getList();

    // 获取精选留言列表数据
    this.getFavList();
  },
  mounted() {
    this.host = window.location.host;
  },
  methods: {
    copy() {
      let clipboard = new Clipboard(".list-item-operate-t-fenxiang");
      //监听事件给出提示,可忽略
      clipboard.on("success", function(e) {
        Message.success("复制链接成功！");
      });
      clipboard.on("error", function(e) {
        Message.error("复制链接失败！");
      });

      setTimeout(() => {
        clipboard.destroy();
      }, 200);
    },
    // 选择emoji表情
    selectEmoji(emoji) {
      let input = document.getElementById("circle_input");
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
      this.content = resultText;
    },
    // 选择评论emoji表情
    selectCommEmoji(emoji) {
      let input = document.getElementById("comm_emoji_ipt");
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
      let input = document.getElementById("reply_comm_emoji_ipt");
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
      let input = document.getElementById("reply_reply_emoji_ipt");
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
      this.replyToReplyValue = resultText;
    },
    previewImg(url) {
      this.$hevueImgPreview({
        url,
        clickMaskCLose: true,
        closeBtn: false,
        controlBar: false
      });
    },
    getToken() {
      const token = getCookie(this, "user_token");
      // 将获取到token加入到请求头中
      if (!token) return;
      this.token = encode(token);
    },
    loadData() {
      // 当前页大于总页数时停止请求数据：
      if (this.pageIndex > Math.ceil(this.countNum / this.pageSize)) return;

      // 下拉加载更多：
      this.getList();
    },
    // 发布动态
    async publish() {
      if (!this.content) return;

      const picUrl = JSON.stringify(this.picUrl);

      const tmpTheme = this.content.split("#");

      this.content = tmpTheme[tmpTheme.length - 1];

      const data = await this.$axios.post("/dynamic/create", {
        theme: this.selectedTheme,
        content: this.content,
        picUrl
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
          if (item.picUrl) {
            item.picUrl = JSON.parse(item.picUrl);
          }
          this.listData.push(item);
        });

        this.countNum = data.data.count;

        // 当前页数+1
        this.pageIndex += 1;
      } else {
        Message.error("获取数据失败！");
      }
    },
    // 获取"精选"留言列表数据
    async getFavList() {
      // 获取精选留言数据
      const favList = await this.$axios.get("/dynamic/favlist");

      if (favList.error_code !== 0) {
        return Message.error("精选留言获取失败");
      }

      favList.data.forEach(item => {
        if (item.picUrl) {
          item.picUrl = JSON.parse(item.picUrl);
        }
      });

      this.messageList = favList.data;
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
      // 隐藏emoji表情
      this.showEmoji = false;
      // 隐藏评论emoji表情
      this.showCommEmoji = false;
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
      if (!this.replyToReplyValue) return;

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
      window.open(`/circle-detail/${id}`);
    },
    // 跳转至用户页
    toUserPage(id, type) {
      window.open(`/user/${id}/${type}`);
    },
    // 选中标签类型
    setMenu(value) {
      this.selectedMenu = value;

      // 重置pageIndex/pageSize
      this.pageIndex = 1;
      this.pageSize = 15;

      // 先清空原始数据
      this.listData = [];

      // 重新获取动态数据
      if (["new", "hot", "attention"].includes(value)) {
        this.type = value;
        this.theme = "";
      } else {
        this.type = "";
        this.theme = value;
      }

      this.getList();
    },
    // 添加话题选择
    async addTheme() {
      this.showTheme = true;

      const data = await this.$axios.get("/theme/list");

      if (data.error_code === 0) {
        this.themeList = data.data;
      } else {
        Message.error("获取主题失败!");
      }
    },
    // 设置话题
    setTheme(data) {
      // 清空话题时
      if (!data.themeName) {
        this.selectedTheme = "";

        const newTheme = this.content.split("#")[2];

        this.content = `${newTheme}`;

        return (this.showTheme = false);
      }

      // 第一次未设置话题时
      if (!this.selectedTheme && data.themeName) {
        this.content = `#${data.themeName}# ${this.content}`;
        this.showTheme = false;
        this.selectedTheme = data.themeName;
        return;
      }

      // 更换话题时
      if (this.selectedTheme) {
        const newTheme = this.content.split("#")[2];

        this.content = `#${data.themeName}# ${newTheme}`;
      } else {
        this.content = `#${data.themeName}# ${this.content}`;
      }

      this.showTheme = false;

      this.selectedTheme = data.themeName;
    },
    // 上传图片超过时提醒
    limit() {
      Message.warning("只允许上传三张图片！");
    },
    // 文件上传成功
    uploadSuccess(response, file, fileList) {
      if (response.error_code === 0) {
        this.picUrl.push(response.url);
      }
    },
    // 文件上传失败
    uploadError(err, file, fileList) {
      Message.error("文件上传失败");
    }
  }
};
</script>

<style></style>
