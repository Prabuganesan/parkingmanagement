# parkingmanagement

Install below softwares
Nodejs - 10.16.3 (https://nodejs.org/download/release/v10.16.3/)
Angular - 7.3.5 (npm i -g @angular/cli@7.3.5)
Ionic - 4.12.0 (npm i - g ionic@4.12.0)


After install node module change below things
Open node_modules/relational-pouch/lib
Add default in pouch-utils.js (var Promise = require('pouchdb-promise').default;)

