
function Header() {
	let dom = document.getElementById('root');
	let header = document.createElement('div');
	header.innerText = 'header';
	dom.append(header);
}
// ES module方式导出
export default Header;
// COMMONJS模块方式导出 
// module.exports = Header;