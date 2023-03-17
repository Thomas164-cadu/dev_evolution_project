module.exports = {
    apps : [
        {
          name: "app",
          script: "index.js",
          watch: true,
          env: {
            "NODE_ENV": "development"
          },
          env_production: {
            "NODE_ENV": "production"
          }
       }
    ]
  };