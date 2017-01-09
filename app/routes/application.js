import Ember from 'ember';

export default Ember.Route.extend({

  i18n: Ember.inject.service(),

  model: () => {
    return {

      "servers": [
        {
          "id": "trunk"
        },
        {
          "id": "7.9"
        }
      ]

    };
  },

  actions: {

    lastAction: function(action) {
      this
        .controllerFor('application')
        .set('lastAction', action);
    },

    selectServer: function(server) {
      this.send('lastAction',
        this.get('i18n').t('application.lastactions.selectedserver', { title: server.id })
      );

      this.transitionTo('servers', server);
    }

  }

});
