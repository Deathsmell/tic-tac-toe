const path = require('path')

const commonPath = (dir) => {
    const dirs = ['src', 'main', 'resources', 'js']
    if (dir) {
        dirs.push(...dir)
    }
    return path.join(__dirname, ...dirs);
}

module.exports = {
    entry: ['@babel/polyfill',commonPath(['index.js'])],
    module: {
        rules: [

            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            },
        ]
    },

    plugins: [],
    resolve: {
        modules: [
            commonPath(),
            path.join(__dirname, 'node_modules'),
        ],
    }
}