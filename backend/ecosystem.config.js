module.exports = {
    apps: [
        {
            name: "ayan-backend",
            script: "dist/index.js",  // Make sure you use compiled JS in dist folder
            cwd: "D:/apps/ayan-ms/backend",  // Set the correct working directory
            env: {
                NODE_ENV: "production"
            },
            exec_mode: "cluster",  // Optional: run multiple instances for better performance
            instances: "max",      // Automatically match to the number of available CPUs
            max_memory_restart: "1G"  // Restart if memory usage exceeds 1GB (adjust as needed)
        }
    ]
};
