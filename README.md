# parkingmanagement

**Install below softwares**

Nodejs - 10.16.3 (https://nodejs.org/download/release/v10.16.3/)

Angular - 7.3.5 (npm i -g @angular/cli@7.3.5)

Ionic - 4.12.0 (npm i - g ionic@4.12.0)

==================================================================

**Clone repo**

1.Clone this repo in local folder.

2.Next naviagte to parkingmanagement folder (cd parkingmanagement)

**Steps to run project manually(One time setup)**

1.npm i

2.After install node module change below things

Open node_modules/relational-pouch/lib

Add default in pouch-utils.js (var Promise = require('pouchdb-promise').default;)

3.ng build --prod

4.cd server

5.npm i

6.node server

7.Open http://localhost:1000 in browser

**Steps to run project automaticaly**

run initialsetup.sh

==================================================================

**For backup and restore**
**Backup**
Enter below url
http://localhost:1000/backup

Backup file will generated in server folder as output.txt

**Restore**
Befor open http://localhost:1000, move backup file(output.txt) into server folder. Then enter below url
http://localhost:1000/load

After data restored you can open http://localhost:1000


