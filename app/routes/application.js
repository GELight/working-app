import Ember from 'ember';

export default Ember.Route.extend({

  i18n: Ember.inject.service(),

  model: () => {
    return {

      "servers": [
        {
          "title": "Trunk"
        },
        {
          "title": "7.9"
        }
      ]

    };
  },

  actions: {

    selectServer: function(server) {
      this
        .controllerFor('application')
        .set('lastAction', this.get('i18n').t('application.lastactions.selectedserver', { title: server.title }));
    }

  }

});
