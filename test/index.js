'use strict';

const assert = require('power-assert')
const findGitRoot = require('..')
const path = require('path')

describe('findGitRoot', () => {
  const root = path.normalize(path.join(__dirname, '..', '.git'))
  it('Should be ok when start with a file', () => {
    assert.equal(findGitRoot(__filename), root)
  })
  it('Should be ok when start with a dir', () => {
    assert.equal(findGitRoot(__dirname), root)
  })
  it('Should be ok when argument is empty', () => {
    assert.equal(findGitRoot(), root)
    assert.equal(findGitRoot(null), root)
  })
})
