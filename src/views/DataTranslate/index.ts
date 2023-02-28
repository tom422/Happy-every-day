/**
 * 生成随机 id
 * @returns 字符串 
 */
function randomRangeId() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return 't' + s4() + s4() + '_' + s4()

}


// 生成代码
function conversion(value: string) {
    let rowslist = value.split("\n");
    type TableInfo= {
        border: false, // 是否带有纵向边框，默认为false
        loading: false, // 加载中动画
        hasOperation: true, // 有无操作功能
        hasSelect: false, //有无复选框
        checkList:  string[],
        tr: any[],
        data: any[]
    };

    const tableInfo:TableInfo = {
        border: false,
        loading: false,
        hasOperation: true,
        hasSelect: false,
        checkList: [],
        tr: [],
        data: []
    }
    let htmlText = ''
    for (let index = 0; index < rowslist.length; index++) {
        let element = rowslist[index];
        if (!element.trim()) {
            continue
        }

        const row = rowDecompose(element)
        const label = row.label
        const prop = row.prop
        let data = {
            id: randomRangeId(),
            label: label,
            prop: prop,
            show: ''
        }
        if (row.rowData) {
            data.show = 'template'
            let html = (setProp(row.rowData, prop) as any)

            htmlText = htmlText + '\n' + html.template
        }

        tableInfo.checkList.push(data.label)
        tableInfo.tr.push(data)
    }

    let shuchu = JSON.stringify(tableInfo, null, 2)


    let vueTemplate = pageinit(htmlText, shuchu)

    return {
        html: htmlText,
        js: shuchu,
        vueTemplate
    }
}
/**
* 分解数据
*/
function rowDecompose(rowTxt: string) {
    // 截取数据
    const rowData = rowTxt.match(/\((.+?)\)/g)
    let data = ''
    if (rowData) {
        data = rowData[0].replace(/[\(|\)]/g, '')
        rowTxt = rowTxt.replace(rowData[0], '')
    }
    // 去除多余字符
    rowTxt = rowTxt.replace(/string|list/i, '')
    rowTxt = rowTxt.replace(/[是|否]/g, '')


    let propList = rowTxt.match(/\w+\b/)
    let prop = ""
    if (propList) {
        prop = propList[0]
    } else {
        prop = 'name'
    }
    let label = rowTxt.replace(prop, '').trim()

    console.log('label', label);
    console.log('prop', prop);
    return {
        rowTxt: rowTxt,
        label: label,
        prop: prop,
        rowData: data
    }
}


function setProp(propstr: string, propName: string) {
    propName = propName ?? 'name'
    console.log('propstr', propstr);
    let propsList = propstr.match(/\d(.?)[\u4e00-\u9fa5]+/g)

    // console.log('propsList',propsList);
    let arr = [], template = ''

    if (propsList) {
        for (let index = 0; index < propsList.length; index++) {
            const element = propsList[index]; 
            let key, value:any;
            key = element.match(/\d/g)
            if (key) {
                value = element.match(/[\u4e00-\u9fa5]+/g)
                const obj = {
                    key: key[0], 
                    value: (value as string[])[0],
                }
                let temp = setTemplate(propName, key[0], value[0])
                template = template + temp + '\n'
                arr.push(obj)
            }
        }
        template =
            `<template slot="${propName}" slot-scope="current">
${template}
</template>`
        return {
            template: template,
            list: arr
        }
    }


}

function setTemplate(propName: string, key: string, value: string | null) {
    let template = `\t<span v-if="current.row.${propName} == '${key}'">${value}</span>`
    return template
}

function pageinit(html: string, jstxt: string, cssTxt?: undefined) {
    var template =
        `
<template>
    <div>
        ${html}
    </div>
</template>

<script>
export default {
    name: 'TxtModelTemp',

    data() {
        return {
            tableInfo:{}
        };
    },

    mounted() {
        this.init()
    },

    methods: {
        init(){
            this.tableInfo = ${jstxt}
        }
    },
};
</script>

<style lang="scss" scoped>

</style>
`
    return template
}

export default conversion
