var AdmZip = require('adm-zip');

// creating archives
var zip = new AdmZip();

zip.addLocalFolder("./META-INF/", "/META-INF/");
zip.addLocalFolder("./dist/servoy/ngdesktopui/", "/dist/");
zip.addLocalFolder("./ngdesktopui/", "/ngdesktopui/");
zip.writeZip("ngdesktopui.zip");