#!/bin/sh

HEROKU_DIR=".heroku"
HEROKU_GIT=$1

if [ ! -d "$HEROKU_DIR" ]; then
  mkdir "$HEROKU_DIR"
  echo ".heroku" >> .gitignore
  cd "$HEROKU_DIR"
  echo "var express = require('express');var fs = require('fs');var app = express();var read = function(filename){return fs.readFileSync(filename, 'utf-8');};app.get(/^(.*)$/, function(req, res){var uri = req.params[0];if( uri === '/' ){res.send( read('dist/index.html') );return;}uri = uri.charAt(0) === '/' ? uri.replace('/','') : uri;uri = 'dist/'+uri;if( fs.existsSync(uri) ){if( uri.indexOf('.css') > -1 ){res.setHeader('Content-Type', 'text/css');}res.send( read(uri) );return;}});app.listen(process.env.PORT || 3000);" > heroku-server.js
  echo "web: node heroku-server.js" > Procfile
  git clone "$HEROKU_GIT" -o heroku
  heroku login
  cd ../
fi

cd "$HEROKU_DIR"

grunt build
cp -r dist/ .heroku

git add .
git c -m "build at $(date)"
git push