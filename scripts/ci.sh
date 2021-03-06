#!/bin/bash


if  yarn test:unit ; then
  echo "UNIT TESTS PASSED"
else
  echo "UNIT TESTS FAILED"
  cd ../..
  exit 1
fi

cd e2eTests
if  yarn test:web ; then
  echo "E2E WEB TESTS PASSED"
else
  echo "E2E WEB TESTS FAILED"
  cd ../..
  exit 1
fi

if  yarn test:ios ; then
  echo "E2E IOS TESTS PASSED"
else
  echo "E2E IOS TESTS FAILED"
  cd ../..
  exit 1
fi
