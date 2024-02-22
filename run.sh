
path="C:/Users/HP/Desktop/Thamizh/one/gitRatelimit"
rm -rf C:/Users/HP/Desktop/Thamizh/one/gitRatelimit/file
if [ -d "$path/node_modules" ]; then
  cd "$path"
  node File.js
  node create.js

else
  cd "$path"
  node File.js
  node create.js
fi
