module.exports = {
    context: __dirname + "/src",
    entry : [
        'webpack-dev-server/client?http://localhost:3030',
        'webpack/hot/only-dev-server',
        './app.js'
    ],

    output: {
        filename: "bundle.js",
        path: __dirname + "/build",
        publicPath: 'http://localhost:3030/static/'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: ["jsx-loader","react-hot"],
        }
      ],
    }
}