## Plex Desktop

**Spencer Prentiss, 2022.**

Plex desktop application written in JavaScript using Electron.

Requires a Plex media server to function. Once Plex server is up  
and running, update _plexServer_ and _plexPort_ in [src/main.js](https://github.com/Spencer-Prentiss/plex-desktop/blob/master/src/main.js).

This package uses yarn to handle building and packaging.  
To install yarn, use `npm i -g yarn`

To run, use `yarn start` or press F5.  
To webpack source, use `yarn build`.  
To package application, use `yarn dist`.  
Only current build/test target is Windows x64.
