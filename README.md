## Demo JS Playwright Automation Framework
Tests created using demo ecommerce application: BrowserStack DEMO: https://bstackdemo.com/
### Installation and run
- clone and ensure node.js is installed
- ```npm install```
- add .env file with following values:
```
    USER="demouser"
    USER_LOCKED="locked_user"
    PASS_UNLOCKED="(on bstackdemo site, see signin page, select password field dropdown)" 
```
- run tests: ```npm run tests```

Disable headless mode in ``playwright.config.info`` | ``headless: false`` (default ``true``)