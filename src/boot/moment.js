// import something here
import VueMoment from 'vue-moment'
import moment from 'moment'
require('moment/locale/es')
// import moment from 'moment-timezone'

// "async" is optional
export default async ({ Vue /* app, router, Vue, ... */ }) => {
  // something to do
  Vue.use(VueMoment, {moment})
}
