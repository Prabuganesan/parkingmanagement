echo "Stop server"
killall node
echo "Server ready to up"
node server
echo "Running at Port 1000. Now you can open http://localhost:1000/"
sleep 1000
start http://localhost:1000



