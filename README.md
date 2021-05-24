<h1> Cash Web </h1>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Note: This project is under-development. Stuff can break.

<h3>Motivation</h3>

Bitcoin Cash is an ideal blockchain with incredible throughput capacity, ability to scale, low transaction fees, 0-confirmation and soon an EVM compatible side chain and much more. It’s a gem waiting to be discovered by the many.

There is a huge demand for Software Engineers and Developers who work on the Bitcoin Cash Ecosystem. Cash Kit helps to solve this problem. This open source project aims to be the goto place for any new developer(s) interested in working on Bitcoin Cash blockchain by making the onboarding of new teams and developers very easy. This kit provides extensive documentation and codebase, so developers can focus on their business logic and ship a production grade application within a couple of days instead of weeks or months.

<h3> Development </h3>

- Runing Envoy + React + Tests in a single terminal
  - `cd cashweb/`
  - `docker-compose build`
  - `docker-compose up`

- Running separatly [3 terminals]
  - React app:
    - `npm install`
    - `npm start`
    or
    - `docker build -f Dockerfile.dev -t webclient .`
    - `docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app webclient`
  - Tests: `npm run test`
  - Envoy:
    - `cd envoy/`
    - `docker build -t envoy .`
    - `docker run -p 8080:8080 envoy`


- Go to the browser at [localhost:3000](http://localhost:3000)


<h5> Commands (Others) </h5>

- Recreate proto files: `./src/protos/genproto.sh`


<h3> Features </h3>

- React Frontend
  - Hooks
  - Lazy loading: Code splitting
  - Error boundaries: Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.
  - Hot Reload
  - Memized components.
- Typescript
- Docker
  - Hot reload via shared volumes in development mode.
- Envoy
  - Envoy translates the HTTP/ 1.1 calls produced by the client into HTTP/ 2 calls that can be handled by the services.
  - Server and Reverse Proxy.
- gPRC, Web gRPC
- Redux
  - Actions
  - Reducers
  - Saga
  - Store
- Scripts

<h3> Architecture </h3>

- Components: They are dumb, they only display the data provided. It may contain some conditional operators. 
- Containers: They are smart components the are aware of the props. (Props could be directly from the parent or from the store.) These smart components can make calls to business logic code or update the app state.
- Views: These components contain containers and are also aware of the app state.
- Redux: Consists of Actions, Reducers, Sagas and other business logic.
- Utils: Consists of helper functions.
- Protos: Used to connect to gRPC Server and act as a connection client.
- Docker/Docker Compose: Containerises the application.
- Envoy: Server and reverse Proxy. Also responsible for translation from HTTP/1 to HTTP/2 and communication with the gRPC server.
- Scripts: Contains scripts to automate certain aspects of the application.
  - `reactdev.sh`
  - `genproto.sh`
- Testing: Snapshot testing of Components.

<h3> Why Envoy? </h3>

After doing a lot of research and figuring out many ways to interact with gRPC server through web client. I ended up following this approach:

- With Envoy (Current approach). [grpc/grpc-web](https://github.com/grpc/grpc-web/tree/master/net/grpc/gateway/examples/helloworld#configure-the-proxy)

<h3> Testing </h3>

- Snapshot Testing

