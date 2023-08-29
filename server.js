import inquirer from 'inquirer';

const port = 3000;

inquirer
  .prompt([
    /* Pass questions in here */
  ])
  .then((answers) => {
    // Use for user feedback
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });