
// ES module模块引入方式引入 ，报错： 因为浏览器根本不知道import语法
// import "@babel/polyfill";
import Header from './common/header.js'
import Sidebar from './common/sidebar.js'
import Footer from './common/footer.js'
import title from './title.jpg'
import './common/css/style.css'
// 默认-虽然只引入了add但是math中其他方法也会打包进去。Tree-Shaking
import { add } from './common/math.js'

console.log('add', add(1, 9))
let image = new Image();
image.src = title;

let dom = document.getElementById('root');
dom.append(image);

// COMMON JS方式引入
// let Header = require('./header.js');
// let Header = require('./sidebar.js');
// let Header = require('./footer.js');

new Header();
new Sidebar();
new Footer();

const arr = [
    new Promise(() => {}),
    new Promise(() => {}),
];
arr.map(item => {
    console.log(item);
})