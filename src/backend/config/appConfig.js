let appConfig = {
    port : 8080,
    allowedCorsOrigin : "*",
    env : "dev",
    db : {
        uri: 'mongodb+srv://tvastraConn:admin-Tvastra@tvastracluster.lj8do.mongodb.net/tvastraDB?retryWrites=true&w=majority'
    },
    apiVersion : '/api/v1'
};

module.exports = {
    port: appConfig.port,
    env: appConfig.env,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion,
}