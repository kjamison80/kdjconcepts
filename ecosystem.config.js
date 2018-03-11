module.exports = {
  apps: [{
    name: 'kdjconcepts',
    script: ‘node ./dist/server'
  }],
  deploy: {
    production: {
      user: 'ec2-user',
      host: 'ec2-52-37-67-70.us-west-2.compute.amazonaws.com',
      key: '~/.ssh/mykeypair.pem',
      ref: 'origin/master',
      repo: 'git@github.com:kjamison80/kdjconcepts.git',
      path: '/home/ec2-user/kdjconcepts',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
