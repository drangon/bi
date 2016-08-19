var webpack=require('webpack');
var path=require('path');
var modulePath=path.join(__dirname, '/script/modules/');

module.exports={

    context: path.join(__dirname, '/script/apps'),

    entry: {
        'cinema/cindex': './cinema/cindex',
        'cinema/movie': './cinema/movie',
        'cinema/ticket': './cinema/ticket',
        'cinema/selCinema': './cinema/selCinema',
        'index': './index',
        'global': './global',
        'movie/mindex': './movie/mindex',
        'movie/movieDetail': './movie/movieDetail',
        'user/uindex': './user/uindex',
        'user/login': './user/login'
    },

    output: {
        filename: '[name].js',
        path: 'build'
    },
    devtool: false,
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor.js'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            chartAxisSet: 'chartAxisSet'
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },

    resolve: {
        alias: {
            ajax: modulePath+'ajax',
            chart: modulePath+'chart',
            chartData: modulePath+'chartData',
            chartAxisSet: modulePath+'chartAxisSet',
            chartTooltip: modulePath+'chartTooltip',
            event: modulePath+'event',
            errorBox: modulePath+'errorBox',
            dateChange: modulePath+'dateChange',
            dataListHtml: modulePath+'dataListHtml',
            dataListFilter: modulePath+'dataListFilter',
            movieDataList: modulePath+'movieDataList',
            getDate: modulePath+'getDate',
            search: modulePath+'search',
            zepto: modulePath+'zepto',
            date: modulePath+'date',
            calendar: modulePath+'calendar',
            slider: modulePath+'slider',
            bindEvent: modulePath+'bindEvent',
            errorDataHtml: modulePath+'errorDataHtml',
            ajaxError: modulePath+'ajaxError',
            ecllipseText: modulePath+'ecllipseText',
            reloadChart: modulePath+'reloadChart',
            formatDate: modulePath+'formatDate'
        }
    }

};