import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  allTasks: DS.attr('number', { defaultValue: 0 }),
  activeTasks: DS.attr('number', { defaultValue: 0 }),
  completedTasks: DS.attr('number', { defaultValue: 0 }),
  tasks: DS.hasMany('task')
});
