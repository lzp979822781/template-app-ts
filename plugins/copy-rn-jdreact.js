const fs = require('fs');
const path = require('path');
const rimraf = require("rimraf");


// 获取rn_temp路径
const rnTempPath = path.resolve(__dirname, '../', 'rn_temp/');
// const rootDest = path.resolve(__dirname, '../../', 'jdreact-jsbundle-jdreacttarodemo/rn_temp');
// const rootDest = path.resolve(__dirname, '../../', 'test/rn_temp');

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

async function main(options) {
    const { dest } = options;
    const destDir = `${dest}/rn_temp`;

    rimraf(`${destDir}/`, async () => {
        if(fs.existsSync(rnTempPath)) {
            await copy(rnTempPath, destDir);
        }
    })

    
}

module.exports = (ctx, options) => {
    // plugin 主体
    ctx.onBuildStart(() => {
        console.log('编译开始！')
    })
    ctx.onBuildFinish(() => {
        console.log('编译结束！');
        main(options);
    })
}