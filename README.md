<h1 align="center">
React Redux Router Starter App and API Server
</h1>
<div align="center">
  <img src="https://raw.githubusercontent.com/konpa/devicon/master/icons/react/react-original.svg?sanitize=true" alt="React" width=100 /> <img src="https://raw.githubusercontent.com/reactjs/redux/master/logo/logo.svg?sanitize=true" alt="Redux" width=100 /> <img src="https://camo.githubusercontent.com/f63754b8412368e820601967af6dea84312b925b/68747470733a2f2f7265616374747261696e696e672e636f6d2f72656163742d726f757465722f616e64726f69642d6368726f6d652d313434783134342e706e67" alt="React Redux" width=100 /> <img src="https://getbootstrap.com/assets/img/bootstrap-stack.png" alt="Bootstrap" width=100 />
</div>

## Overview
This is a simple starter kit that adds Redux and React Router v4 to a [Create React App](https://github.com/facebookincubator/create-react-app) project. It is opinionated in the way the components and containers are structured, as well as how reducers and actions are organized as well e.g: putting all container reducers, actions and action types within their container directory instead of putting all reducers, actions and action types in three different directories.

Uses the latest Create React App and other package versions.

Client and Server are separate but I included the server files for reference. If only the client side files are required, simply delete the "server" directory.

Code is linted using a mix of rules from the [Standard](https://github.com/standard/standard) and [Airbnb](https://github.com/airbnb/javascript) JavaScript style guides.

# Client
It currently implements an e-commerce shopping cart, where a user can add or remove items (books) from the store. A client can add them to his/her cart and perform a "checkout".

- Global state management handled by Redux. Consuming and updating a backend API, and passing both props and actions down from containers to components. 
> Use the Redux browser extension to use time-travel to track all state change, and to dispatch actions.
- Routing and route state management handled by React-Router and React-Router-Redux
- Uses the reselect library to perform certain state-based functions such as populating the number of items in a customers cart.
- Uses Twitter Bootstrap as as base CSS for components.

### Stack:
- Babel/ES2017
- React
- Redux
- React Router v4
- Axios for API calls

### Setup
- Open the directory in a terminal and perform "npm install" to install all dependencies.
- Run "npm start" to run the server in development mode.
- The client will be running on http://localhost:3001 if server is running on 3000

### Todo
- Add more propType validations (currently missing)


# Server
Simple versioned ES6 Node.js, Express.js and MongoDB API starter kit.

<div align="center">
  <img src="https://camo.githubusercontent.com/9c24355bb3afbff914503b663ade7beb341079fa/68747470733a2f2f6e6f64656a732e6f72672f7374617469632f696d616765732f6c6f676f2d6c696768742e737667" alt="Node" width=100 /> <img src="https://camo.githubusercontent.com/647e291a5fd52d50e01deb82f9392c462df148a6/687474703a2f2f617070732e6f63746f636f6e73756c74696e672e636f6d2f696d616765732f6578707265737349636f6e2e706e67" alt="Express" width=100 /> <img src="https://camo.githubusercontent.com/06b379dd111735f904a752c417ec6946d38813a0/68747470733a2f2f6c6976652e7a6f6f6d646174612e636f6d2f7a6f6f6d646174612f736572766963652f636f6e6e656374696f6e2f74797065732f69636f6e2f4d4f4e474f5f4d4f4e474f3f763d2425374274696d657374616d70253744" alt="MongoDB" width=100 />
</div>

### Stack
- Babel/ES2017
- Express.js
- Node.js
- MongoDB/Mongoose

### Setup:
- Open the directory in a terminal and perform "npm install" to install all dependencies.
- Run "npm run dev" to run the server in development mode.
- Run "npm run build" to compile a build of the server
- The server will be running on http://localhost:3000
> Make sure to change the JWT secret key in the .env file.

### Todo:
- Implement Universal or Server Side Rendering (SSR) solution that serves the final build of the client side to clients with JavaScript disabled. Although not a high priority, it offers some accessibility and search engine optimization benefits.

> Currently contains unused packages that were used in the developement of a Universal/SSR solution. Should be cleaned up easily if that feature is not required.

