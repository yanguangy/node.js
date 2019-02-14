const request = require('request');
const path = require('path');
const fs = require('fs');
const config = require('./config');
const analyze = require('./analyze');



function download (imgUrl,i){
    // let ext = imgUrl.split('.').pop();
    // console.log(config.url+imgUrl)
    console.log(imgUrl.indexOf('http'));
    if(imgUrl.indexOf('http')>-1){
        request(imgUrl).pipe(fs.createWriteStream(path.join(config.imgDir,i+'.png'),{
            'encoding':'utf8'
        }));
    }
   
}

function start () {
    request(config.url,function(err,res,body){
        console.log('开始');
        if(!err&&res){
            console.log('start...');
            analyze.findImg(body,download);
        }else{
            console.log(err);
        }
    })
}

start();