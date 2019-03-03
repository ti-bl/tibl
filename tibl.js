// import Prism from 'prismjs'
const prism = require('prismjs')
const marked = require('marked')
const tocbot = require('tocbot')

document.getElementById('content').innerHTML =
      marked('# Marked in browser\n\nRendered by **marked**.');

prism.highlightAll();