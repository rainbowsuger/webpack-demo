
function Footer() {
	let dom = document.getElementById('root');
	let footer = document.createElement('div');
	footer.innerText = 'footer'
	dom.append(footer);
}
// ES module模块方式导出 
export default Footer;
// COMMONJS模块方式导出 
// module.exports = Footer;