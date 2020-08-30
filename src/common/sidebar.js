
function Sidebar() {
	let dom = document.getElementById('root');
	let sidebar = document.createElement('div');
	sidebar.innerText = 'sidebar'
	dom.append(sidebar);
}
// ES module方式导出
export default Sidebar;
// COMMONJS模块方式导出 
// module.exports = Footer;