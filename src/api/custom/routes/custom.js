module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/custom',
     handler: 'custom.GetMessage',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
