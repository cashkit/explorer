<h1> Cashweb </h1>


---


What and Why?

Bitcoin Cash is an ideal blockchain with incredible throughput capacity, ability to scale, low transaction fees, 0-confirmation and soon an EVM compatible side chain and much more. It’s a gem waiting to be discovered by the many.

There is a huge demand for Software Engineers and Developers who work on the Bitcoin Cash Ecosystem. Cash Kit helps to solve this problem. This open source project aims to be the goto place for any new developer(s) interested in working on Bitcoin Cash blockchain by making the onboarding of new teams and developers very easy. This kit provides extensive documentation and codebase, so developers can focus on their business logic and ship a production grade application within a couple of days instead of weeks or months.

Cashweb is a web Interface: https://github.com/cashkit/cashweb

Cashweb is one of many respositries from Cashkit.



---




[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)


This project is under development. Stuff can break.

<h3>Motivation</h3>

Bitcoin Cash is an ideal blockchain with incredible throughput capacity, ability to scale, low transaction fees, 0-confirmation and soon an EVM compatible side chain and much more. It’s a gem waiting to be discovered by the many.

There is a huge demand for Software Engineers and Developers who work on the Bitcoin Cash Ecosystem. Cash Kit helps to solve this problem. This open source project aims to be the goto place for any new developer(s) interested in working on Bitcoin Cash blockchain by making the onboarding of new teams and developers very easy. This kit provides extensive documentation and codebase, so developers can focus on their business logic and ship a production grade application within a couple of days instead of weeks or months.

Cashweb is one of many respositries from Cashkit.

---

<h3> Live Transactions </h3>

<img src="https://user-images.githubusercontent.com/7335120/119323147-08978580-bc9c-11eb-86d1-6de09d4643d3.gif" width=650/>

<h3> Blocks </h3>

<img src="https://user-images.githubusercontent.com/7335120/119323781-b440d580-bc9c-11eb-8590-f2ad3c6406ea.gif" width=650/>


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

<h3> What do you get? </h3>

- React
- gPRC, Web gRPC
- Typescript
- Hooks
- Lazy loading, Code splitting
- Error boundaries
- Hot Reload
- Components.
  - Memoized Components. (Prevents unnecessary rerendering)
  - Components: They are dumb, they only display the data provided. It may contain some conditional operators and are easy to memoize.
  - Containers: They are smart components the are aware of the props. (Props could be directly from the parent or from the store.) These smart components can make calls to business logic code or update the app state.
- Views: These components contain containers and are also aware of the app state.
- Redux: Consists of Actions, Reducers, Sagas and other business logic.
- Utils: Consists of helper functions.
- Protos: Used to connect to gRPC Server and act as a connection client.
- Managers:
  - gRPC Manager. inspired from [grpc-bchrpc-browser](https://github.com/2qx/grpc-bchrpc-browser)
- Docker/Docker Compose: Containerises the application.
  - Hot reload via shared volumes in development mode.
- Envoy: Envoy translates the HTTP/ 1.1 calls produced by the client into HTTP/ 2 calls that can be handled by the services.
- Node interaction: Live Transactions, Fetch Transaction details, Fetch Block details
- Scripts: 
  - `genproto.sh`
- Testing: Snapshot testing of Components.

<h3> Why Envoy? </h3>

After doing a lot of research and figuring out many ways to interact with gRPC server through web client. I ended up following this approach:

- With Envoy (Current approach). [grpc/grpc-web](https://github.com/grpc/grpc-web/tree/master/net/grpc/gateway/examples/helloworld#grpc-web-hello-world-guide)

<h3> Testing </h3>

- Snapshot Testing

<h3> What else? </h3>

:information_source: Eventually this project will have: 
- Ability to interact with a local bchd node(private). :white_check_mark: 
- Ability to subscribe to custom events via cashserver(private). :white_check_mark:
- Docker and Docker-Compose :white_check_mark:
- Protos for interactions with cashserver.
- Fetch SLP token data and more interactions.
- Block Subscription.
- Create a wallet and submit transactions.
- Fetch address information.
- Play a game via scanning a QR code [Separate module].
- Kubernetes configs + docs.
- Travis/circle CI configs + docs.
- more...

:speaker: Private repositories will be made public in coming week(s).

<h3> Donations </h3>

`bitcoincash:qre3vyl5amlua9a80fg9ta3ck806fvqvly9frxe6n4`


![qrcode](https://user-images.githubusercontent.com/7335120/119320178-ec461980-bc98-11eb-9b05-a6f44d408034.png)


<h3> Contribution </h3>

Contributing guildelines are under progress.

<h3> License </h3>

MIT