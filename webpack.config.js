const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/o2g-sdk.ts'),
    output: {
        filename: 'o2g-sdk.min.js',
        path: path.resolve(__dirname, 'public/dist'),
        library: {
            name : "o2g",
            type: "umd"
        }
    },
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" },
        ],
    },
};

