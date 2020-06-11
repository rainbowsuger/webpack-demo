
// ES module模块引入方式引入 ，报错： 因为浏览器根本不知道import语法
import Header from './header.js'
import Sidebar from './sidebar.js'
import Footer from './footer.js'
import title from './title.jpg'

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

