module.exports = {
  apps: [{
    name: 'kdjconcepts',
    script: './server.js',
    env: {
      "PORT": 3000,
      "NODE_ENV": "development"
    },
    env_production: {
      "PORT": 3000,
      "NODE_ENV": "production"
    }
  }],
  deploy: {
    production: {
      user: 'ec2-user',
      host: 'ec2-52-37-67-70.us-west-2.compute.amazonaws.com',
      key: '~/.ssh/mykeypair.pem',
      ref: 'origin/master',
      repo: 'git@github.com:kjamison80/kdjconcepts.git',
      path: '/home/ec2-user/kdjconcepts',
      'post-deploy': 'npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
}
