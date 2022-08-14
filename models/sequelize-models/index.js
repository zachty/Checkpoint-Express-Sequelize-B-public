const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

//Task model
const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  due: Sequelize.DATE,
});

//Model methods
Task.clearCompleted = async function () {
  //select all tasks where cpmpleted is true and remove them
  await Task.destroy({
    where: {
      complete: true,
    },
  });
};

Task.completeAll = async function () {
  await Task.update({ complete: true }, { where: { complete: false } });
};

//Task instance methods
Task.prototype.getTimeRemaining = function () {
  const due = this.due - Date.now();
  return due ? due : Infinity;
  // return this.due - Date.now() || Infinity; //short circuit
};

Task.prototype.isOverdue = function () {
  return this.getTimeRemaining() < 0 && !this.complete;
};

Task.prototype.assignOwner = function (owner) {
  return this.setOwner(owner);
};

//Owner model
const Owner = db.define(
  'Owner',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    hooks: {
      beforeDestroy: (owner) => {
        if (owner.name === 'Grace Hopper') throw new Error('Not allowed!');
      },
    },
  }
);

//Owner model methods
Owner.getOwnersAndTasks = function () {
  //returns a promise of all owners and tasks
  return Owner.findAll({
    include: {
      model: Task,
    },
  });
};

//Owner instance methods
Owner.prototype.getIncompleteTasks = function () {
  return this.getTasks({ where: { complete: false } });
};

//Owner instance hook
//Owner.beforeDestroy(owner => {})

//relations that create magic methods
Task.belongsTo(Owner);
Owner.hasMany(Task);

//---------^^^---------  your code above  ---------^^^----------

module.exports = {
  Task,
  Owner,
};
