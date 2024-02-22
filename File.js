const fs = require('fs');
const path = require('path');

// Directory path
const directoryPath = 'C:\\Users\\HP\\Desktop\\Thamizh\\one\\gitRatelimit\\file\\';

// Content to write into each file
const fileContent = 'This is the content of the file.';

// Generate 100 files
for (let i = 1; i <= 100; i++) {
  const fileName = `file${i}.txt`;
  const filePath = path.join(directoryPath, fileName);

  // Write the file
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error(`Error creating file ${fileName}:`, err);
    } else {
      console.log(`File ${fileName} created successfully.`);
    }
  });
}
