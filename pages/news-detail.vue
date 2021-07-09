<template>
  <div class="news-detail-page-wrapper">
    <div class="article-wrapper-content">
      <div class="content-innerBox">
        <h1 class="main-title-name">
          三星正在利用版权索赔来警告泄密者
        </h1>
        <div class="news-article-desc">
          <div class="news-article-desc-item">科技热点</div>
          <div class="news-article-desc-item">行业动态</div>
          <div class="news-article-desc-item">18小时前</div>
          <div class="news-article-desc-item">阅读&nbsp;55</div>
        </div>
        <img
          class="theme-pic"
          src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1d2fe1184be4deaae589cc683144613~tplv-k3u1fbpfcp-watermark.image"
          alt=""
        />
        <div class="markdown-body">
          苹果并不是唯一一个打击主要泄密者的科技巨头。
          正如Reddit用户所指出的，AllAboutSamsung的Max
          Jambor警告说，三星正在利用版权索赔来警告泄密者。
          Jambor说，一些图片将在几天内消失，据说这
          "只是开始"。据称，三星只是在追捕原始传播者，而不是报道这些泄密事件的媒体。小米在最近几天也对泄密事件进行了打击。
          像这样的举动并不令人惊讶。泄密通常是对公司机密的破坏。泄密者通常未经许可分享内部材料。但每次出现泄密事件时，三星声称会使公司名誉受损，认为它们抢走了事件的风头，甚至抑制了销售。
          三星打击泄密事件在实践中是否有很大的影响可能是另一回事。毕竟，泄密事件往往传播得很快，而且可能不需要很长时间就能传播照片和新闻照片，同时删除源帖子。这对阻止基于泄密也没有什么作用。
          作者：科技热点 链接：https://juejin.cn/news/6982450163197411341
          来源：掘金
          著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
        </div>
        <div class="comment-body-wrapper">
          <div class="comment-body-innerBox">
            <div class="make-comments">
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
          相关资讯
        </div>
        <ul class="infinite-list list-wrapper" v-infinite-scroll="loadData">
          <li
            v-for="(item, index) in newsList"
            :key="index"
            class="infinite-list-item list-item"
            @click="toNewsPage"
          >
            <div class="item-content">
              <div class="content-left">
                <h3 class="title">手写Vue2系列之初始渲染</h3>
                <div class="bottom-line">
                  <div class="name bottom-line-item">掘金小电台</div>
                  <div class="time bottom-line-item">20小时前</div>
                  <div class="like bottom-line-item">
                    1点赞&nbsp;·&nbsp;0评论
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="article-wrapper-aside">
      <div class="send-news">
        <div class="sen-news-t">
          <div class="send-news-title">资讯投递</div>
          <el-button type="primary" class="send-news-btn" size="mini"
            >立即投递</el-button
          >
        </div>
        <div class="send-news-desc">
          欢迎投递行业动态、软件更新、编程语言相关资讯线索
        </div>
      </div>
      <div class="new-news">
        <div class="more-article-header">最新资讯</div>
        <div class="more-article-content">
          <div
            class="more-article-content-item"
            v-for="(item, index) in newNewsList"
            :key="index"
          >
            <div class="content-item-title">
              没内鬼，来点干货！SQL优化和诊断
            </div>
            <div class="content-item-line">
              <i class="iconfont icon-dianzan">&nbsp;273</i>
              <i class="iconfont icon-liaotian">&nbsp;27</i>
            </div>
          </div>
        </div>
      </div>
      <div class="hot-news">
        <div class="more-article-header">最热资讯</div>
        <div class="more-article-content">
          <div
            class="more-article-content-item"
            v-for="(item, index) in hotNewsList"
            :key="index"
          >
            <div class="content-item-title">
              没内鬼，来点干货！SQL优化和诊断
            </div>
            <div class="content-item-line">
              <i class="iconfont icon-dianzan">&nbsp;273</i>
              <i class="iconfont icon-liaotian">&nbsp;27</i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed-left-box">
      <i class="iconfont icon-dianzan"></i>
      <i class="iconfont icon-liaotian"></i>
      <i class="iconfont icon-liaotian"></i>
      <i class="iconfont icon-liaotian"></i>
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
  data() {
    return {
      newsList: [1, 1, 1, 1],
      newNewsList: [1, 1, 1, 1, 1],
      hotNewsList: [1, 1, 1, 1, 1],
      comment: ""
    };
  },
  methods: {
    loadData() {},
    toNewsPage() {
      window.open("/news-detail", "_blank");
    }
  }
};
</script>

<style></style>
