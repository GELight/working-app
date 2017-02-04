import Ember from 'ember';
// import config from '../../config/environment';

export default Ember.Component.extend({

  i18n: Ember.inject.service(),
  socketService: Ember.inject.service('working-app-websockets'),

  didInsertElement() {
    this._super(...arguments);
    this.get('socketService').connect();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.get('socketService').destroy();
  },

  actions: {

    socketeventtestmessage() {
      this.get('socketService')
          .send('action socketeventmessage');
    },

    triggerMyEvent() {
      this.get('socketService')
          .getSocket()
          .send({test: 'muh', muh: 'Kuh'});
    }

  }

});
