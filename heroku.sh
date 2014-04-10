#!/bin/sh

HEROKU_DIR=".heroku"
HEROKU_GIT=$1

CURRENT_DIR=${PWD##*/}

if [ ! -d "$HEROKU_DIR" ]; then
  mkdir ../"$HEROKU_DIR"
  # echo ".heroku" >> .gitignore
  cd ../"$HEROKU_DIR"
  git clone "$HEROKU_GIT" . -o heroku
  echo "web: node heroku-server.js" > Procfile
  echo "var express = require('express');var fs = require('fs');var app = express();var read = function(filename){return fs.readFileSync(filename, 'utf-8');};app.get(/^(.*)$/, function(req, res){var uri = req.params[0];if( uri === '/' ){res.send( read('index.html') );return;}uri = uri.charAt(0) === '/' ? uri.replace('/','') : uri;uri = ''+uri;if( fs.existsSync(uri) ){if( uri.indexOf('.css') > -1 ){res.setHeader('Content-Type', 'text/css');}res.send( read(uri) );return;}});app.listen(process.env.PORT || 3000);" > heroku-server.js
  echo '{  "name": "herokuapp",  "version": "0.1.0",  "description": "",  "main": "heroku.js",  "scripts": {    "test": "echo \"Error: no test specified\" && exit 1"  },  "repository": {    "type": "git",    "url": ""  },  "author": "globant",  "license": "BSD-2-Clause",  "dependencies": {    "express": "~3.4.8"  }}' > package.json
  heroku login
  cd ../"$CURRENT_DIR"
fi

grunt build
cp -r dist/ ../"$HEROKU_DIR"

cd ../"$HEROKU_DIR"

git add .
git c -m "build at $(date)"
git push heroku master