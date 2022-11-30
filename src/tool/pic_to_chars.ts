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

function getBlockGray (imageData: ImageData,x: number, y: number) {
    var sumGray = 0, pixels, rgba = '';
    let index = 0;
    index = (x * imageData.width + y) * 4; //current index in rgba data array
    let data = imageData.data;
    let R,G,B,A;
    R = data[index]
    G = data[index + 1]
    B = data[index + 2]
    A = data[index + 3]
    let gray = ~~(R * 0.3 + G * 0.59 + B * 0.11);
    sumGray += gray;

    rgba = `rgba(${R},${G},${B},${A})`
    pixels = x * y;
    return {
        avg: gray,
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
export function toChars(context:CanvasRenderingContext2D, width: number, height: number) {
    console.log(width,height);
    
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D 
    var output = "", imageData = context.getImageData(0, 0, width, height);
    canvas.width = width
    canvas.height =height
    
        for (var r = 0; r < height; r+=12) {
            for (var c = 0; c < width; c+=6) {
                var pos_x = r //~~(c * char_w)
                var pos_y = c  //~~(r * char_h)
                // console.log(`pos_x:${pos_x} -------- pos_y:${pos_y}`);
                var { avg, rgba } = getBlockGray(imageData,pos_x, pos_y)
                console.log(avg);
                
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

