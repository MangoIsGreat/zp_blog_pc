<template>
  <div class="home-wrapper">
    <div class="tag-box">
      <div class="tag-innerBox">
        <div class="left-box">
          <div class="tag-item" v-for="(item, index) in tagList" :key="index">
            {{ item.tag_name }}
          </div>
        </div>
        <div class="btn">标签管理</div>
      </div>
    </div>
    <div class="content">
      <div class="inner-content-box">
        <div class="content-left">
          <div class="head">
            <div class="head-item">热门</div>
            <div class="head-item">最新</div>
          </div>
          <div class="content-body">
            <div class="body">
              <ul
                class="infinite-list list-wrapper"
                v-infinite-scroll="loadData"
              >
                <li
                  v-for="(item, index) in infoList"
                  :key="index"
                  class="infinite-list-item list-item"
                >
                  <div class="item-info">
                    <div class="author-name">李勇</div>
                    <div class="time">一小时前</div>
                    <div class="tag-type">Vue.js</div>
                  </div>
                  <div class="item-content">
                    <div class="content-left">
                      <h3 class="title">手写Vue2系列之初始渲染</h3>
                      <div class="desc">
                        实现Vue.js的初始渲染过程,设计内容包括: render
                        helper初始渲染初始渲染初始渲染初始渲染初始渲染初始渲染初始渲染
                      </div>
                      <div class="operate">
                        <i class="iconfont icon-yanjing operate-item"> 1143</i>
                        <i class="iconfont icon-dianzan operate-item"> 11</i>
                        <i class="iconfont icon-liaotian"> 6</i>
                      </div>
                    </div>
                    <img
                      class="content-right"
                      src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d7ff178b8e14dca9a964ddc993af0b9~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:360:240.awebp"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="author-list">
            <div class="author-list-item author-list-title">
              <i>+</i>
              <span>作者榜</span>
            </div>
            <div class="author-list-item author-list-content">
              <div
                class="author-item"
                v-for="(item, index) in authorList"
                :key="index"
              >
                <img
                  class="avatar"
                  src="https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/aed661aae79b90d27a304ddd0b8890d6~300x300.image"
                />
                <div class="author-info">
                  <div class="author-name">
                    <span>大帅老猿</span>
                    <i>+</i>
                  </div>
                  <div class="author-desc">坚持原创每一篇文章</div>
                </div>
              </div>
            </div>
            <div class="author-list-item author-list-footer">完整榜单 &gt;</div>
          </div>
          <div class="home-page-poster"></div>
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
      infoList: [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        ,
        1,
        ,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        ,
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      authorList: [5, 5, 5],
      tagList: [
        {
          tag_name: "推荐"
        },
        {
          tag_name: "关注"
        },
        {
          tag_name: "后端"
        },
        {
          tag_name: "前端"
        },
        {
          tag_name: "测试"
        }
      ]
    };
  },
  methods: {
    loadData() {}
  }
};
</script>
