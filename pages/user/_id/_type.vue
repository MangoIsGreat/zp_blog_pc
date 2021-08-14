<template>
  <div class="user-wrapper" @click="hiddenBtn">
    <div class="user-wrapper-innerBox">
      <div class="user-wrapper-innerBox-content">
        <div class="innerBox-content-user">
          <div class="innerBox-content-user-detail">
            <img class="avatar" :src="userInfo.avatar" alt="" />
            <div class="user-detail-right">
              <div class="user-detail-right-nickname">
                {{ userInfo.nickname }}
              </div>
              <div class="user-detail-right-job">
                <i class="iconfont icon-zimouzhiyeshenqing" />&nbsp;&nbsp;{{
                  userInfo.profession
                }}
              </div>
              <div class="user-detail-right-desc">
                <i class="iconfont icon-name-card-full" />&nbsp;&nbsp;{{
                  userInfo.signature
                }}
              </div>
            </div>
          </div>
          <div class="innerBox-content-user-right">
            <el-button
              v-if="userInfo.isSelf"
              @click="$router.push(`/edit-user/${$route.params.id}`)"
              class="edit-userinfo"
              size="small"
              plain
              >编辑个人资料</el-button
            >
            <el-button
              v-else
              @click="followUser(userInfo.id)"
              class="edit-userinfo"
              size="small"
              plain
              ><span v-if="!userInfo.isAttention">关注</span
              ><span class="edit-userinfo-follow" v-else
                >已关注</span
              ></el-button
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
                {
                  'list-type-active': ['articleNew', 'articleHot'].includes(
                    selectItem
                  )
                },
                'content-type-item'
              ]"
              @click="checkType('articleHot')"
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
            <div
              class="content-type-item"
              :class="[
                {
                  'list-type-active': [
                    'likeArt',
                    'likeChat',
                    'likeNews'
                  ].includes(selectItem)
                },
                'content-type-item'
              ]"
              @click.stop="
                showLikePanel = true;
                showMorePanel = false;
              "
            >
              赞&nbsp;<span>{{ likeNumData && likeNumData.like_count }}</span
              >&nbsp;<span class="iconfont icon-xiangxia"></span>
              <div class="like-panel" v-if="showLikePanel">
                <div
                  :class="[
                    { 'list-type-item-active': selectItem === 'likeArt' },
                    'like-panel-item'
                  ]"
                  @click.stop="checkType('likeArt')"
                >
                  文章&nbsp;{{ likeNumData.like_blog_num }}
                </div>
                <div
                  @click.stop="checkType('likeChat')"
                  :class="[
                    { 'list-type-item-active': selectItem === 'likeChat' },
                    'like-panel-item'
                  ]"
                >
                  沸点&nbsp;{{ likeNumData.like_dyn_num }}
                </div>
                <div
                  @click.stop="checkType('likeNews')"
                  :class="[
                    { 'list-type-item-active': selectItem === 'likeNews' },
                    'like-panel-item'
                  ]"
                >
                  资讯&nbsp;{{ likeNumData.like_news_num }}
                </div>
              </div>
            </div>
            <div
              class="content-type-item"
              :class="[
                {
                  'list-type-active': [
                    'collection',
                    'attention',
                    'beAttention'
                  ].includes(selectItem)
                },
                'content-type-item'
              ]"
              @click.stop="
                showMorePanel = true;
                showLikePanel = false;
              "
            >
              更多&nbsp;<span class="iconfont icon-xiangxia"></span>
              <div class="more-panel" v-if="showMorePanel">
                <div
                  :class="[
                    { 'list-type-item-active': selectItem === 'collection' },
                    'like-panel-item'
                  ]"
                  @click.stop="checkType('collection')"
                  class="like-panel-item"
                >
                  收藏集
                </div>
                <div
                  :class="[
                    {
                      'list-type-item-active': [
                        'attention',
                        'beAttention'
                      ].includes(selectItem)
                    },
                    'like-panel-item'
                  ]"
                  @click.stop="checkType('attention')"
                  class="like-panel-item"
                >
                  关注
                </div>
              </div>
            </div>
          </div>
          <div class="innerBox-content-content-list">
            <!-- 文章头部 -->
            <div
              class="innerBox-content-header"
              v-if="['articleHot', 'articleNew'].includes(selectItem)"
            >
              <div class="innerBox-content-header-name">文章</div>
              <div class="innerBox-content-header-type">
                <div
                  :class="[
                    { 'list-type-item-active': selectItem === 'articleHot' },
                    'header-type-item'
                  ]"
                  @click.stop="checkType('articleHot')"
                >
                  热门
                </div>
                <div class="header-line"></div>
                <div
                  :class="[
                    { 'list-type-item-active': selectItem === 'articleNew' },
                    'header-type-item'
                  ]"
                  @click.stop="checkType('articleNew')"
                >
                  最新
                </div>
              </div>
            </div>
            <!-- 赞头部 -->
            <div
              class="innerBox-content-header"
              v-if="['likeArt', 'likeChat', 'likeNews'].includes(selectItem)"
            >
              <div class="innerBox-content-header-name">赞</div>
              <div class="innerBox-content-header-type">
                <div
                  :class="[
                    { 'list-type-item-active': selectItem === 'likeArt' },
                    'header-type-item'
                  ]"
                  @click.stop="checkType('likeArt')"
                >
                  文章( {{ likeNumData.like_blog_num }} )
                </div>
                <div class="header-line"></div>
                <div
                  :class="[
                    { 'list-type-item-active': selectItem === 'likeChat' },
                    'header-type-item'
                  ]"
                  @click.stop="checkType('likeChat')"
                >
                  动态( {{ likeNumData.like_dyn_num }} )
                </div>
                <div class="header-line"></div>
                <div
                  :class="[
                    { 'list-type-item-active': selectItem === 'likeNews' },
                    'header-type-item'
                  ]"
                  @click.stop="checkType('likeNews')"
                >
                  资讯( {{ likeNumData.like_news_num }} )
                </div>
              </div>
            </div>
            <!-- 更多-关注-头部 -->
            <div
              class="innerBox-content-header"
              v-if="['attention', 'beAttention'].includes(selectItem)"
            >
              <div class="innerBox-content-header-name">关注</div>
              <div class="innerBox-content-header-type">
                <div
                  :class="[
                    { 'list-type-item-active': selectItem === 'beAttention' },
                    'header-type-item'
                  ]"
                  @click.stop="checkType('beAttention')"
                >
                  关注的用户
                </div>
                <div class="header-line"></div>
                <div
                  :class="[
                    { 'list-type-item-active': selectItem === 'attention' },
                    'header-type-item'
                  ]"
                  @click.stop="checkType('attention')"
                >
                  关注者
                </div>
              </div>
            </div>
            <!-- 收藏夹头部 -->
            <div
              class="innerBox-content-header"
              v-if="['collection'].includes(selectItem)"
            >
              <div class="innerBox-content-header-name">收藏集</div>
              <div></div>
            </div>
            <!-- 动态列表 -->
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
                >
                  <div
                    class="list-item-innerBox"
                    v-if="[100, 200, 300].includes(item.type)"
                  >
                    <img
                      @click="toUserPage(item.User.id)"
                      v-if="item.type === 200"
                      class="avatar"
                      :src="item.userInfo && item.userInfo.avatar"
                      alt=""
                    />
                    <img
                      @click="toUserPage(item.User.id)"
                      v-else
                      class="avatar"
                      :src="item.User && item.User.avatar"
                      alt=""
                    />
                    <div class="list-item-right">
                      <!-- 发表过的文章 -->
                      <div
                        class="list-item-right-title"
                        v-if="item.type === 100"
                      >
                        <span @click="toUserPage(item.User.id)">{{
                          item.User && item.User.nickname
                        }}</span
                        >发布了文章<span
                          class="list-item-right-title-name"
                          @click="toArticle(item.id)"
                          >{{ item.title }}</span
                        >
                      </div>
                      <!-- 发表过的动态 -->
                      <div
                        class="list-item-right-title"
                        v-if="item.type === 200"
                      >
                        <span @click="toUserPage(item.userInfo.id)">{{
                          item.userInfo && item.userInfo.nickname
                        }}</span
                        >发布了动态<span
                          @click="toDetailPage(item.id)"
                          class="list-item-right-title-name"
                          >{{ item.content }}</span
                        >
                      </div>
                      <!-- 发表过的资讯 -->
                      <div
                        class="list-item-right-title"
                        v-if="item.type === 300"
                      >
                        <span @click="toUserPage(item.User.id)">{{
                          item.User && item.User.nickname
                        }}</span
                        >发布了资讯<span
                          @click="toNewsPage(item.id)"
                          class="list-item-right-title-name"
                          >{{ item.title }}</span
                        >
                      </div>
                      <div class="list-item-right-time">
                        {{ item.created_at | relativeTime }}
                      </div>
                    </div>
                  </div>
                  <!-- 赞过的文章 -->
                  <!-- 赞过的动态 -->
                  <!-- 赞过的资讯 -->
                  <div
                    class="list-item-like-innerBox"
                    v-if="
                      (item.type === 500 && item.Dynamic) ||
                        (item.type === 400 && item.Blog) ||
                        item.type === 600
                    "
                  >
                    <div class="list-item-like-innerBox-header">
                      <div class="header-name">
                        {{ item.User && item.User.nickname }}
                      </div>
                      &nbsp;赞了这篇<span v-if="item.type === 400">文章</span
                      ><span v-if="item.type === 500">动态</span
                      ><span v-if="item.type === 600">资讯</span>
                    </div>
                    <div class="list-item-like-innerBox-content">
                      <img
                        @click="toUserPage(item.User.id)"
                        class="avatar"
                        :src="item.User && item.User.avatar"
                        alt=""
                      />
                      <div class="like-innerBox-content-right">
                        <div
                          @click="toUserPage(item.User.id)"
                          class="like-innerBox-content-right-title"
                        >
                          {{ item.User && item.User.nickname }}
                        </div>
                        <div class="like-innerBox-content-right-job">
                          {{ item.User && item.User.profession
                          }}<span class="time">{{
                            item.created_at | relativeTime
                          }}</span>
                        </div>
                        <div
                          v-if="item.type === 400"
                          @click="toArticle(item.Blog.id)"
                          class="like-innerBox-content-right-headline"
                        >
                          {{ item.Blog && item.Blog.title }}
                        </div>
                        <div
                          v-if="item.type === 500"
                          @click="toDetailPage(item.Dynamic.id)"
                          class="like-innerBox-content-right-headline"
                        >
                          {{ item.Dynamic && item.Dynamic.content }}
                        </div>
                        <div
                          v-if="item.type === 600"
                          @click="toNewsPage(item.News.id)"
                          class="like-innerBox-content-right-headline"
                        >
                          {{ item.News && item.News.title }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 关注的用户 -->
                  <div
                    class="list-item-attention-innerBox"
                    v-if="item.type === 700"
                  >
                    <img
                      class="avatar"
                      @click="toUserPage(item.attention.id)"
                      :src="item.attention && item.attention.avatar"
                      alt=""
                    />
                    <div class="list-item-attention-innerBox-right">
                      <div class="attention-innerBox-right-title">
                        <div
                          @click="toUserPage(item.attention.id)"
                          class="attention-innerBox-right-title-nickname"
                        >
                          {{ item.attention && item.attention.nickname }}
                        </div>
                        &nbsp;关注了&nbsp;
                        <div
                          @click="toUserPage(item.beAttention.id)"
                          class="attention-innerBox-right-title-nickname"
                        >
                          {{ item.beAttention && item.beAttention.nickname }}
                        </div>
                      </div>
                      <div class="attention-innerBox-right-job">
                        {{ item.attention && item.attention.profession }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 文章&赞-文章 -->
              <div
                v-if="
                  ['articleHot', 'likeArt', 'articleNew'].includes(selectItem)
                "
                class="list-wrapper-innerBox list-wrapper-innerBox-article"
              >
                <div
                  v-for="(item, index) in listData"
                  :key="index"
                  class="infinite-list-item list-item"
                  @click="toArticle(item.id)"
                >
                  <div class="item-info">
                    <div class="author-name">
                      {{ item.User && item.User.nickname }}
                    </div>
                    <div class="time">{{ item.created_at | relativeTime }}</div>
                    <div class="tag-type">
                      {{ item.Tag && item.Tag.tagName }}
                    </div>
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
                        <div
                          class="operate-item"
                          @click.stop="toComment(item.id)"
                        >
                          <i class="iconfont icon-pinglun"
                            >&nbsp;{{ item.commentNum }}</i
                          >
                        </div>
                        <div class="operate-item-delete">
                          <i
                            @click.stop="showDeleteBlog = item.id"
                            class="iconfont icon-shenglvehao edit-blog"
                          ></i>
                          <div
                            v-if="showDeleteBlog === item.id"
                            class="operate-item-delete-btn"
                          >
                            <div
                              @click.stop="editBlog(item.id)"
                              class="operate-item-delete-btn-t"
                            >
                              编辑
                            </div>
                            <div
                              @click.stop="deleteBlog(item.id)"
                              class="operate-item-delete-btn-t"
                            >
                              删除
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <img v-lazy="item.titlePic" class="content-right" />
                  </div>
                </div>
              </div>
              <!-- 互动&赞-互动 -->
              <div
                v-if="selectItem === 'chat' || selectItem === 'likeChat'"
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
                          @click="toUserPage(item.userInfo.id)"
                          :src="item.userInfo && item.userInfo.avatar"
                          class="list-item-info-left-avatar"
                        />
                        <div class="list-item-info-left-info">
                          <div
                            @click="toUserPage(item.userInfo.id)"
                            class="list-item-info-left-info-title"
                          >
                            {{ item.userInfo && item.userInfo.nickname }}
                          </div>
                          <div class="list-item-info-left-info-details">
                            <div class="details-job">
                              {{ item.userInfo && item.userInfo.profession }}
                            </div>
                            &nbsp;
                            <span
                              v-if="item.userInfo && item.userInfo.profession"
                              >·</span
                            >&nbsp;
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
                        <span v-if="!item.isAttention && !item.isSelf"
                          >关注</span
                        ><span
                          class="not-attention"
                          v-if="item.isAttention && !item.isSelf"
                          >已关注</span
                        >
                      </el-button>
                      <div
                        @mouseenter.stop="showDeleteDyn = item.id"
                        @mouseleave.stop="showDeleteDyn = ''"
                        class="list-item-info-delete"
                        v-else
                      >
                        <i class="iconfont icon-shenglvehao delete-icon"></i>
                        <div
                          @click.stop="deleteDyn(item.id)"
                          v-if="showDeleteDyn === item.id"
                          class="delete-btn"
                        >
                          删除
                        </div>
                      </div>
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
                      v-lazy="pic"
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
                            :src="
                              currentUserInfo
                                ? currentUserInfo.avatar
                                : defaultAvatar
                            "
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
                        <img
                          @click="toUserPage(item.userInfo.id)"
                          class="avatar"
                          :src="itm.userInfo && itm.userInfo.avatar"
                          alt=""
                        />
                        <div class="main-body-innerBox-right">
                          <div class="body-innerBox-right-firstline">
                            <div
                              @click="toUserPage(item.userInfo.id)"
                              class="right-firstline-nickname"
                            >
                              {{ itm.userInfo && itm.userInfo.nickname }}
                            </div>
                            <div class="right-firstline-job">
                              {{ itm.userInfo && itm.userInfo.profession }}
                            </div>
                          </div>
                          <div class="body-innerBox-right-content">
                            {{ itm.content }}
                          </div>
                          <div class="body-innerBox-right-bottomline">
                            <div class="right-bottomline-time">
                              {{ itm.created_at | relativeTime }}
                            </div>
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
                                :src="
                                  currentUserInfo
                                    ? currentUserInfo.avatar
                                    : defaultAvatar
                                "
                                alt=""
                                class="avatar"
                              />
                              <el-input
                                size="small"
                                class="input-btn"
                                v-model="replyComment"
                                :placeholder="
                                  `回复${item.userInfo &&
                                    item.userInfo.nickname}...`
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
                            <img
                              class="avatar"
                              :src="t.from && t.from.avatar"
                              alt=""
                            />
                            <div class="main-body-innerBox-right">
                              <div class="body-innerBox-right-firstline">
                                <div
                                  @click="toUserPage(t.from.id)"
                                  class="right-firstline-nickname"
                                >
                                  {{ t.from && t.from.nickname }}
                                </div>
                                <div
                                  class="identity"
                                  v-if="item.userInfo.id === t.from.id"
                                >
                                  (作者)
                                </div>
                                <div class="right-firstline-job">
                                  {{ t.from && t.from.profession }}
                                </div>
                              </div>
                              <div class="body-innerBox-right-content">
                                回复&nbsp;<span
                                  @click="toUserPage(t.to.id)"
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
                                    :src="
                                      currentUserInfo
                                        ? currentUserInfo.avatar
                                        : defaultAvatar
                                    "
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
              <!-- 赞-资讯 -->
              <div
                v-if="selectItem === 'likeNews'"
                class="list-wrapper-innerBox"
              >
                <div
                  v-for="(item, index) in listData"
                  :key="index"
                  class="infinite-list-item list-item infinite-list-item-news"
                  @click="toNewsPage(item.id)"
                >
                  <div class="list-item-content">
                    <h3 class="item-content-title">
                      {{ item.title }}
                    </h3>
                    <div class="item-content-desc">
                      {{ item.description }}
                    </div>
                    <div class="item-content-line">
                      <div class="line-author">{{ item.User.nickname }}</div>
                      <div class="line-time">
                        {{ item.created_at | relativeTime }}
                      </div>
                      <div class="like">
                        {{ item.newsLikeNum }}点赞&nbsp;·&nbsp;{{
                          item.newsReadNum
                        }}阅读
                      </div>
                    </div>
                  </div>
                  <img
                    v-if="item.titlePic"
                    v-lazy="item.titlePic"
                    class="list-item-pic"
                  />
                </div>
              </div>
              <!-- 更多-收藏集 -->
              <div
                v-if="selectItem === 'collection'"
                class="list-wrapper-innerBox"
              >
                <div
                  v-for="(item, index) in listData"
                  :key="index"
                  @click="openCollection(item.id)"
                  class="infinite-list-item list-item infinite-list-item-collection"
                >
                  <div class="list-item-name">{{ item.type }}</div>
                  <div class="list-item-num">{{ item.number }}篇</div>
                </div>
              </div>
              <!-- 更多-关注 -->
              <div
                v-if="['attention', 'beAttention'].includes(selectItem)"
                class="list-wrapper-innerBox"
              >
                <div
                  v-for="(item, index) in listData"
                  :key="index"
                  class="infinite-list-item list-item infinite-list-item-attention"
                >
                  <div class="userinfo">
                    <img class="avatar" :src="item.userInfo.avatar" alt="" />
                    <div class="info">
                      <div class="info-name">{{ item.userInfo.nickname }}</div>
                      <div class="info-job">{{ item.userInfo.profession }}</div>
                    </div>
                  </div>
                  <el-button
                    @click="follow(item.userInfo.id)"
                    class="make-attention"
                    size="mini"
                    plain
                    ><span v-if="!item.isAttention">关注</span
                    ><span style="color: #909090" v-else
                      >已关注</span
                    ></el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="user-wrapper-innerBox-aside">
        <div class="innerBox-aside-userinfo" id="user_aside_userinfo">
          <div class="innerBox-aside-userinfo-title">个人成就</div>
          <div class="innerBox-aside-userinfo-content">
            <div class="innerBox-aside-userinfo-content-item">
              <div class="aside-userinfo-content-item-icon">
                <i class="iconfont icon-yanjing-tianchong"></i>
              </div>
              <div class="aside-userinfo-content-item-word">
                文章被阅读&nbsp;{{ userInfo.blogReadNum }}
              </div>
            </div>
            <div class="innerBox-aside-userinfo-content-item">
              <div class="aside-userinfo-content-item-icon">
                <i class="iconfont icon-dianzan_"></i>
              </div>
              <div class="aside-userinfo-content-item-word">
                文章被点赞&nbsp;{{ userInfo.blogLikeNum }}
              </div>
            </div>
          </div>
        </div>
        <div class="innerBox-aside-attention" id="user_aside_attention">
          <div class="innerBox-aside-attention-item" @click="getUserIdols">
            <div class="innerBox-aside-attention-item-tit">关注了</div>
            <div class="innerBox-aside-attention-item-num">
              {{ userInfo.idolNum }}
            </div>
          </div>
          <div class="innerBox-aside-attention-line"></div>
          <div class="innerBox-aside-attention-item" @click="getUserFans">
            <div class="innerBox-aside-attention-item-tit">关注者</div>
            <div class="innerBox-aside-attention-item-num">
              {{ userInfo.fansNum }}
            </div>
          </div>
        </div>
        <div class="innerBox-aside-footer" id="user_aside_footer">
          <div class="innerBox-aside-footer-item" @click="getUserCollection">
            <span>收藏集</span>
            <span>{{ userInfo.collections_num }}</span>
          </div>
          <div class="innerBox-aside-footer-item">
            <span>加入于</span>
            <span>{{ userInfo.created_at | formatTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dev from "@/env";
import { Message } from "element-ui";

export default {
  layout: "default",
  data() {
    return {
      defaultAvatar: dev[process.env.NODE_ENV].PIC_URL + "/default_avatar.png", // 默认头像
      selectItem: "dynamic", // 选中的类型
      listData: [], // 列表数据
      countNum: 0, // 列表数据数量
      pageSize: 15,
      pageIndex: 1,
      comment: "", // "动态"评论
      commentList: [], // 评论列表
      dynamicId: "", // 当前选中的“动态”id号
      showComment: false, // 是否展示评论输入框
      replyComment: "", // 回复评论
      replyToReplyValue: "", // 回复评论回复
      showReply: false, // 是否展示评论回复输入框
      showReplyToReply: "", // 是否展示回复评论输入框
      showLikePanel: false, // 展示“赞”面板
      showMorePanel: false, // 展示“更多”面板
      likeNumData: null, // 点赞数据量
      showDeleteDyn: "", // 展示删除“动态”按钮
      showDeleteBlog: "" // 展示删除“博客”按钮
    };
  },
  async asyncData({ $axios, params }) {
    const data = await $axios.get("/author/userinfo", {
      params: { uid: params.id }
    });

    if (data.error_code === 0) {
      return {
        userInfo: data.data
      };
    } else {
      Message.error("用户信息获取失败");
    }
  },
  computed: {
    currentUserInfo() {
      return this.$store.state.login.userinfo;
    }
  },
  created() {
    // 请求列表数据
    this.getArtData();

    // 获取用户赞过的文章/动态/资讯
    this.getLikeNum();
  },
  methods: {
    setSelectedType() {
      const { type } = this.$route.params;

      if (
        ["likeArt", "collection", "attention", "beAttention"].includes(type)
      ) {
        this.selectItem = type;
      }
    },
    loadData() {
      // 当前页大于总页数时停止请求数据：
      if (this.pageIndex > Math.ceil(this.countNum / this.pageSize)) return;

      // 下拉加载更多：
      // if (this.pageIndex > 2) return;
      this.getArtData();
    },
    // 查看收藏夹
    getUserCollection() {
      this.selectItem = "collection";

      // 重置数据
      this.listData = [];
      this.pageIndex = 1;

      this.getArtData();
    },
    // 查看用户粉丝
    getUserFans() {
      this.selectItem = "attention";

      // 重置数据
      this.listData = [];
      this.pageIndex = 1;

      this.getArtData();
    },
    // 查看用户idol
    getUserIdols() {
      this.selectItem = "beAttention";

      // 重置数据
      this.listData = [];
      this.pageIndex = 1;

      this.getArtData();
    },
    // 选中的要展示的数据
    checkType(value) {
      this.selectItem = value;
      // 清空数据
      this.listData = [];
      this.pageIndex = 1;

      // 关闭“赞”&“更多”的浮窗
      if (["likeArt", "likeChat", "likeNews"].includes(value)) {
        this.showLikePanel = false;
      }

      if (["collection", "attention"].includes(value)) {
        this.showMorePanel = false;
      }

      this.getArtData();
    },
    // 获取文章列表数据
    async getArtData() {
      let path = "";

      // 要传递的参数
      const params = {
        uid: this.$route.params.id,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };

      switch (this.selectItem) {
        case "articleHot":
          params.type = "hot";
          path = "/author/artlist"; // 文章列表 - 热
          break;
        case "articleNew":
          params.type = "new";
          path = "/author/artlist"; // 文章列表 - 新
          break;
        case "chat":
          path = "/author/dynlist"; // 动态列表
          break;
        case "likeArt":
          path = "/author/likeBlog"; // "赞 - 文章"列表
          break;
        case "likeChat":
          path = "/author/likeDyn"; // 赞-动态
          break;
        case "likeNews":
          path = "/author/likeNews"; // 赞-资讯
          break;
        case "collection":
          path = "/author/collection"; // 更多-收藏集
          break;
        case "attention":
          path = "/author/followers"; // 更多-粉丝
          break;
        case "beAttention":
          path = "/author/byfollowers"; // 更多-idol
          break;
        case "dynamic":
          path = "/author/dynamic"; // 更多-idol
          break;
        default:
          break;
      }

      const data = await this.$axios.get(path, {
        params
      });

      if (data.error_code === 0) {
        if (
          [
            "collection",
            "articleHot",
            "articleNew",
            "chat",
            "likeArt",
            "dynamic",
            "likeNews",
            "likeChat"
          ].includes(this.selectItem)
        ) {
          data.data.list.forEach(item => {
            if (item.picUrl) {
              item.picUrl = JSON.parse(item.picUrl);
            }
          });

          this.listData.push(...data.data.list);
          this.countNum = data.data.count;
        } else if (this.selectItem === "attention") {
          const result = [];

          data.data.list.forEach(item => {
            let obj = {};
            obj.userInfo = item.attention;
            obj.isAttention = item.isAttention;
            result.push(obj);
          });

          this.listData.push(...result);
          this.countNum = data.data.count;
        } else if (this.selectItem === "beAttention") {
          const result = [];

          data.data.list.forEach(item => {
            let obj = {};
            obj.userInfo = item.beAttention;
            obj.isAttention = item.isAttention;
            result.push(obj);
          });

          this.listData.push(...result);
          this.countNum = data.data.count;
        }

        // 当前页数+1
        this.pageIndex += 1;
      } else {
        Message.error("数据获取失败");
      }
    },
    // 获取点赞数据
    async getLikeNum() {
      const data = await this.$axios.get("/author/likeNum", {
        params: {
          uid: this.$route.params.id
        }
      });

      if (data.error_code === 0) {
        this.likeNumData = data.data;

        // 设置选中的类型
        this.setSelectedType();
      } else {
        Message.error("获取点赞数据失败");
      }
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
    // 关注当前用户
    async followUser(id) {
      const data = await this.$axios.post("/fans/follow", { leader: id });

      if (data.error_code === 0) {
        if (data.data === "ok") {
          this.userInfo.isAttention = true;

          this.userInfo.fansNum++;
        } else if (data.data === "cancel") {
          this.userInfo.isAttention = false;

          this.userInfo.fansNum--;
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
        return Message.error("获取评论列表失败！");
      }

      this.commentList = commentList.data; // 评论列表
    },
    // 删除“动态”
    async deleteDyn(id) {
      if (!confirm("您确定要删除吗？")) {
        return;
      }

      const data = await this.$axios.post("/dynamic/delete", {
        dynamicId: id
      });

      if (data.error_code !== 0) {
        return Message.error("删除失败！");
      }

      // 隐藏删除按钮
      this.showDeleteDyn = "";
      // 重新请求数据
      this.pageIndex = 1;
      this.listData = [];
      this.getArtData();
    },
    // 删除“博客”
    async deleteBlog(id) {
      if (!confirm("您确定要删除吗？")) {
        return;
      }

      const data = await this.$axios.post("/blog/delete", {
        id
      });

      if (data.error_code !== 0) {
        return Message.error("删除失败！");
      }

      // 隐藏删除按钮
      this.showDeleteBlog = "";
      // 重新请求数据
      this.pageIndex = 1;
      this.listData = [];
      this.getArtData();
    },
    editBlog(id) {
      // 隐藏编辑按钮
      this.showDeleteBlog = "";

      window.open(`/writing/edit/${id}`, "_blank");
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
    hiddenBtn() {
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

      // 隐藏“赞”面板
      this.showLikePanel = false;
      // 隐藏“更多”面板
      this.showMorePanel = false;

      // 隐藏删除博客按钮
      this.showDeleteBlog = "";
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
      window.open(`/circle-detail/${id}`);
    },
    toComment(id) {
      window.open(`/article/${id}#make_comments`, "_blank");
    },
    toNewsPage(id) {
      window.open(`/news-detail/${id}`, "_blank");
    },
    // 跳转到文章页
    toArticle(id) {
      window.open(`/article/${id}`, "_blank");
    },
    // 跳转至用户页
    toUserPage(id) {
      window.open(`/user/${id}`);
    },
    // 打开收藏列表页
    openCollection(id) {
      // window.open(`/collection/${id}`, "_blank");
      this.$router.push(`/collection/${id}`);
    }
  }
};
</script>

<style></style>
