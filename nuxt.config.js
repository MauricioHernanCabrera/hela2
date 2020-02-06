const routerBase =
  process.env.DEPLOY_ENV === "GH_PAGES"
    ? {
        router: {
          base: "/hela2/"
        }
      }
    : {};

const BASE_URL =
  process.env.DEPLOY_ENV === "GH_PAGES"
    ? "https://mauriciohernancabrera.github.io/hela2"
    : "http://localhost:3000";

const page = {
  title: "Hela2",
  description: "Arma tu orden de Mc postres rapidamente",
  safe: {
    img: `${BASE_URL}/safe_img.png`,
    alt: "Logo de Hela2"
  },
  favicon: `${BASE_URL}/logo.ico`,
  creator: "@hernanmc06"
};

export default {
  ...routerBase,

  env: {
    BASE_URL
  },

  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: page.title,
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=no"
      },
      {
        hid: "description",
        name: "description",
        content: `${page.description}`
      },

      { name: "google", content: "notranslate" },

      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: `${page.title}` },
      {
        name: "twitter:creator:752703023583899649",
        content: `${page.creator}`
      },
      { name: "twitter:description", content: `${page.description}` },
      { name: "twitter:image", content: `${page.safe.img}` },
      { name: "twitter:image:alt", content: `${page.safe.alt}` },

      { property: "og:type", content: "website" },
      { property: "og:title", content: `${page.title}` },
      { property: "og:url", content: `${BASE_URL}` },
      { property: "og:image", content: `${page.safe.img}` },
      { property: "og:site_name", content: `${page.title}` },
      { property: "og:description", content: `${page.description}` }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: `${page.favicon}` },
      {
        href:
          "https://fonts.googleapis.com/css?family=Karla:400,700&display=swap",
        rel: "stylesheet"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["@/assets/styles.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/vue-composition-api", "@/plugins/init-state"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "cookie-universal-nuxt"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  manifest: {
    name: "Hela2",
    short_name: "H2",
    lang: "en_US",
    start_url: "/hela2/",
    scope: "/hela2/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#F6F6F6"
  },

  workbox: {
    runtimeCaching: [
      {
        urlPattern: "/^https://fonts.(?:googleapis|gstatic).com/(.*)/",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: {
          cacheName: "google-font-hela2",
          cacheExpiration: {
            maxEntries: 10000,
            maxAgeSeconds: 365 * 24 * 60 * 60
          }
        }
      }
    ]
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
