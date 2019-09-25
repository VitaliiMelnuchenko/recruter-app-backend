module.exports = {
  // to call health check run http://18.189.29.136/hc
  // to deploy run: pm2 deploy ecosystem.config.js production

  apps : [{
    name: 'Back-end api',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      CLIEN_ID: '553045202887-evvpquhl0k2s8mvdp9v15mtk5n5jlh9j.apps.googleusercontent.com',
      COMPANY_EMAIL: 'techmagic.screaming.tool@gmail.com',
      EMAIL_PASSWORD: '1123581321Tm',
      JWT_SECRET_KEY: 'KDS32hkswwGU66',
      PORT: 80,
      NODE_ENV: 'production',
      MONGODB_URL: 'mongodb://recruiter:Hsvr74@ds135427.mlab.com:35427/recruter-app' // replace with correct mongo url
    }
  }],

  deploy : {
    production : {
      key: "~/.ssh/trainingCenter6.pem", // deploy from local-machine
      user : 'ubuntu',
      host : '18.189.29.136',
      ref  : 'origin/develop',
      repo : 'http://gitlab+deploy-token-97628:FKmf-4mtVfhf4JW5Y93n@gitlab.com/techmagic/RecruterApp-Backend.git',
      path : '/home/ubuntu/recruitment-back-end',
      ssh_options: "StrictHostKeyChecking=no",
      'post-deploy' : 'npm install && sudo pm2 reload ecosystem.config.js --env production --force'
    }
  }
};
