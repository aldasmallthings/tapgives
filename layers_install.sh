#!/bin/zsh
echo 'INSTALLING DEPENDENCIES...'
echo 'Navigating to unirest layer...'
cd ussd-app/layers/unirest/nodejs
echo 'Installing unirest...'
npm i
echo 'Unirest installed.'
echo 'Navigating to ussd-menu-builder layer...'
cd ../../ussd-menu-builder/nodejs
echo 'Installing dependencies'
npm i
echo 'Ussd-menu-builder installed.'
echo 'Done.'