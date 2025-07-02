module.exports = {


  friendlyName: 'View Audio',


  description: 'Display "Audio Recorder" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/audio'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
