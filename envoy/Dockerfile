
FROM envoyproxy/envoy:v1.18-latest

COPY envoy.yaml /etc/envoy/envoy.yaml
RUN chmod go+r /etc/envoy/envoy.yaml
CMD ["envoy", "-c", "/etc/envoy/envoy.yaml"]