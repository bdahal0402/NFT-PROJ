# An incomplete NFT web project.


# Current end state:
https://kc-nft.herokuapp.com/

## Design Points

A combo of two npm projects, the backend server and the frontend UI. So there are two `package.json` configs and thereforce [two places to run `npm` commands](#user-content-local-development):

  1. [**Node server**](server/): [`./package.json`](package.json)
      * [deployed automatically](https://devcenter.heroku.com/categories/deployment) via heroku/nodejs buildpack
  2. [**React UI**](react-ui/): [`react-ui/package.json`](react-ui/package.json)
      * generated by [create-react-app](https://github.com/facebookincubator/create-react-app)
      * deployed via `build` script in the Node server's [`./package.json`](package.json)
      * module cache configured by `cacheDirectories`

Includes a minimal [Node Cluster](https://nodejs.org/docs/latest-v8.x/api/cluster.html) [implementation](server/index.js) to parallelize the single-threaded Node process across the available CPU cores.


## Deploy to Heroku

```bash
git clone https://github.com/bdahal0402/NFT-PROJ.git
cd NFT-PROJ/
heroku create
git push heroku master
```

This deployment will automatically:

  * detect [Node buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs)
  * build the app with
    * `npm install` for the Node server
    * `npm run build` for create-react-app
  * launch the web process with `npm start`
    * serves `../react-ui/build/` as static files
    * customize by adding API, proxy, or route handlers/redirectors

👓 More about [deploying to Heroku](https://devcenter.heroku.com/categories/deployment).

## Local Development

Because this app is made of two npm projects, there are two places to run `npm` commands:

1. **Node API server** at the root `./`
1. **React UI** in `react-ui/` directory.

### Run the API server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```

#### Install new npm packages for Node

```bash
npm install package-name --save
```


### Run the React UI

The React app is configured to proxy backend requests to the local Node server. (See [`"proxy"` config](react-ui/package.json))

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd react-ui/

# Initial setup
npm install

# Start the server
npm start
```

#### Install new npm packages for React UI

```bash
# Always change directory, first
cd react-ui/

npm install package-name --save
```
