var options = {
    key: fs.readFileSync('../secure/private.key','utf8'),
    cert: fs.readFileSync('../secure/certificate.crt','utf8'),
    ca: fs.readFileSync('../secure/ca_bundle.crt','utf8')
};

http.createServer(app).listen(3000);
https.createServer(options, app).listen(3001);
