import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Component.extend({

  i18n: Ember.inject.service(),
  workingAppWebsocket: Ember.inject.service('working-app-websockets'),
  
  didInsertElement() {
    this._super(...arguments);
    this.get('workingAppWebsocket').connect();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.get('workingAppWebsocket').destroy();
  },

  actions: {

    socketeventtestmessage() {
      this.get('workingAppWebsocket')
          .send('action socketeventmessage');
    }

  }

});
