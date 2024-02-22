const axios = require('axios');
const shell = require('shelljs');
const fs = require('fs');
const path = require('path');

// GitHub credentials and repository settings
const token = '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';
const username = 'tamilselvan'; 
const userEmail = 'tamilselvancinnaiyan1@gmail.com';
const commitMessage = 'Update file';
const directoryPath = './file';
const randomStringsFilePath = 'C:\\Users\\HP\\Desktop\\Thamizh\\one\\gitRatelimit\\randomStrings.txt';

// Function to generate a random repository name with timestamp
const generateRepoName = () => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(7);
  return `webapp_${timestamp}_${randomString}`;
};

const createRepo = async () => {
  const repoName = generateRepoName(); // Generate random repo name
  try {
    const response = await axios.post(
      `https://api.github.com/user/repos`,
      {
        name: repoName,
        private: false, // Set to true to create a private repository
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(`Repository created at ${response.data.clone_url}`);
    
    // Append the generated repository name to the file
    fs.appendFileSync(randomStringsFilePath, `${repoName}\n`);
    console.log("*****************************************************************************************");
    console.log("%c x-ratelimit-limit: " + response.headers['x-ratelimit-limit'], "color: blue; font-weight: bold;");
    console.log("%c x-ratelimit-remaining: " + response.headers['x-ratelimit-remaining'], "color: green; font-weight: bold;");
    // console.log("%c x-ratelimit-reset: " + response.headers['x-ratelimit-reset'], "color: orange; font-weight: bold;");
    console.log("%c x-ratelimit-used: " + response.headers['x-ratelimit-used'], "color: red; font-weight: bold;");
    console.log("*****************************************************************************************");

    return response.data.clone_url;
  } catch (error) {
    console.error('Failed to create repository:', error.message);
    process.exit(1);
  }
};

const setupAndPush = async (repoUrl) => {
  shell.cd(directoryPath); // Change to the specified directory

  if (!shell.which('git')) {
    console.error('Git is not installed');
    process.exit(1);
  }

  // Initialize Git repository if not already initialized
  if (!shell.test('-e', '.git')) {
    shell.exec('git init');
    shell.exec(`git remote add origin ${repoUrl}`);
  } else {
    // Ensure the correct remote is set
    shell.exec('git remote set-url origin ' + repoUrl);
  }

  // Configure Git with the specified username and email
  shell.exec(`git config user.name "${username}"`);
  shell.exec(`git config user.email "${userEmail}"`);

  // Add all files, commit, and push
  shell.exec('git add .');
  shell.exec(`git commit -m "${commitMessage}"`);
  const repoUrlWithToken = repoUrl.replace('https://', `https://${token}@`);
  const pushResult = shell.exec(`git push -u origin master`, { silent: true });

  if (pushResult.code !== 0) {
    console.error('Failed to push changes:', pushResult.stderr);
    process.exit(1);
  } else {
    console.log('Changes pushed successfully.');
  }
};

const main = async () => {
  const repoUrl = await createRepo();
  const repoUrlWithToken = repoUrl.replace('https://', `https://${token}@`); // Add token directly to URL
  await setupAndPush(repoUrlWithToken); // Pass repoUrlWithToken to setupAndPush function
};

main();
