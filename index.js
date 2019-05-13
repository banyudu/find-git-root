var path = require('path')
var fs = require('fs')

function findGitRoot(start) {
  start = start || module.parent.filename
  if (typeof start === 'string') {
    if (start[start.length - 1] !== path.sep) {
      start += path.sep
    }
    start = start.split(path.sep)
  }
  if (!start.length) {
    throw new Error('.git/ not found in path')
  }
  start.pop()
  var dir = start.join(path.sep)
  var fullPath = path.join(dir, '.git')
  if (fs.existsSync(fullPath)) {
      if(!fs.lstatSync(fullPath).isDirectory()) {
      var content = fs.readFileSync(fullPath, { encoding: 'utf-8' })
      var match = /^gitdir: (.*)\s*$/.exec(content)
      if (match) {
        return path.normalize(match[1])
      }
    }
    return path.normalize(fullPath)
  } else {
    return findGitRoot(start)
  }
}

module.exports = findGitRoot