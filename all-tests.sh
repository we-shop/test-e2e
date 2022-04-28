#!/bin/bash

# import everything form .env
export $(cat .env | grep -v ^# | xargs)

echo "Sanity tests..."



# making sure the server has started
echo "------start sleeping------"
pkill -f selenium-standalone
sleep 5
echo "------end sleeping------"

npm run selenium-setup
echo "------starting selenium server------"
npm run selenium-start &
echo "------starting tests------"
npm run all-tests

echo "------stopping selenium & server------"
pkill -f selenium-standalone

