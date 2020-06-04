import path from 'path'
import { dialog } from 'electron'
import { ipcMain } from 'electron'
import ffmpeg from 'fluent-ffmpeg'

Date.prototype.format = function(format)
{
 var o = {
 "M+" : this.getMonth()+1, //month
 "d+" : this.getDate(),    //day
 "h+" : this.getHours(),   //hour
 "m+" : this.getMinutes(), //minute
 "s+" : this.getSeconds(), //second
 "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
 "S" : this.getMilliseconds() //millisecond
 }
 if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
 (this.getFullYear()+"").substr(4 - RegExp.$1.length));
 for(var k in o)if(new RegExp("("+ k +")").test(format))
 format = format.replace(RegExp.$1,
 RegExp.$1.length==1 ? o[k] :
 ("00"+ o[k]).substr((""+ o[k]).length));
 return format;
}

async function getPathToSave(filePath) {
  const originalExt = path.extname(filePath)
  console.log(originalExt)
  console.log('path --------')
  console.log(path.dirname(filePath))
  console.log('name--------')
  const pathToSave = await dialog.showSaveDialog({ defaultPath: path.dirname(filePath) })
  if (pathToSave.canceled, path.basename(pathToSave.filePath).length === 0) {
    return {
      cancelled: true,
    }
  }
  console.log(path.basename(pathToSave.filePath))

  const extToSave = path.extname(pathToSave.filePath)
  console.log(extToSave)
  return extToSave === originalExt ? {
    filePath: path.normalize(pathToSave.filePath),
    cancelled: false,
  } : {
    filePath: path.normalize(`${pathToSave.filePath}${originalExt}`),
    cancelled: false,
  }
}

