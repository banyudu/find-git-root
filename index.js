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
  if (fs.existsSync(path.join(dir, '.git'))) {
    return path.normalize(dir)
  } else {
    return findGitRoot(start)
  }
}

module.exports = findGitRoot