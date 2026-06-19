module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required by react-native-reanimated v4. Must be the LAST plugin.
      'react-native-worklets/plugin',
    ],
  };
};
