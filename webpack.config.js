module.exports = {
   entry: './src/main.js',
   output: {
      path: __dirname,
      filename: 'main.js',
      libraryTarget: 'commonjs2',
   },
   devtool: 'none',
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
               plugins: ['transform-react-jsx'],
            },
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
      ],
   },
   externals: {
      scenegraph: 'scenegraph',
      application: 'application',
      uxp: 'uxp',
   },
};
