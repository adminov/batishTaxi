module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      [
          "module:react-native-dotenv",
        {
        moduleName: "@env",
        path: ".env",
      }],
      [
          "module-resolver",
        {
          root: ["./app"],
          extensions: [".d.ts", ".js", ".ios.js", ".android.js"],
        },
      ],
      ["@babel/plugin-syntax-class-properties"],
      ['@babel/plugin-transform-react-jsx-source'],
    ],
  };
};
