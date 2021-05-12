<h1> Cashweb </h1>

Note: This project is under-development. Stuff can break.

<h3> Development </h3>
Go to the project's root directory: `cd cashweb/`

- Run envoy: Docker compose to run the envoy proxy:
```
docker-compose build
docker-compose up
```

- Run react app:
```
npm install
npm start
```

- Go to the browser at `localhost:3000`


<h5> Commands (Others) </h5>

- Run React app on docker: `./reactdev.sh`
- Recreate proto files: `./src/protos/genproto.sh`


<h3> Features </h3>

- React Frontend
- Typescript
- Docker
  - Hot reload via shared volumes in development mode.
- Envoy
  - Envoy translates the HTTP/ 1.1 calls produced by the client into HTTP/ 2 calls that can be handled by the services.
  - Server and Reverse Proxy.
- gPRC
- Web gRPC
- Redux: Actions, Reducers, Saga
- History
- Scripts

<h3> Architecture </h3>

- Components: They are dumb, they only display the data provided. It may contain some conditional operators. 

- Containers: They are smart components the are aware of the props. (Props could be directly from the parent or from the store.) These smart components can make calls to business logic code or update the app state.
- Views: These components contain containers and are also aware of the app state.
- Redux: Consists of Actions, Reducers, Sagas and other business logic.
- Utils: Consists of helper functions.
- Protos: Used to connect to gRPC Server.
- Docker/Docker Compose: Containerises the application.
- Envoy: Server and reverse Proxy. Also responsible for translation from HTTP/1 to HTTP/2 and communication with the gRPC server.
- Scripts: Contains scripts to automate certain aspects of the application.
  - `reactdev.sh`
  - `genproto.sh`

<h3> Why Envoy? </h3>

After doing a lot of research and figuring out many ways to interact with gRPC server through web client. I ended up following this approach:

- With Envoy (Current approach). [grpc/grpc-web](https://github.com/grpc/grpc-web/tree/master/net/grpc/gateway/examples/helloworld#configure-the-proxy)
