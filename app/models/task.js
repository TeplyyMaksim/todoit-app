import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  completed: DS.attr('boolean', { defaultValue: false }),
  todoit: DS.belongsTo('todoit'),

  isNotValid: Ember.computed.empty('name')
});
