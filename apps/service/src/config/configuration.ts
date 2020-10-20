export default () => ({
    port: parseInt(process.env.PORT_SERVICE, 10) || 3000,
  });