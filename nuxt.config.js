const dev = require("./env");

export default {
  loading: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "得到",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "element-ui/lib/theme-chalk/index.css",
    "@/assets/css/main.scss",
    "@/assets/iconfont/iconfont.css",
    "@/assets/css/config/animation.scss"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/element-ui",
    "@/plugins/axios",
    "@/plugins/lazyload",
    "@/plugins/timeFilter",
    { src: "@/plugins/mavon-editor", ssr: false },
    { src: "@/plugins/emoji", ssr: false },
    { src: "@/plugins/viewer", ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // 添加页面切换过渡动画
  transition: {
    name: "page",
    mode: "out-in",
    beforeEnter(el) {
      console.log("Before enter...");
    }
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "cookie-universal-nuxt",
    ["cookie-universal-nuxt", { alias: "cookiz" }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: dev[process.env.NODE_ENV].ENV_API,
    timeOut: 1000
    // proxy: true, // 开启代理
    // prefix: "/api", // 请求url加前缀
    // credentials: true // 跨域请求时是否需要凭证
  },

  // proxy: {
  //   "/api": {
  //     target: "http://localhost:3001",
  //     changeOrigin: true,
  //     pathRewrite: {
  //       "^/api": "/v1"
  //     }
  //   }
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
    // babel: {
    //   plugins: [
    //     [
    //       "component",
    //       { libraryName: "element-ui", styleLibraryName: "theme-chalk" }
    //     ]
    //   ]
    // }
  }
};
