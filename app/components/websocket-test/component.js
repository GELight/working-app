import Ember from 'ember';

export default Ember.Component.extend({

  i18n: Ember.inject.service(),

  websockets: Ember.inject.service(),
  socketRef: null,

  didInsertElement() {
    this._super(...arguments);

    const socket = this.get('websockets').socketFor('ws://localhost:7000/');

    socket.on('open', this.socketOpened, this);
    socket.on('message', this.socketMessage, this);
    socket.on('close', this.socketClosed, this);

    this.set('socketRef', socket);

  },

  willDestroyElement() {
    this._super(...arguments);

    const socket = this.get('socketRef');

    socket.off('open', this.socketOpened);
    socket.off('message', this.socketMessage);
    socket.off('close', this.socketClosed);
  },

  socketOpened(event) {
    console.log(this.get('i18n').t('websockets.connection.opened'), event);
  },

  socketMessage(event) {
    console.log('Message:', event.data);
  },

  socketClosed(event) {
    console.log(this.get('i18n').t('websockets.connection.closed'), event);
  },

  actions: {

    socketeventtestmessage() {
      const socket = this.get('socketRef');
      socket.send('action socketeventmessage');
    }

  }

});
