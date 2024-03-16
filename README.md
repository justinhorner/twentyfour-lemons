# twentyfour-lemons

A site to show [24 Hours of Lemons](https://24hoursoflemons.com) events in both a list and map view.

## Background

I've been wanting to work with [ArcGIS SDK](https://developers.arcgis.com) for some time and have also wanted to try out [VueJS](https://vuejs.org).  This project seemed like a good opportunity to work with both.  It's a bit rough around the edges, especially in terms of front-end design, but it should all function after being checked out (and provided you have an ArcGIS API key) and I hope to add some polish in the future.

The events data was sourced via [another project](https://github.com/justinhorner/twentyfour-lemons-data-fetch).

## Setup

### Customize configuration

Set the `VITE_ARCGIS_API_KEY` value in the .env file to ensure the ArcGIS component works properly.

### Project Setup

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Compile and Minify for Production

```sh
npm run build
```


## Docker

### Build
```sh
docker build -t {{tagName}} .
```

### Run 
```sh
docker run -d -p 8080:8080 {{tagName}}
```
