let appConfig = {
    port : 8080,
    allowedCorsOrigin : "*",
    env : "dev",
    apiVersion : '/api/v1'
};

appConfig.port = 8080;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.apiVersion = '/api/v1';

module.exports = {
    port: appConfig.port,
    apiVersion: appConfig.apiVersion,
    env: appConfig.env
}