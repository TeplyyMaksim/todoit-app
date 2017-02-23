import Ember from 'ember';

export default Ember.Controller.extend({

  task: '',
  newTaskIsValid: Ember.computed.notEmpty('task'),

  actions: {
    addNewTask(){
      const todoitId = this.get('model.id');
      const todoit = this.store.peekRecord('todoit', todoitId);

      const newTask = this.store.createRecord('task', {
        todoit: todoit,
        name: this.get('task')
      });

      // Statistics update
      this.set('model.allTasks', this.get('model.allTasks') + 1);
      this.set('model.activeTasks', this.get('model.activeTasks') + 1);

      // Save everything
      // second line is required
      // to save the relationship
      newTask.save();
      todoit.save();

      // Clean task
      this.set('task', '');

    },

    changeState(task){
      if (task.get('completed')) {
        // Statistics update
        this.set('model.activeTasks', this.get('model.activeTasks') + 1);
        this.set('model.completedTasks', this.get('model.completedTasks') - 1);

        task.set('completed', false);
      } else {
        // Statistics update
        this.set('model.completedTasks', this.get('model.completedTasks') + 1);
        this.set('model.activeTasks', this.get('model.activeTasks') - 1);

        task.set('completed', true);
      }
      task.save();
      this.get('model').save();
    },

    /* Edit task name block */
    editTaskName(task){
      task.set('isEditing', true);
    },
    cancelTaskEdit(task) {
      task.set('isEditing', false);
      task.rollbackAttributes();
    },
    saveTaskName(task) {
      task.set('isEditing', false);
      task.save();
    },
    /* /Edit task name block */



    deleteTask(task){
      // Statistics update
      if(!task.get('completed')){
        this.set('model.activeTasks', this.get('model.activeTasks') - 1);
      }

      task.destroyRecord();
      this.get('model').save();
    }
  }

});
