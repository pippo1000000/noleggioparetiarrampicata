module.exports = {
  apps: [
    {
      name: 'noleggio-pareti-arrampicata',
      script: 'dist/server/entry.mjs',
      env: {
        NODE_ENV: 'production',
        PORT: 3005,
        HOST: '0.0.0.0'
      }
    }
  ]
};
