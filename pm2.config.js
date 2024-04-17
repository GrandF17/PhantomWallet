module.exports = {
  apps: [
    {
      name: "AiDEX",
      script: "yarn",
      args: "start",
      watch: true,
      autorestart: true,
      restart_delay: 10000,
    },
  ],
};
