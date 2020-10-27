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


## Getting started
1. Go to folder `grafana-altera`
    ```BASH
    cd grafana-altera
    ```
    1.1. Install dependencies
    ```BASH
    yarn install
    ```
    1.2. Build plugin in development mode or run in watch mode
    ```BASH
    yarn dev
    ```
    or
    ```BASH
    yarn watch
    ```
    1.3. Build plugin in production mode
    ```BASH
    yarn build
    ```

2. Go to folder `grafana-altera-datasource`
    ```BASH
    cd grafana-altera-datasource
    ```
    2.1. Install dependencies
    ```BASH
    yarn install
    ```
    2.2. Build plugin in development mode or run in watch mode
    ```BASH
    yarn dev
    ```
    or
    ```BASH
    yarn watch
    ```
    2.3. Build plugin in production mode
    ```BASH
    yarn build
    ```
