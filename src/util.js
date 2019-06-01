const fs = require('fs-extra')
const path = require('path')
const MOVIE_SUFFIX = ['mp4', 'mkv', 'avi']
const isMovie = fileName => {
    const ext = path.extname(fileName).slice(1)
    return MOVIE_SUFFIX.includes(ext)
}
const isSoapOpera = fileName => {
    if (isMovie(fileName)) {
        const seReg = /s\d+e\d+/i
        return seReg.test(fileName)
    }
    return false
}
