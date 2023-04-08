module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
      require.resolve("expo-router/babel"),
      ["inline-dotenv",{
        path: '.env' // See motdotla/dotenv for more options
      }]
    ],
    // env: {
    //   development: {
    //     plugins: ['inline-dotenv'],
    //   },
    // }
  };
};
