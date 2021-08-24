echo "Stop server"
killall node
echo "Server ready to up"
node server
echo "Server running in port number 1000"
sleep 1000
start http://localhost:1000



