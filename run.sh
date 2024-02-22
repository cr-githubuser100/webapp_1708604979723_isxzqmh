#!/bin/bash

path="C:/Users/HP/Desktop/Thamizh/one/gitRatelimit"
num_iterations=2

for ((i = 1; i <= num_iterations; i++)); do
  echo "Iteration $i"
  rm -rf "$path/file"
  
  if [ -d "$path/node_modules" ]; then
    cd "$path"
    # node File.js
    node create.js
  else
    cd "$path"
    npm i
    node File.js
    node create.js
  fi
done
