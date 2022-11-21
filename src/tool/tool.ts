/**
 * 返回当前元素的文本内容
 * @parm {DOM} element 当前DOM元素
 */
 function selectText(element:HTMLElement){
    return element.innerText;
}
/**
 * @param {String} text 需要复制的内容
 * @return {Boolean} 复制成功:true或者复制失败:false  执行完函数后，按ctrl + v试试
*/
function copyText(text:string){

    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        console.log("复制成功");
    } else {
        var textValue = document.createElement('textarea');
        textValue.setAttribute('readonly', 'readonly'); //设置只读属性防止手机上弹出软键盘
        textValue.value = text;
        document.body.appendChild(textValue); //将textarea添加为body子元素
        textValue.select();
        var res = document.execCommand('copy');
        document.body.removeChild(textValue);//移除DOM元素
        console.log("复制成功");
    }

}
