const seReg = require('./config').seReg
const path = require('path')
class SoapOpera {
  constructor (fileName) {
    this.fileName = fileName
    const pathInfo = path.parse(this.fileName)
    this.prefix = `${pathInfo.dir}${pathInfo.name}`
    this.se = this.fileName.search(seReg)
  }

  marry(subtitles){
    const matchSubtitle = subtitles.find(subtitle => {
      const lowerSubtitle = subtitle.toLowerCase()
      const lowerSe = this.se.toLowerCase()
      return lowerSubtitle.includes(lowerSe)
    })
    if(matchSubtitle){
      this.rename(matchSubtitle)
    }else {
      console.warn('match subtitle not found: ', this.fileName)
    }
  }

  rename(subtitle){
    const ext = path.extname(subtitle)
    const soapOperaPath = path.join(this.prefix, ext)
    console.log(`${subtitle} move to ${soapOperaPath}`)
  }

}
module.exports = SoapOpera
