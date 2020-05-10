module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },

  devServer: {
    contentBase: 'dist',
    open: true
  }
}
