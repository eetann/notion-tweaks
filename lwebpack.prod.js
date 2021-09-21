const { merge } = require('webpack-merge');
const common = require('./lwebpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        ascii_only: false,
                    },
                },
            }),
        ],
    },
});
