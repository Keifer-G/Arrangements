let fs = require('fs');
let path = require('path');//解析需要遍历的文件夹
//  let filePath = path.resolve('./merge');

let configPaths = ['./merge/request','./merge/utils'];

let vmcContent = "// create global vmc\n"
    + "let vmc = {};\n"
    + "(function(){\n"
    + "// register method collections\n"
    + "// register codes come from merge.js\n"
    + "// first run merge.js to create methods then copy here\n";

//调用文件遍历方法
//文件遍历方法
function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            //遍历读取到的文件列表
            files.forEach(function (filename) {
                //获取当前文件的绝对路径
                let filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir, function (eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {
                        let isFile = stats.isFile();//是文件
                        let isDir = stats.isDirectory();//是文件夹
                        if (isFile) {
                            // 读取文件内容
                            let content = fs.readFileSync(filedir, 'utf-8');
                            let contentIndex = content.indexOf("=");
                            content = content.substring(contentIndex + 1);
                            let itemName = filename.split(".")[0];
                            console.log(filePath + "\\" + itemName + ".js -- generate success!")
                            //let parentName = getParent(filePath);
                            //itemName = parentName ? parentName + '.' + itemName : "."+itemName;
                            vmcContent += "vmc." + itemName + " =" + content + "\n";
                        }
                        if (isDir) {
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}

/* 
function getParent(path){
    let parent = "";
    let splitPath = path.split('\\');
    let start = splitPath.findIndex(item=>item=="merge") + 1;
    for(let i = start; i < splitPath.length; i++){
        parent += ("."+splitPath[i]);
    }
    return parent;
} */

(function (filePaths) {
    for (let index = 0; index < filePaths.length; index++) {
        const element = filePaths[index];
        let filePath = path.resolve(element);
        fileDisplay(filePath);
        //console.log(filePath);
    } 
    setTimeout(() => {
        vmcContent += "})();";
        fs.writeFile('./vmc.js', vmcContent, null, function () { });
    }, 2000)
})(configPaths);

