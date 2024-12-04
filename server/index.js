const express = require('express');
const { ParseServer } = require('parse-server');
const path = require('path');

const app = express();

const SERVER_PORT = process.env.PORT || 1337;
const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/parse';
const APP_ID = process.env.APP_ID || 'myAppId';
const MASTER_KEY = process.env.MASTER_KEY || 'myMasterKey';
const JAVASCRIPT_KEY = process.env.JAVASCRIPT_KEY || 'myJavascriptKey';

const parseServer = new ParseServer({
  databaseURI: DATABASE_URI,
  cloud: path.join(__dirname, './cloud/main.js'),
  appId: APP_ID,
  masterKey: MASTER_KEY,
  javascriptKey: JAVASCRIPT_KEY,
  serverURL: `http://localhost:${SERVER_PORT}/parse`,
  publicServerURL: `http://localhost:${SERVER_PORT}/parse`,
  
  // تنظیمات امنیتی
  enforcePrivacy: true,
  
  // فعال‌سازی احراز هویت پیش‌فرض
  enableDefaultAuthentication: true,
  
  // تنظیمات اضافی
  maxUploadSize: '20mb',
  
  // لاگ و مانیتورینگ
  verbose: true
});

// میدلویر Parse Server
app.use('/parse', parseServer.app);

// راه‌اندازی سرور
app.listen(SERVER_PORT, () => {
  console.log(`Parse Server در پورت ${SERVER_PORT} اجرا شد`);
});