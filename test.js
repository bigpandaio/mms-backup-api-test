#!/usr/local/bin/node
var request = require('request');
var util = require('util')

var groupId = "" // TODO: fill in
var clusterId = "" // TODO: fill in
var username = "" // TODO: fill in
var apiToken = "" //TODO: fill in

var organizations = ["bigpanda"]

var excludedNamespaces = organizations.map(function(org) { return "bigpanda-data-api." + org + "_events"});
console.log("Excluded Namespaces: " + excludedNamespaces);


var payload = { excludedNamespaces: excludedNamespaces}
console.log("Payload: " + util.inspect(payload));

request.patch('https://mms.mongodb.com/api/public/v1.0/groups/' + groupId + '/backupConfigs/' + clusterId, {json: payload }, handleResponse)
    .auth(username, apiToken, false);


function handleResponse(error, response, body) {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  if (response.statusCode >= 300) {
    console.error("HTTP Code: " + response.statusCode);
    console.error("Body: " + util.inspect(body));
    process.exit(1)
  }

  if (response.statusCode >= 200 && response.statusCode < 300) {
    console.log("HTTP Code: " + response.statusCode);
    console.log("Body:\n" + util.inspect(body));
    process.exit(0);
  }
}

