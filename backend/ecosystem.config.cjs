module.exports = {
  apps: [{
    name: 'ayan-backend',
    script: './dist/index.js',
    instances: 1,              // ← Change this to 1
    exec_mode: 'fork',         // ← Change to 'fork' for single instance
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000               // Your actual port
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss'
  }]
}