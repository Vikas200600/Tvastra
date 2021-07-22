let appConfig = {
    port : 8080,
    allowedCorsOrigin : "*",
    env : "dev",
    db : {
        uri: 'mongodb://localhost:27017/tvastraDB'
    },
    apiVersion : '/api/v1'
};

module.exports = {
    port: appConfig.port,
    env: appConfig.env,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion,
}