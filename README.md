# grafana-alerta

https://grafana.com/

https://alerta.io/

Alerta UI repo
https://github.com/alerta/alerta-webui


## Scope
We will use alerta for displaying dev ops alerts form our IoT Devices.

The idea is that the user could have a way to veiw alerts based on a date range and or other filters as per the alerta API.
This would all be done through a table view the same as what alerta has https://github.com/alerta/alerta-webui

## Grafana alerta Table Plugin

The alerta Table Plugin would be a widget that could be added in the grafana dashboard.
The user could then do actions like

- Delete/Update/Watch/Ach/Shelve
- edit notes
- assign (Not sure if we will use the grafana user API to get the users)


## Grafana alerta Data source
We may need to a grafana data source.

This would be for adding the alerta 
`url`
`port`
`username/password`


### So research on grafana HTTP/REST API/Data soruce

https://github.com/grafana/strava-datasource
https://community.grafana.com/t/how-to-import-rest-api-data/5772



# Grafana Panel Plugin Template

<!-- 
[![CircleCI](https://circleci.com/gh/grafana/simple-react-panel.svg?style=svg)](https://circleci.com/gh/grafana/simple-react-panel)
[![David Dependency Status](https://david-dm.org/grafana/simple-react-panel.svg)](https://david-dm.org/grafana/simple-react-panel)
[![David Dev Dependency Status](https://david-dm.org/grafana/simple-react-panel/dev-status.svg)](https://david-dm.org/grafana/simple-react-panel/?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/grafana/simple-react-panel/badge.svg)](https://snyk.io/test/github/grafana/simple-react-panel)
[![Maintainability](https://api.codeclimate.com/v1/badges/1dee2585eb412f913cbb/maintainability)](https://codeclimate.com/github/grafana/simple-react-panel/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1dee2585eb412f913cbb/test_coverage)](https://codeclimate.com/github/grafana/simple-react-panel/test_coverage) -->

This template is a starting point for building Grafana Panel Plugins in Grafana 7.0+


## What is Grafana Panel Plugin?
Panels are the building blocks of Grafana. They allow you to visualize data in different ways. While Grafana has several types of panels already built-in, you can also build your own panel, to add support for other visualizations.

For more information about panels, refer to the documentation on [Panels](https://grafana.com/docs/grafana/latest/features/panels/panels/)

## Getting started
1. Install dependencies
```BASH
yarn install
```
2. Build plugin in development mode or run in watch mode
```BASH
yarn dev
```
or
```BASH
yarn watch
```
3. Build plugin in production mode
```BASH
yarn build
```

## Node.js Server test
1. Run server
```BASH
node test-server.js
```
