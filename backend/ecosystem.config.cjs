module.exports = {
<<<<<<< HEAD
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
      PORT: 8000               // Your actual port
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss'
  }]
}
=======
    apps: [
        {
            name: "ayan-backend",
            script: "dist/index.js",  // Make sure you use compiled JS in dist folder
            cwd: "backend",  // Set the correct working directory
            env: {
                NODE_ENV: "production"
            },
            exec_mode: "cluster",  // Optional: run multiple instances for better performance
            instances: "max",      // Automatically match to the number of available CPUs
            max_memory_restart: "1G"  // Restart if memory usage exceeds 1GB (adjust as needed)
        }
    ]
};
>>>>>>> 9fc4b83 (test)
