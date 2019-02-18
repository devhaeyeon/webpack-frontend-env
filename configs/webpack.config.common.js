const path = require('path');
module.exports = {
    entry: ['@babel/polyfill',path.resolve(__dirname, '../src/js/index.js')],
    module:{
        rules :[
            {
                test: /\.js$/,
                include :[
                    path.join(__dirname)
                ],
                exclude:/(node_modules|bower_components)/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env'],
                        plugins:[
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                }    
            }
        ]
    },
    devtool: 'source-map'
}