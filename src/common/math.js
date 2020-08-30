/**
 * Tree-Shaking只支持ES module方式引入.
 * 因为ES module底层是静态方式引入，而require底层是common js方式是动态引入
 * */ 
/**
 * Code Splitting,代码切割，按需引入。
 * 如下引入lodash第三方库，会打包进out.js,会让包很大，加载时间是长。
 * 
 */
import _ from 'lodash'

console.log(_.join(['a', 'b', 'c'], '***'))
export const add = (a, b) => {
    return a + b
}
export const subtraction = (a, b) => {
    return a - b
}