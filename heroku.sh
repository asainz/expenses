#!/bin/sh

HEROKU_DIR="../.heroku"
HEROKU_GIT=$1

CURRENT_DIR=${PWD##*/}

if [ ! -d "$HEROKU_DIR" ]; then
  echo "Heroku dir doesn't exist. We have to create it before procceding with the building process."
  
  mkdir "$HEROKU_DIR"
  
  echo "../.heroku created"

  cd "$HEROKU_DIR"
  
  echo "start cloning heroku repo"
  
  git clone "$HEROKU_GIT" . -o heroku
  
  echo "heroku repo cloned"
  
  echo "web: node heroku-server.js" > Procfile
  echo "var express = require('express');var fs = require('fs');var app = express();var read = function(filename){return fs.readFileSync(filename, 'utf-8');};app.get(/^(.*)$/, function(req, res){var uri = req.params[0];if( uri === '/' ){res.send( read('index.html') );return;}uri = uri.charAt(0) === '/' ? uri.replace('/','') : uri;uri = ''+uri;if( fs.existsSync(uri) ){if( uri.indexOf('.css') > -1 ){res.setHeader('Content-Type', 'text/css');}res.send( read(uri) );return;}});app.listen(process.env.PORT || 3000);" > heroku-server.js
  echo '{  "name": "herokuapp",  "version": "0.1.0",  "description": "",  "main": "heroku.js",  "scripts": {    "test": "echo \"Error: no test specified\" && exit 1"  },  "repository": {    "type": "git",    "url": ""  },  "author": "globant",  "license": "BSD-2-Clause",  "dependencies": {    "express": "~3.4.8"  }}' > package.json
  
  heroku login
  
  cd "$CURRENT_DIR"
  
  echo "\033[0;32m We've finished setting all up. We'll continue with the building process"
else
    echo "\033[0;32m Heroku dir already exists. We'll continue with the building process"
fi

echo "\033[0;33m start building"
grunt build

echo "\033[0;33m building finished"
echo "\033[0;33m copying dist folder to ../.heroku"

cp -r dist/ "$HEROKU_DIR"

cd "$HEROKU_DIR"

git add .
git c -m "build at $(date)"
git push heroku master

echo "\033[0;32m all done :)"