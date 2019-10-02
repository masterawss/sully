// import something here

// "async" is optional
export default async ({ Vue /* app, router, Vue, ... */ }) => {
  // something to do
  Vue.prototype.$env = {
    BASE_URL: 'https://isully.web.app/#'
  }
}
