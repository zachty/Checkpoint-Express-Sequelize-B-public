let tasks = {}; //

/*
  tasks (defined above) will be a place to store tasks by person;
  example:
  {
    person1: [{task object 1}, {task object 2}, etc.],
    person2: [{task object 1}, {task object 2}, etc.],
    etc.
  }
*/

//might let tasks be and object with these on the prototype

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },

  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    // returns an array of all people for whom tasks exist
    return Object.keys(tasks);
  },

  add: function (name, task) {
    // saves a task for a given person
    if (!task.complete) task.complete = false;
    let current = tasks[name];
    if (current) {
      tasks[name] = [...current, task];
    } else {
      tasks[name] = [task];
    }
    return task;
  },

  list: function (name) {
    // returns tasks for specified person
    return tasks[name];
  },

  complete: function (name, idx) {
    // marks a task complete
    tasks[name][idx].complete = true;
  },

  remove: function (name, idx) {
    // removes a tasks
    // tasks[name] = tasks[name].filter(
    //   (task) => tasks[name].indexOf(task) !== idx
    // );
    // const before = [...tasks[name].slice(0, idx)];
    // const after = [...(tasks[name].slice(idx)];
    // tasks[name] = [...before, ...after];
    //above two methods work for express model test but not route
    tasks[name].splice(idx, 1);
  },
};
