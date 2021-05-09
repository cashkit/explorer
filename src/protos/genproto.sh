protoc -I=protos protos/bchrpc.proto --proto_path=./ --js_out=import_style=commonjs,binary:protos \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:protos