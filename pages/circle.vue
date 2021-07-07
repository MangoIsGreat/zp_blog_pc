<template>
  <div class="circle-wrapper">
    <div class="circle-menu">
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
            v-model="textarea"
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
            <el-button type="primary" size="small">发布</el-button>
          </div>
        </div>
        <ul
          class="infinite-list circle-content-list-box"
          v-infinite-scroll="loadData"
        >
          <li
            v-for="(item, index) in contentList"
            :key="index"
            class="infinite-list-item circle-content-list-item"
          >
            <div class="list-item-top">
              <div class="list-item-info">
                <div class="list-item-info-left">
                  <img
                    src="https://user-gold-cdn.xitu.io/2019/12/28/16f4b82a90a059e9?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
                    class="list-item-info-left-avatar"
                  />
                  <div class="list-item-info-left-info">
                    <div class="list-item-info-left-info-title">
                      长沙林更新
                    </div>
                    <div class="list-item-info-left-info-details">
                      <div class="details-job">前端开发工程师</div>
                      &nbsp; ·&nbsp;
                      <div class="details-time">一分钟前</div>
                    </div>
                  </div>
                </div>
                <el-button size="mini" class="list-item-info-follow"
                  >关注</el-button
                >
              </div>
              <div class="list-item-desc">
                救命救命 js正则如何匹配某个字符串
                后面的数字，包括小数和负数，还不能用零宽断言，原因ios 不支持
              </div>
            </div>
            <div class="list-item-operate">
              <div class="list-item-operate-t">
                <i class="iconfont icon-dianzan">&nbsp;赞</i>
              </div>
              <div class="list-item-operate-t">
                <i class="iconfont icon-dianzan">&nbsp;评论</i>
              </div>
              <div class="list-item-operate-t">
                <i class="iconfont icon-dianzan">&nbsp;分享</i>
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
            src="https://user-gold-cdn.xitu.io/2020/1/18/16fb901f1bac3975?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
            class="authorInfo-top-avatar"
          />
          <div class="authorInfo-top-info">
            <div class="authorInfo-top-info-name">橘猫很方</div>
            <div class="authorInfo-top-info-job">前端开发工程师</div>
          </div>
        </div>
        <div class="authorInfo-bottom">
          <div class="authorInfo-bottom-item">
            <div class="bottom-item-box">
              <div class="authorInfo-bottom-item-title">沸点</div>
              <div class="authorInfo-bottom-item-num">24</div>
            </div>
          </div>
          <div class="authorInfo-bottom-item">
            <div class="bottom-item-box">
              <div class="authorInfo-bottom-item-title">沸点</div>
              <div class="authorInfo-bottom-item-num">24</div>
            </div>
          </div>
          <div class="authorInfo-bottom-item">
            <div class="bottom-item-box">
              <div class="authorInfo-bottom-item-title">沸点</div>
              <div class="authorInfo-bottom-item-num">24</div>
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
                [毕业季活动 | 你好，社会人] 又是一年毕业季又是一年毕业季
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
export default {
  layout: "default",
  data() {
    return {
      menuList: ["推荐", "热门", "关注", "上班摸鱼", "内推招聘"],
      contentList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      messageList: [1, 1, 1],
      textarea: ""
    };
  },
  methods: {
    loadData() {}
  }
};
</script>

<style></style>
