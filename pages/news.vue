<template>
  <div class="news-wrapper">
    <div class="news-type-line">
      <div class="news-type-line-box">
        <div class="type-item" v-for="(item, index) in typeList" :key="index">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="news-content-box">
      <div class="list-box">
        <div class="list-box-header">
          <div class="list-box-header-item">最新</div>
          <div class="list-box-header-item">热榜</div>
        </div>
        <ul class="infinite-list" v-infinite-scroll="loadData">
          <li
            v-for="(item, index) in newsList"
            :key="index"
            class="infinite-list-item"
          >
            <div class="list-item-content">
              <h3 class="item-content-title">
                iPhone手机再现 Wi-Fi 漏洞，更易中招且更难修复
              </h3>
              <div class="item-content-desc">
                发现该漏洞的安全研究员表示，新的漏洞会让一个仅仅处于名为"%secretclub%power
                "网络范围内的iPhone手机失去所有WiFi功能，中招之后必须完全重置手机才能恢复。
              </div>
              <div class="item-content-line">
                <div class="line-author">最新鲜的大厂新闻</div>
                <div class="line-time">9小时前</div>
                <div class="like">1点赞&nbsp;·&nbsp;2评论</div>
              </div>
            </div>
            <img
              src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f6586f017084f5eb01976427fcee587~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:486:342.awebp"
              class="list-item-pic"
            />
          </li>
        </ul>
      </div>
      <div class="aside-box">
        <div class="send-news">
          <div class="send-news-title">资讯投递</div>
          <el-button>立即投递</el-button>
        </div>
        <div class="footer">
          <div class="line-item">
            <a target="_blank" href="#">关于</a> ·
            <a target="_blank" href="https://juejin.cn/">友情链接</a> ·
            <a target="_blank" href="https://juejin.cn/">更多文章</a>
          </div>
          <div class="line-item">
            版权所有: 橘猫很方
          </div>
          <div class="line-item">
            联系地址: 深圳市宝安区西乡街道福中福社区
          </div>
          <div class="line-item">
            联系电话: 15179742801
          </div>
          <div class="line-item">
            联系邮箱: zp_web@126.com
          </div>
          <div class="line-item">
            <a target="_blank" href="#">&copy;2021 得到</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeList: [
        {
          name: "全部"
        },
        {
          name: "行业动态"
        },
        {
          name: "软件更新"
        },
        {
          name: "编程语言"
        }
      ],
      newsList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    };
  },
  methods: {
    loadData() {}
  }
};
</script>

<style></style>
