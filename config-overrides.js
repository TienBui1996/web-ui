const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  // config = rewireLess.withLoaderOptions({
  //   javascriptEnabled: true,
  //   modifyVars: {
  //     //      "@layout-trigger-background": "#84CEEB",
  //     //      "@layout-header-background": "#5AB9EA",
  //     //      "@menu-dark-submenu-bg": "#5680E9"
  //   }
  // })(config, env);
  return config;
};
