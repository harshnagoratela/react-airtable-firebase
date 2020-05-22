const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/workspace/react-airtable-firebase/.cache/dev-404-page.js"))),
  "component---src-pages-404-jsx": hot(preferDefault(require("/workspace/react-airtable-firebase/src/pages/404.jsx"))),
  "component---src-pages-app-jsx": hot(preferDefault(require("/workspace/react-airtable-firebase/src/pages/app.jsx"))),
  "component---src-pages-index-jsx": hot(preferDefault(require("/workspace/react-airtable-firebase/src/pages/index.jsx")))
}

