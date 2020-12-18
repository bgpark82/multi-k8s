docker build -t bgpark82/multi-client:latest -t bgpark82/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t bgpark82/multi-server:latest -t bgpark82/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t bgpark82/multi-worker:latest -t bgpark82/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push bgpark82/multi-client:latest
docker push bgpark82/multi-server:latest
docker push bgpark82/multi-worker:latest

docker push bgpark82/multi-client:$SHA
docker push bgpark82/multi-server:$SHA
docker push bgpark82/multi-worker:$SHA

kubectl apply -f k8s

kubectl set image deployments/server-deployment server=bgpark82/multi-server:$SHA
kubectl set image deployments/client-deployment client=bgpark82/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=bgpark82/multi-worker:$SHA