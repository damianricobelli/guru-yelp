module.exports = {
  env: {
    REACT_APP_GOOGLE_API_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
    API_KEY_ABSTRACT: process.env.API_KEY_ABSTRACT,
    YELP_CLIENT_ID: process.env.YELP_CLIENT_ID,
    YELP_API_KEY: process.env.YELP_API_KEY
  },
  future: {
    webpack5: true
  }
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*?)",
  //       headers: [
  //         {
  //           key: "X-Requested-With",
  //           value: "XMLHttpRequest"
  //         },
  //         {
  //           key: "Authorization",
  //           value: `Bearer ${process.env.YELP_API_KEY}`
  //         },
  //         {
  //           key: "Accept-Language",
  //           value: "en-US"
  //         }
  //       ]
  //     }
  //   ]
  // }
}
