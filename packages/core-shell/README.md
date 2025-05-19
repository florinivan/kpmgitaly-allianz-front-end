Development Configuration
Skip Login in Development Mode
This application supports a development mode feature that allows you to bypass the login screen during development.
How to Use

In development mode, the application can automatically log you in with mock credentials.
This feature is controlled by the REACT_APP_SKIP_LOGIN environment variable:

Set to "true" to enable auto-login (default in development)
Set to "false" to disable auto-login and require manual login



Configuration
You can configure this behavior in several ways:

In .env.development file:
REACT_APP_SKIP_LOGIN=true

When starting the development server:
bash# Enable auto-login
REACT_APP_SKIP_LOGIN=true npm start

# Disable auto-login
REACT_APP_SKIP_LOGIN=false npm start

In webpack.config.js:
The default value is set to 'true' in the webpack configuration.

Mock User Details
When auto-login is enabled in development mode, you'll be logged in with the following mock user:

Username: developer
Email: dev@example.com
Roles: admin, user
Name: Dev User

These details can be modified in src/config/index.ts if needed.
Security Notice
This feature is strictly for development purposes only. It will be automatically disabled in production environments regardless of environment variable settings.