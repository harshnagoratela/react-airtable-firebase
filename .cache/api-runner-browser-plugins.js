module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-firebase/gatsby-browser.js'),
      options: {"plugins":[],"features":{"auth":true,"database":true,"firestore":true,"storage":false,"messaging":false,"functions":false,"performance":false}},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
