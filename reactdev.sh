docker build -f Dockerfile.dev -t webclient_dev .
docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app webclient_dev