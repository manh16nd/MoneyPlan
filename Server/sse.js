"use strict";
// ... with this middleware:
function sseMiddleware(req, res, next) {
    res.sseConnection = new Connection(res);
    next();
}
exports.sseMiddleware = sseMiddleware;
/**
 * A Connection is a simple SSE manager for 1 client.
 */
var Connection = (function () {
    function Connection(res) {
        this.res = res;
    }
    Connection.prototype.setup = function () {
        this.res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
    };
    Connection.prototype.send = function (data, error) {
        // if(error) {
        //     this.res.writeHead(200, {
        //         'Content-Type': 'text/event-stream',
        //         'Cache-Control': 'no-cache',
        //         'Connection': 'keep-alive'
        //     }).write('error');
        // }
        this.res.write("data: " + JSON.stringify(data) + "\n\n");
    };
    return Connection;
}());

exports.Connection = Connection;
/**
 * A Topic handles a bundle of connections with cleanup after lost connection.
 */
var Topic = (function () {
    function Topic() {
        this.connections = [];
    }
    Topic.prototype.add = function (conn) {
        var connections = this.connections;
        connections.push(conn);
        conn.client.res.on('close', function () {
            var i = connections.indexOf(conn);
            if (i >= 0) {
                connections.splice(i, 1);
            }
        });
    };
    Topic.prototype.forEach = function (cb) {
        this.connections.forEach(cb);
    };
    return Topic;
}());
exports.Topic = Topic;
