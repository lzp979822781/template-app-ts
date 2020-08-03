const fs = require('fs');
const path = require('path');

// 获取rn_temp路径
const rnTempPath = path.resolve(__dirname, '../', 'rn_temp/');
const rootDest = path.resolve(__dirname, '../../', 'jdreact-jsbundle-jdreacttarodemo/rn_temp');

function copy(src, dest) {
    const dir = fs.readdirSync(src);
    const srcStat = fs.statSync(src);
    if(!fs.existsSync(dest)) {
        if(srcStat.isDirectory()) {
            fs.mkdirSync(dest);
        }
        if(srcStat.isFile()) {
            fs.copyFileSync(src, dest);
            return;
        }
    }
    dir.forEach(item => {
        const itemPath = path.resolve(src, item);
        const fileStat = fs.statSync(itemPath);
        if(fileStat.isFile()) {
            fs.copyFileSync(itemPath, path.join(dest, item));
        }else if(fileStat.isDirectory()) {
            copy(itemPath, path.join(dest, item))
        }
    });
}

async function main() {

    if(fs.existsSync(rnTempPath)) {
        await copy(rnTempPath, rootDest);
    }
}

main();

