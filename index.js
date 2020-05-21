#!/usr/bin/env node

const fs = require("fs");
const chalk = require("chalk");
const path = require('path');

const { lstat } = fs.promises;
// third command line arg is the one input by the user
const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    console.log(err);
  }
  const statPromises = filenames.map((filename) => {
    return lstat(path.join(targetDir, filename));
  });
  try {
    let allStats = await Promise.all(statPromises);
    allStats.forEach((stat, index) => {
      stat.isFile()
        ? console.log(filenames[index])
        : console.log(chalk.bold(filenames[index]));
    });
  } catch (ex) {
    console.log(ex);
  }
});
