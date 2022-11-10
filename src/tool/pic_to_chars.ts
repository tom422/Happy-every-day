/**
 * Created by Roger on 16/1/2.
 */

function getCharsMap() {
    var chars = ['@', 'w', '#', '$', 'k', 'd', 't', 'j', 'i', '.', ' '];
    var step = 25,
        map:string[] = [];
    for (var i = 0; i < 256; i++) {
        var index = ~~(i / 25)
        map[i] = chars[index];
    }
    ;
    return map;
}
// 获取字符  集合
var map = getCharsMap();

console.log(map);
function getBlockGray (imageData: ImageData,x: number, y: number, w: number, h: number) {
    var sumGray = 0, pixels, rgba = '';
    for (var row = 0; row < w; row++) {
        for (var col = 0; col < h; col++) {
            var cx = x + col, //current position x
                cy = y + row, //current positon y
                index = (cy * imageData.width + cx) * 4, //current index in rgba data array
                data = imageData.data,
                R = data[index],
                G = data[index + 1],
                B = data[index + 2],
                A = data[index + 3],
                gray = ~~(R * 0.3 + G * 0.59 + B * 0.11);
            sumGray += gray;

            rgba = `rgba(${R},${G},${B},${A})`
        }
    }
    pixels = w * h;
    return {
        avg: ~~(sumGray / pixels),
        rgba
    };
};
/**
 * 
 * @param {*} context canvas 上下文对象
 * @param {*} width canvas width
 * @param {*} height canvas height
 * @param {*} rowChars 
 * @returns 
 */
export function toChars(context:CanvasRenderingContext2D, width: number, height: number ,rowChars=400) {

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D 
    var pixels = [],
        output = "",
        imageData = context.getImageData(0, 0, width, height),
        rowChars = width < height ? width : height,
        char_h = width / 12,
        char_w = char_h,
        rows = height / 5,
        cols = rowChars
        //to get a block of pixiels average gray-value.
        
        for (var r = 0; r < rows; r += 6) {
            for (var c = 0; c < cols; c += 6) {
                var pos_x = r //~~(c * char_w)
                var pos_y = c  //~~(r * char_h)
                // console.log(`pos_x:${pos_x} -------- pos_y:${pos_y}`);
                var { avg, rgba } = getBlockGray(imageData,pos_x, pos_y, ~~12, ~~6)
                var ch = map[avg];
                output += ch;
                ctx.font = "6px Arial";
                ctx.fillStyle = rgba;
                ctx.fillText(map[avg], c, r);
            }
    
    
            output += '\r\n';
        };
    console.log(output);
    
    return {
        canvas,
        getImageData:ctx.getImageData(0,0,width,height),
        output
    };
}

/**
 * 图片转灰
 * @param {ImageData} imageData 
 * @returns {ImageData} imageData
 */
export function imageToGrey(imageData:ImageData){
    let pixeldata = imageData.data;
    for (var i = 0; i < pixeldata.length; i += 4) {
        let gray = Math.floor(imageData.data[i] * 0.3 + imageData.data[i + 1] * 0.59 + imageData.data[i + 2] * 0.11);
        imageData.data[i] = gray;
        imageData.data[i + 1] = gray;
        imageData.data[i + 2] = gray;
        imageData.data[i + 3] = 255;
    }

    return imageData
}