async function mergeVideo(pathToSave,time,filePath,times) {
  const name = new Date().format('yyyy-MM-dd hh:mm:ss')
  console.log(`${pathToSave.filePath.split('.')[0]}${times}_0.${pathToSave.filePath.split('.')[1]}`)
  if(time.section === 1) {
  ffmpeg()
  .mergeAdd(`${pathToSave.filePath.split('.')[0]}${times}_0.${pathToSave.filePath.split('.')[1]}`)
  .on('error', function(err) {
    console.log('An error occurred: ' + err.message);
  })
  .on('end', function() {
    console.log('Merging finished !');
  })
  .mergeToFile(`${path.dirname(filePath)}/${name}.${pathToSave.filePath.split('.')[1]}`, `${path.dirname(filePath)}`);
} else if (time.section === 2) {
  ffmpeg()
  .mergeAdd(`${pathToSave.filePath.split('.')[0]}${times}_0.${pathToSave.filePath.split('.')[1]}`)
  .mergeAdd(`${pathToSave.filePath.split('.')[0]}${times}_1.${pathToSave.filePath.split('.')[1]}`)
  // .mergeAdd('/Users/zhonghuiping/Desktop/qqww0.mp4')
  // .mergeAdd('/Users/zhonghuiping/Desktop/qqww1.mp4')
  .on('error', function(err) {
    console.log('An error occurred: ' + err.message);
  })
  .on('end', function() {
    console.log('Merging finished !');
  })
  .mergeToFile(`${path.dirname(filePath)}/${name}.${pathToSave.filePath.split('.')[1]}`, `${path.dirname(filePath)}`);
} else if (time.section === 3) {
  ffmpeg()
  .mergeAdd(`${pathToSave.filePath.split('.')[0]}${times}_0.${pathToSave.filePath.split('.')[1]}`)
  .mergeAdd(`${pathToSave.filePath.split('.')[0]}${times}_1.${pathToSave.filePath.split('.')[1]}`)
  .mergeAdd(`${pathToSave.filePath.split('.')[0]}${times}_2.${pathToSave.filePath.split('.')[1]}`)
  .on('error', function(err) {
    console.log('An error occurred: ' + err.message);
  })
  .on('end', function() {
    console.log('Merging finished !');
  })
  .mergeToFile(`${path.dirname(filePath)}/${name}.${pathToSave.filePath.split('.')[1]}`, `${path.dirname(filePath)}`);
} else if (time.section === 4) {
  ffmpeg()
  .mergeAdd(`${pathToSave.filePath.split('.')[0]}${times}_0.${pathToSave.filePath.split('.')[1]}`)
  .mergeAdd(`${pathToSave.filePath.split('.')[0]}${times}_1.${pathToSave.filePath.split('.')[1]}`)
  .mergeAdd(`${pathToSave.filePath.split('.')[0]}${times}_2.${pathToSave.filePath.split('.')[1]}`)
  .mergeAdd(`${pathToSave.filePath.split('.')[0]}${times}_3.${pathToSave.filePath.split('.')[1]}`)
  .on('error', function(err) {
    console.log('An error occurred: ' + err.message);
  })
  .on('end', function() {
    console.log('Merging finished !');
  })
  .mergeToFile(`${path.dirname(filePath)}/${name}.${pathToSave.filePath.split('.')[1]}`, `${path.dirname(filePath)}`);
} else if (time.section === 5) {
  ffmpeg()
  .mergeAdd(`${pathToSave.filePath.split('.')[0]}${times}_0.${pathToSave.filePath.split('.')[1]}`)
  .mergeAdd(`${pathToSave.filePath.split('.')[0]}${times}_1.${pathToSave.filePath.split('.')[1]}`)
  .mergeAdd(`${pathToSave.filePath.split('.')[0]}${times}_2.${pathToSave.filePath.split('.')[1]}`)
  .mergeAdd(`${pathToSave.filePath.split('.')[0]}${times}_3.${pathToSave.filePath.split('.')[1]}`)
  .mergeAdd(`${pathToSave.filePath.split('.')[0]}${times}_4.${pathToSave.filePath.split('.')[1]}`)
  .on('error', function(err) {
    console.log('An error occurred: ' + err.message);
  })
  .on('end', function() {
    console.log('Merging finished !');
  })
  .mergeToFile(`${path.dirname(filePath)}/${name}.${pathToSave.filePath.split('.')[1]}`, `${path.dirname(filePath)}`);
}
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

async function splitVideo(pathToSave,time,filePath,event,times) {
  for(let i=0;i<time.section;i++){
    const duration = time.duration/ time.section
    console.log(duration)

    // range left right
    // let left = Math.random() * (duration * (i+1))
    // let left = (Math.random() * duration) + 1
    // if(i >0) {
    //   left = (Math.random() *  (duration * (i+1))) +1
    // }
    const left = getRandomInt(duration*i,duration*(i+1))
    console.log(left)
    console.log(left + time.second)
    ffmpeg(filePath)
    .setStartTime(left)
    .duration(time.second)
    .on('end', function(error) {
    if(!error) {
      console.log('Save success')
      event.sender.send('video.progress.success', { success: true })
    } else {
      event.sender.send('video.progress.error', { error })
    }
  })
  .on('error', function(error) {
    console.log('Error: ', error)
    event.sender.send('video.progress.error', { error })
  })
  .on('progress', function(progress) {
    event.sender.send('video.progress', { percent: progress.percent })
  })
  .save(path.normalize(pathToSave.filePath.split('.')[0]+times+'_'+i+'.'+pathToSave.filePath.split('.')[1]))
}

}

async function cut(event, { filePath, time }) {
  console.log('Start cut', { filePath, time })
  const pathToSave = await getPathToSave(filePath)
  console.log('Path to save', pathToSave)
  if (pathToSave.cancelled) {
    console.log('Save was cancelled')
    event.sender.send('video.cut.cancelled')
    return
  }


  console.log(time)

  console.log('split--------')

for(let i=0;i<time.second;i++){  

  await splitVideo(pathToSave,time,filePath, event, i)


  // setTimeout(async () => {
  //   await mergeVideo(pathToSave,time,filePath,i)
  // }, (10000*i+10000));
}

// merge vedio
// console.log('merge--------')
// console.log(time.section)
// console.log(`${pathToSave.filePath.split('.')[0]}0.${pathToSave.filePath.split('.')[1]}`)

// console.log(`${path.dirname(filePath)}/33333.${pathToSave.filePath.split('.')[1]}`)
// console.log(`${path.dirname(filePath)}`)
  




}

// async function merge(event, { filePath, time }) {
//   console.log('Start cut', { filePath, time })
//   const pathToSave = await getPathToSave(filePath)
//   console.log('Path to save', pathToSave)
//   if (pathToSave.cancelled) {
//     console.log('Save was cancelled')
//     event.sender.send('video.cut.cancelled')
//     return
//   }


//   console.log(time)

//   console.log('split--------')


// // await mergeVideo(pathToSave,time,filePath, event)

// // merge vedio
// // console.log('merge--------')
// // console.log(time.section)
// // console.log(`${pathToSave.filePath.split('.')[0]}0.${pathToSave.filePath.split('.')[1]}`)

// // console.log(`${path.dirname(filePath)}/33333.${pathToSave.filePath.split('.')[1]}`)
// // console.log(`${path.dirname(filePath)}`)
// //await merge(pathToSave,time,filePath)
  




// }

function registerListeners() {
  ipcMain.on('video.cut', cut)
  // ipcMain.on('video.merge', merge)
}

export function initialize() {
  registerListeners()
  console.log('[API] Cut initialized')
}
