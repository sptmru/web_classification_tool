#  Web Classification Tool

- Client: 100qlabs
- Date: 28/05/2015

### Description ###
>I need a url I can upload CSVs of data something like domain.com/uploaddata/. the db will store the data in mongo. The CSV will always add to the db, even if it contains entries previously in the system. CSV will be like this
Name
Handle
Profile URL
Background URL
Text
TimeDate (May 28, 2015 2:43 PM)
probably we will have less than 10K rows at a time but lets make sure to test to 25K rows upload just in case.
Then I need a url where I can hit and each time it loads it will show a different row of data - we will show in a card layout code to use is below. The user will click on a couple of buttons to store what they consider the classification.
Domain.com/classify
After they hit the classification we will show a blank page saying thanks and a random short ID which will tied back to the row of data.
domain.com/classifysuccess?=ShortID
The database will have the following items of data
Name
Handle
Text
Profile URL
Background URL
Classification1 (users will classify this)
Classification2 (this is for the future)
Timedate (should be like this May 28, 2015 2:43 PM)
ShortID (you generate this)
The page we show to the classifiers will look like this http://codepen.io/mithicher/pen/azQKNN
and will have 2 buttons either above or below the card that say "Technical" and "Not Technical", you can store these values in the db as text
Lastly I need a url something like domain.com/exportresults which will dump all of the db to CSV for me, both classified and not classified.
Nodejs system should run with forever js or pm2 so it can recover from crashes and stay alive. You will be provided empty Ubuntu machine and you can install anything needed on it. 