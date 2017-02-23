import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    // {include: 'tasks'} - DO NOT WORK =(
    return this.store.findRecord('todoit', params.todoit_id);
  },
});
