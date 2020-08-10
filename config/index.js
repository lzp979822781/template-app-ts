const path = require('path');

const copyRnToJdreact = path.resolve(__dirname, '..', 'plugins/copy-rn-jdreact');

const plugins = [
    'transform-decorators-legacy',
    'transform-class-properties',
    'transform-object-rest-spread',
    ['transform-runtime', {
            helpers: false,
            polyfill: false,
            regenerator: true,
            moduleName: 'babel-runtime'
        }
    ]
];

const rnPlugin = ["import", { libraryName: "@ant-design/react-native" }];
const isRn = process.env.TARO_ENV === 'rn';

if(isRn) {
    plugins.push(rnPlugin);
}

// Taro plugin 
const extraPlugins = [];
const copyRnPlugin = [copyRnToJdreact, {
    dest: path.resolve(__dirname, '../../', 'jdreact-jsbundle-JDReactMasterOfLoader')
}];

if(isRn) {
    extraPlugins.push(copyRnPlugin);
}

const config = {
    projectName: 'template-app-ts',
    date: '2020-3-13',
    designWidth: 750,
    deviceRatio: {
        '640': 2.34 / 2,
        '750': 1,
        '828': 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: `dist/${process.env.TARO_ENV}`,
    alias: {
        '@/components': path.resolve(__dirname, '..', 'src/components'),
        '@/utils': path.resolve(__dirname, '..', 'src/utils'),
        '@/styles': path.resolve(__dirname, '..', 'src/styles'),
        '@': path.resolve(__dirname, '../', 'src')
    },
    babel: {
        sourceMap: true,
        presets: [
            ['env', {
                modules: false
            }]
        ],
        plugins
    },
    plugins: [
        '@tarojs/plugin-sass',
        '@tarojs/plugin-terser',
        ...extraPlugins
    ],
    defineConstants: {
    },
    mini: {
        postcss: {
            autoprefixer: {
                enable: true,
                config: {
                    browsers: [
                        'last 3 versions',
                        'Android >= 4.1',
                        'ios >= 8'
                    ]
                }
            },
            pxtransform: {
                enable: true,
                config: {

                }
            },
            url: {
                enable: true,
                config: {
                    limit: 10240 // 设定转换尺寸上限
                }
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]'
                }
            }
        },
        compile: {
            exclude: [
                path.resolve(__dirname, '..', 'src/pages/login')
            ]
        }
    },
    h5: {
        publicPath: '/',
        staticDirectory: 'static',
        esnextModules: ['taro-ui'],
        postcss: {
            autoprefixer: {
                enable: true,
                config: {
                    browsers: [
                        'last 3 versions',
                        'Android >= 4.1',
                        'ios >= 8'
                    ]
                }
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]'
                }
            }
        },
        devServer: {
            proxy: {
                "/api": {
                    target: "http://yaogy.jd.com/",
                    secure: false,
                    changeOrigin: true,
                },
            }
        }
    }
}

module.exports = function (merge) {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, require('./dev'))
    }
    return merge({}, config, require('./prod'))
}
