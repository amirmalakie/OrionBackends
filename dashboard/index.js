const express = require('express');
const ParseDashboard = require('parse-dashboard');

const dashboard = new ParseDashboard({
  apps: [
    {
      serverURL: 'http://localhost:1337/parse',
      appId: 'myAppId',
      masterKey: 'myMasterKey',
      appName: 'Orion'
    }
  ],
  users: [
    {
      user: 'admin',
      pass: 'admin',
    }
  ],
  
  // تنظیمات دسترسی
  useEncryptedPasswords: false,  
  // تنظیمات ظاهری
  theme: {
    primaryColor: '#168eea',
    secondaryColor: '#15ca20',
    errorColor: '#e74c3c'
  }
}, { 
  allowInsecureHTTP: true 
});

const dashboardApp = express();
dashboardApp.use('/dashboard', dashboard);

const DASHBOARD_PORT = process.env.DASHBOARD_PORT || 4040;
dashboardApp.listen(DASHBOARD_PORT, () => {
  console.log(`Parse Dashboard در پورت ${DASHBOARD_PORT} اجرا شد`);
});
