INSTALL_PATH="$PWD"
echo "App path is :" $INSTALL_PATH
echo " "
echo "npm install started"
npm install -f
echo "["$(date +%d-%m-%Y) $(date +"%T")"] :::: "  "npm install completed."
echo "["$(date +%d-%m-%Y) $(date +"%T")"] :::: "  "Updating pouch-utils.js file"
cd $INSTALL_PATH/node_modules/relational-pouch/lib
mv pouch-utils.js pouch-utils.js_bkp
sed  "3s+promise')+promise').default+g" pouch-utils.js_bkp > pouch-utils.js  
echo "["$(date +%d-%m-%Y) $(date +"%T")"] :::: "  "Updated pouch-utils.js file"
echo " "
echo "Ready to build"
echo "<<<<<<<<<<Build started>>>>>>>>>>"
ng build --prod
echo "Enter into server folder"
cd $INSTALL_PATH/server
echo "npm install started for server"
npm install -f
echo "Server ready to up"
node server
echo "Server running in port number 1000"




