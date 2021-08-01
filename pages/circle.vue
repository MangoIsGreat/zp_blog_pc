<template>
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
              <div class="list-item-operate-t">
                <i class="iconfont icon-pinglun">&nbsp;评论</i>
              </div>
              <div class="list-item-operate-t">
                <i class="iconfont icon-fenxiang">&nbsp;分享</i>
              </div>
            </div>
            <div class="comment-box">
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
                  ></el-input>
                </div>
                <div class="second-line">
                  <div class="emoj">表情</div>
                  <el-button size="small" type="primary">评论</el-button>
                </div>
              </div>
              <div class="comments-main-body">
                <div
                  class="comments-main-body-innerBox"
                  v-for="(item, index) in [1, 1, 1]"
                  :key="index"
                >
                  <img
                    class="avatar"
                    src="http://localhost:3001/default_avatar.png"
                    alt=""
                  />
                  <div class="main-body-innerBox-right">
                    <div class="body-innerBox-right-firstline">
                      <div class="right-firstline-nickname">吉祥拉面</div>
                      <div class="right-firstline-job">前端开发</div>
                    </div>
                    <div class="body-innerBox-right-content">
                      杭州阿里考虑吗？组内直推，非猎头
                    </div>
                    <div class="body-innerBox-right-bottomline">
                      <div class="right-bottomline-time">两天前</div>
                      <div class="right-bottomline-reply">
                        <i class="iconfont icon-dianzan"></i>
                        <i class="iconfont icon-pinglun">&nbsp;回复</i>
                      </div>
                    </div>
                    <div
                      class="body-innerBox-reply"
                      v-for="(item, index) in [1, 1, 1]"
                      :key="index"
                    >
                      <img
                        class="avatar"
                        src="http://localhost:3001/default_avatar.png"
                        alt=""
                      />
                      <div class="main-body-innerBox-right">
                        <div class="body-innerBox-right-firstline">
                          <div class="right-firstline-nickname">吉祥拉面</div>
                          <div class="right-firstline-job">前端开发</div>
                        </div>
                        <div class="body-innerBox-right-content">
                          杭州阿里考虑吗？组内直推，非猎头
                        </div>
                        <div class="body-innerBox-right-bottomline">
                          <div class="right-bottomline-time">两天前</div>
                          <div class="right-bottomline-reply">
                            <i class="iconfont icon-dianzan"></i>
                            <i class="iconfont icon-pinglun">&nbsp;回复</i>
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
      comment: "" // "动态"评论
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
    }
  }
};
</script>

<style></style>
