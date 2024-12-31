module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'], // Corrigido para 'nativewind/babel' sem 'tailwindcss-'
  };
};
