let fs = require('fs');
let path = require('path');//解析需要遍历的文件夹
let configPaths = ['./merge'];

// 判断是否存在冲突
let conflictFile = [];

let mcContent = "// create global mc\n"
    + "let mc = {};\n"
    + "(function(){\n"
    + "// register method collections\n"
    + "// register codes come from merge.js\n"
    + "// first run merge.js to create methods then copy here\n";
/**
 * 
 * 解释为啥走到内部文件夹时不会终止：
 *      当走进下文件夹（merge内部文件夹）且访问到最后一个文件时，
 *      进入 checkEnd 函数，++count == files.length 为true，
 *      此时执行callback即 上级传入的回调函数-----callback
 * 
 *      每当执行 checkEnd 内部的 callback 函数时，都相当于执行上级传入的回调函数，callback内部的files及count都是上级调用时的变量，
 *      所以当走到最后一个文件时再执行 callback 函数时，为初始的 ++count == files.length，最终为true
 *  
 * 文件遍历
 * @param {String} folder path param
 * @param {Function} callback complete callback
 * 
 */
function readDirRecur(folder, callback) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(folder, function (err, files) {
        let count = 0;
        let checkEnd = function (n) {
            /* console.log(n, "bad callback")
            console.log(files, count + 1)
            console.log(callback.toString(), count + 1 == files.length); */
            ++count == files.length && callback(86);
        }
        //遍历读取到的文件列表
        files.forEach(function (file) {
            //获取当前文件的绝对路径
            let fullPath = path.join(folder, file);
            //根据文件路径获取文件信息，返回一个fs.Stats对象
            fs.stat(fullPath, function (err, stats) {
                if (stats.isDirectory()) {
                    //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                    return readDirRecur(fullPath, checkEnd);
                } else {
                    /* 过滤不需要merge的文件 */
                    if (file[0] == '.') {

                    } else {
                        // 读取文件内容
                        if(!conflictFile.includes(file)){
                            let content = fs.readFileSync(fullPath, 'utf-8');
                            let contentIndex = content.indexOf("=");
                            content = content.substring(contentIndex + 1);
                            console.log(fullPath + createSymbolString(79 - fullPath.length) + "-- generate success!")
                            mcContent += "mc." + file.split(".")[0] + " =" + content + "\n";
                            conflictFile.push(file);
                        }else{
                            throw new Error("Generate Failed: "+file+" has already exit!")
                        }
                    }
                    checkEnd(file);
                }
            })
        })
        /* 如果为空文件夹则执行回调 */
        files.length === 0 && callback();
    })
}
let timeStart = new Date();

(() => {
    // 创建判断完成全部生成的数字
    let completeGenerator = 0;
    // 执行获取merge文件内容
    for (let index = 0; index < configPaths.length; index++) {
        const element = configPaths[index];
        let itemPath = path.join(__dirname, element);
        readDirRecur(itemPath, function () {
            /* console.log(n, "realcallback"); */
            completeGenerator++
            if(completeGenerator == configPaths.length){
                mcContent += "})();";
                fs.writeFile(__dirname+'/mc.js', mcContent, null, function () { });
                console.log("----------------------------------------------------------------------------------------------------");
                console.log("Elapsed Time -- " + ((new Date() - timeStart) / 1000).toFixed(3) + "s");
            }
        })
    }
})();

function createSymbolString(number) {
    let s = " ";
    for (let index = 0; index < number; index++) {
        s += "-"
    }
    return s;
}
