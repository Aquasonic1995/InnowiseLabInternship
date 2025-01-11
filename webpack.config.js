const path = require("path"); // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Точка входа для сборки проекта

  output: {
    filename: "bundle.js", // Имя выходного файла сборки
    path: path.resolve(__dirname, "dist"), // Путь для выходного файла сборки
  },

  /* global __dirname */
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Transpile ES6+ to ES5
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      {
        test: /\.css$/, // Регулярное выражение для обработки файлов с расширением .css
        use: ["style-loader", "css-loader"], // Загрузчики, используемые для обработки CSS-файлов
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // Каталог для статики
    },
    hot: true,
    open: true,
    watchFiles: ["src/**/*.html"],
  },

  mode: "development", // Режим сборки
};
