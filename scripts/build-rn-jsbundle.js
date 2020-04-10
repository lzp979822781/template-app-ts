/* eslint-disable import/no-commonjs */
const fs = require('fs');
const { exec } = require("child_process");
const argv = process.argv;
const isClean = argv.includes("clean");

const buildCommand = "node ./node_modules/react-native/local-cli/cli.js bundle --entry-file ./rn_temp/index.js --bundle-output ./bundle/index.bundle --assets-dest ./bundle --platform ios --dev false --verbose";
const iosBuild = "node ./node_modules/react-native/local-cli/cli.js bundle --entry-file ./rn_temp/index.js --bundle-output ./bundle/index.bundle --assets-dest ./bundle --platform ios --dev false --verbose";

const dirName = 'bundle';
const assetsDir = 'assets'
const plat = {
    'win32': `rd ./${dirName} ./${assetsDir}`,
    'other': `rm -rf ./${dirName} ./${assetsDir}`
}

function deleteDir() {
    const platform = process.platform;
    const command = platform.toLowerCase() === 'win32' ? plat[platform.toLowerCase()] : plat.other;
    exec(command, (error, stdout, stderr) => {
        if(error) {
            console.log("delete error", error, stderr);
            return;
        }
        mkDir();
    })
}

function mkDir() {
    exec(`mkdir ./${dirName}`, (error, stdout, stderr) => {
        if(error) {
            console.log("makedir error", error, stderr);
            return;
        }
        execBuild();
    })
}

function execBuild() {
    const build = exec(buildCommand, (error, stdout, stderr) => {
        if(error) {
            console.log("makedir error", error, stderr);
            return;
        }
    })

    build.stdout.on('data', data => console.log(data))
}

fs.exists('bundle', function(exists) {
    if(isClean) {
        clean(exists);
        return;
    } 
    
    build(exists)
    
})

function build(exists) {
    if(exists) {
        // 删除文件夹及其子文件夹内容
        deleteDir()
    } else {
        // 创建文件夹并执行命令
        mkDir();
    }
}

function clean(exists) {
    if(exists) { 
        deleteDir() 
    }
}

