# MVP concept
| Name      | Description |
| ----------- | ----------- |
| Purpose      | This document describes the development plan for the Grafana Table plugin project.        |
| @author   | namneo        |



Since this is more of a new product build with an initial rough concept rather than a full specs todo list, I think it makes sense to apply MVP build process. That is to ensure successfully build and deliver with great feedback loops from Aidan and adapt for changes. 
The delivery is strictly follow Scope and spec describe in the [README.md](./README.md) of this project.

# Iterations
I'll solve one problem at a time, by using build iteration. So at each build I can tackle and finish parts of a usable product, the delivery after each iteration should be a useable plugin without or with minimal bugs, and with that I'll try to get feedback from Aidan and improve from.

## Iteration 1
Build a simple Grafana table that read and display data from Alerta API
This table can leverage any table component example from typescript component, datatable, bootstrap table.
The end goal for this Iteration is to make sure: 
- JSON data from Alerta can be read into Grafana plugin
- JSON data can be parse and rendered in table format
- The table should look like [Grafana webUI](https://github.com/alerta/alerta-webui)
- Answer the question: If a datasource plugin is needed, or user can input the configuration in the same plugin

To save time and effort, everything which is not related to the above questions should be hard-coded or leave for later Iteration.

## Iteration 2
Plugin configuration is introduced where user should be able to: 
- Enter Alerta URL to the datasource 
- Enter username and password for authentication 

Filters are introduced as well which include the supported filter from Alerta (need to do research)
- Date range filter
- Severity filter
- Type filter
- ...

After this Iteration we should be able to answer if: How data should be cached and stored? Can we read data on-the-fly via the API all the time or should we cache already query data on the plugin / plugin-datasource for performance.

## Iteration 3
In Iteration 3 we'll introduce user actions, these are extra action beside filters to allow user to interact with logs and alerts. 
- Delete/ Update / Watch / Archive / Shelve (Sort / Order ?)
- And and edit Notes
- Assign (query list of users in Grafana and assign issues/tasks)

### Assign users feature
API key: for development purpose, an api key is created for the plugin: `eyJrIjoiZUcwbDh0RzduZldnUTF0UWJYNFV4UUU4cjNDYkNQMTEiLCJuIjoiYWxlcnRhIiwiaWQiOjF9`

Users from Grafana can be obtained using the following api
```bash
curl -H "Authorization: Bearer eyJrIjoiZUcwbDh0RzduZldnUTF0UWJYNFV4UUU4cjNDYkNQMTEiLCJuIjoiYWxlcnRhIiwiaWQiOjF9" http://188.166.245.250:3000/api/org/users

Output: 

[
   {
      "avatarUrl" : "/avatar/46d229b033af06a191ff2267bca9ae56",
      "email" : "admin@localhost",
      "lastSeenAt" : "2020-10-26T23:25:28Z",
      "lastSeenAtAge" : "2m",
      "login" : "admin",
      "name" : "",
      "orgId" : 1,
      "role" : "Admin",
      "userId" : 1
   },
   {
      "avatarUrl" : "/avatar/7c8542f06428b4c018c4ed5883428779",
      "email" : "peter@localhost.com",
      "lastSeenAt" : "2020-10-26T23:13:06Z",
      "lastSeenAtAge" : "15m",
      "login" : "peter",
      "name" : "Peter Pan",
      "orgId" : 1,
      "role" : "Editor",
      "userId" : 2
   },
   {
      "avatarUrl" : "/avatar/da5d9f50e650a9d5c1727fd67de72d86",
      "email" : "robin@localhost.com",
      "lastSeenAt" : "2020-10-26T23:14:16Z",
      "lastSeenAtAge" : "13m",
      "login" : "robin",
      "name" : "Robin Hood",
      "orgId" : 1,
      "role" : "Editor",
      "userId" : 3
   }
]
```
with this data, `userId` can be used as the unique identifier, and `login` can be used as the friendly identifier, following are some use-cases:

- As a plugin user, when click on assign button, then user can choose from a <Select> another user to assign the alert to.
- As a plugin user, when I click on the filter, then I can select to filter which alerts have been assigned to me
- As a plugin user, when there is notification feature from Grafana, then I should be able to received notified message when an alert has been assigned to me.


## Iteration 4
TBD

## Iteration 5
TBD