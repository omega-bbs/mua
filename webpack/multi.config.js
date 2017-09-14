/* eslint-disable import/unambiguous */

const client = require("./client.config");
const server = require("./server.config");

module.exports = options => {
  return [
    Object.assign(client(options), { name: "client" }),
    Object.assign(server(options), { name: "server" }),
  ];
};
