import Ember from 'ember';

export default Ember.Service.extend({

  i18n: Ember.inject.service(),

  websocketsService: Ember.inject.service('websockets'),
  socketReference: null,
  wsURL: 'ws://localhost:7000/',

  init() {
    this._super(...arguments);

    this.connect();
  },

  connect() {
    const socket = this.get('websocketsService').socketFor(this.get('wsURL'));

    socket.on('open', this.socketOpened, this);
    socket.on('close', this.socketClosed, this);

    this.set('socketReference', socket);
  },

  destroy() {
    const socket = this.get('websocketsService');

    socket.off('open', this.socketOpened);
    socket.off('close', this.socketClosed, this);
  },

  send() {
    if (this.get('socketReference')) {
      this.get('socketReference').send(...arguments);
    }else{
      console.log( this.get('i18n').t('websockets.connection.closed') );
    }
  },

  socketOpened(event) {
    console.log( this.get('i18n').t('websockets.connection.opened'), event );
  },

  socketClosed(event) {
    console.log( this.get('i18n').t('websockets.connection.closed'), event );

    // Try to reopen the ocket connection after 30 sec
    const socket = this.get('websocketsService').socketFor(this.get('wsURL'));

    Ember.run.later(this, () => {
      console.clear();
      console.log(this.get('i18n').t('websockets.connection.reconnectOnClose'), event);
      socket.reconnect();
    }, 30000);

  }

});
