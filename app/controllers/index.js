import Ember from 'ember';

export default Ember.Controller.extend({

  name: '',
  isValidCreate: Ember.computed.notEmpty('name'),

  id: '',
  isValidId: Ember.computed.match('id', /^[0-9a-zA-Z-_]+$/),

  actions: {
    findTodoit() {
      const id = this.get('id');
      if (this.store.hasRecordForId('todoit', id)) {
        this.transitionToRoute('todoit', id);
      } else {
        this.set('message', true);
      }
    },
    saveTodoit() {
      const name = this.get('name');
      const newTodoit = this.store.createRecord('todoit', {
        name: name
      });
      newTodoit.save().then((response) => {
        this.transitionToRoute('todoit', response.get('id'));
      });
    },

  }

});
