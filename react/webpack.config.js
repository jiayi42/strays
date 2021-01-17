const loader = require('sass-loader');
const webpack =require('webpack');
//babel converts es6 to es5 for different browser, and import ant design(bootstrap like tool)
// different css formats
//devServer will be used in package.json
module.exports = {
    entry:'./src/index.jsx',
    devtool:'source',
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(scss|less|css)$/,
                use: ['style-loader','css-loader','sass-loader']
            },

        ]
    },
    resolve:{
        extensions:['*','.js','.jsx']
    },
    output:{
        path: __dirname+'/dist',
        publicPath:'/',
        filename:'samples.js'
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer:{
        contentBase:'./dist',
        hot:true,
        host:'localhost',
        port:2000,
        proxy:{
            '/api':'http://localhost:8000',
            '/images':'http://localhost:8000'
        }
    }
}