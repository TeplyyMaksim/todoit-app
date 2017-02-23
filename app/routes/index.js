import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.findAll('todoit');
  },
  actions: {

    willTransition () {
      this.controller.set('message', false);
      this.controller.set('id');
      this.controller.set('name');
    }

  }
});
