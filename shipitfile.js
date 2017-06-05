module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-yarn')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/tableausimu',
      dirToCopy: '/tmp/tableausimu/build',
      deployTo: '/home/fouc/tableausimu/client',
      repositoryUrl: 'https://github.com/foucdeg/tableau-simu',
      keepReleases: 2,
      deleteOnRollback: false,
      shallowClone: true,
      yarn: {
        remote: false,
        cmd: 'run build'
      }
    },
    staging: {
      servers: 'fouc@vps'
    }
  });

  shipit.on('yarn_installed', () => {
    shipit.start('yarn:run');
    shipit.emit('built');
  });
};
