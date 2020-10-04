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


## Iteration 4
TBD

## Iteration 5
TBD