import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import image from '@rollup/plugin-image'
import banner from 'rollup-plugin-banner'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
const path = require('path')
const resolveDir = (dir) => path.join(__dirname, dir)

export default {
  input: 'src/main.js',
  output: [
    {
      name: 'PedroQue',
      file: `dist/PedroQue.${process.env.npm_package_version}.js`,
      format: 'umd',
    },
    {
      name: 'PedroQue',
      file: `dist/PedroQue.min.${process.env.npm_package_version}.js`,
      format: 'umd',
      plugins: [terser()]
    }
  ],
  plugins: [
    external({
      preferBuiltins: false,
    }),
    resolve({
      browser: true
    }),
    commonjs(),
    babel({
      exclude: /node_modules/,
      babelHelpers: 'bundled'
    }),
    postcss({
      minimize: true
    }),
    image(),
    json(),
    alias({
      entries: [{ find: '@', replacement: resolveDir('src') }]
    }),
    banner(
      `name: <%= pkg.name %>\nversion: v<%= pkg.version %>\nauthor: <%= pkg.author %>`
    ),
    // 热更新 默认监听根文件夹
    livereload(),
    // 本地服务器
    serve({
      // 自动打开页面
      open: true,
      port: 8000,
      // 打开的页面
      openPage: '/public/index.html',
      contentBase: ''
    })
  ]
}
