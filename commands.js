#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');
const {
    listTodo,
    createTodo,
    syncTodo,
    updateTodo,
    findTodo,
    deleteTodo,
    finishTodo
} = require('./index');

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Todo\'s title'
  },
];

const questions_delete = [
  {
    type: 'input',
    name: 'confirm',
    message: 'Confirm delete (Y/N)'
  },
];

const questions_finish = [
  {
    type: 'input',
    name: 'confirm',
    message: 'Confirm complete (Y/N)'
  },
];

program 
  .version('1.0.0')
  .description('Client Management System');

program
  .command('create')
  .alias('c')
  .description('Create todo')
  .action(() => {
    prompt(questions).then(answers => createTodo(answers));
  });

program
  .command('update <_id>')
  .alias('u')
  .description('Update todo')
  .action((_id) => {
    prompt(questions).then(answers => updateTodo(_id, answers));
  });

program
  .command('del <_id>')
  .alias('d')
  .description('Delete todo')
  .action((_id) => {
    prompt(questions_delete).then(answers => {
      if(['Y','y'].includes(answers.confirm)) deleteTodo(_id);
    });
  });

program
  .command('finish <_id>')
  .alias('fin')
  .description('Finish todo')
  .action((_id) => {
    prompt(questions_finish).then(answers => {
      if(['Y','y'].includes(answers.confirm)) finishTodo(_id);
    });
  });

program
  .command('list')
  .alias('l')
  .description('List all databases')
  .action(() => listTodo());

program
  .command('find <title>')
  .alias('f')
  .description('Find todo')
  .action( title => findTodo(title));

program
  .command('sync')
  .alias('s')
  .description('Sync todo')
  .action(() => syncTodo());

program.parse(process.argv);