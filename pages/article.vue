<template>
  <div class="article-wrapper">
    <div class="article-wrapper-content">
      <div class="content-innerBox">
        <div class="innerBox-author">
          <div class="innerBox-left">
            <img
              src="https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/67b174696e0477c9afd38a893b87fc95~300x300.image"
              class="avatar"
            />
            <div class="author-info">
              <div class="author-name">橘猫很方</div>
              <div class="author-info-detail">
                <div class="detail-time">2021年07月01日</div>
                &nbsp;&nbsp;
                <div class="read-times">阅读1961</div>
              </div>
            </div>
          </div>
          <el-button class="pay-attention" size="mini">关注</el-button>
        </div>
        <img
          class="theme-pic"
          src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f69ec436a2e04c21aa5930a027c5f0cb~tplv-k3u1fbpfcp-watermark.image"
          alt=""
        />
        <h1 class="main-title-name">
          「论道架构师」拒绝无脑搬砖，从分库分表开始
        </h1>
        <div class="markdown-body">
          去年同期写过一个基于 Node 的 DevOps
          系列，但是整个项目工程非常大，上手成本比较高，对于一些中小型团队或者新手参考的意义不算多，所以针对这些群体重启了一个新的工程化系列。
          新的系列将从 0 到 1
          逐步搭建一套完整工程化方案，所有文章将统一放在《前端工程化》专栏中。
          作者：CookieBoty 链接：https://juejin.cn/post/6982215543017193502
          来源：掘金
          著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
          去年同期写过一个基于 Node 的 DevOps
          系列，但是整个项目工程非常大，上手成本比较高，对于一些中小型团队或者新手参考的意义不算多，所以针对这些群体重启了一个新的工程化系列。
          新的系列将从 0 到 1
          逐步搭建一套完整工程化方案，所有文章将统一放在《前端工程化》专栏中。
          作者：CookieBoty 链接：https://juejin.cn/post/6982215543017193502
          来源：掘金
          著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
          去年同期写过一个基于 Node 的 DevOps
          系列，但是整个项目工程非常大，上手成本比较高，对于一些中小型团队或者新手参考的意义不算多，所以针对这些群体重启了一个新的工程化系列。
          新的系列将从 0 到 1
          逐步搭建一套完整工程化方案，所有文章将统一放在《前端工程化》专栏中。
          作者：CookieBoty 链接：https://juejin.cn/post/6982215543017193502
          来源：掘金
          著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
        </div>
        <div class="article-author-wrapper">
          <div class="article-tag-type">
            <div class="type">
              文章分类&nbsp;&nbsp;&nbsp;
              <div class="type-name">前端</div>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div class="tag">
              文章标签&nbsp;&nbsp;&nbsp;
              <div
                v-for="(item, index) in articleTagList"
                :key="index"
                class="tag-name"
              >
                JavaScript
              </div>
            </div>
          </div>
          <div class="author-bottom-info">
            <div class="author-bottom-info-left">
              <img
                class="avatar bottom-avatar"
                src="https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/67b174696e0477c9afd38a893b87fc95~300x300.image"
              />
              <div class="info-left-author-detail">
                <div class="author-detail-info">
                  <div class="author-detail-info-name">橘猫很方</div>
                  <div class="author-detail-info-job">涂鸦大前端</div>
                </div>
                <div class="author-detail-info-desc">
                  <div class="publish">发布了33篇文章</div>
                  &nbsp;·&nbsp;
                  <div class="like">获得点赞&nbsp;3509</div>
                  &nbsp;·&nbsp;
                  <div class="read">获得阅读&nbsp;179547</div>
                </div>
              </div>
            </div>
            <el-button class="pay-attention" size="mini">关注</el-button>
          </div>
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
          相关推荐
        </div>
        <ul class="infinite-list list-wrapper" v-infinite-scroll="loadData">
          <li
            v-for="(item, index) in infoList"
            :key="index"
            class="infinite-list-item list-item"
            @click="toArticle"
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
                  <i class="iconfont icon-yanjing operate-item">&nbsp;1143</i>
                  <i class="iconfont icon-dianzan operate-item">&nbsp;11</i>
                  <i class="iconfont icon-liaotian">&nbsp;6</i>
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
    <div class="article-wrapper-aside">
      <div class="aside-author">
        <div class="aside-author-title">关于作者</div>
        <div class="aside-author-body">
          <div class="aside-author-body-top">
            <img
              class="avatar"
              src="https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/bce60f0d6d1bc92907c435bb69b4f9c1~300x300.image"
              alt=""
            />
            <div class="author-body-top-info">
              <div class="top-info-name">橘猫很方</div>
              <div class="top-info-sign">你会变强的！</div>
            </div>
          </div>
          <div class="aside-author-body-bottom">
            <div class="aside-author-body-bottom-item">
              <i class="iconfont icon-dianzan"></i
              ><span class="text">获得点赞&nbsp;3709</span>
            </div>
            <div class="aside-author-body-bottom-item">
              <i class="iconfont icon-yanjing"></i
              ><span class="text">文章被阅读&nbsp;11785</span>
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
      <div class="more-article">
        <div class="more-article-header">相关文章</div>
        <div class="more-article-content">
          <div
            class="more-article-content-item"
            v-for="(item, index) in moreArticleList"
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
      infoList: [1, 1, 1, 1, 1, 1, 1, 1, 1],
      articleTagList: [2, 1, 1, 1],
      moreArticleList: [2, 1, 1, 1],
      comment: ""
    };
  },
  methods: {
    loadData() {},
    toArticle() {
      window.open("/article", "_blank");
    }
  }
};
</script>

<style></style>
