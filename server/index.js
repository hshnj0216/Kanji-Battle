const express = require('express');
const app = express();
const cors = require('cors');
const JishoApI = require('unofficial-jisho-api');


app.use(express.static(__dirname + '/static'));

app.use(cors());

app.get('/data/:kanji',async (req, res) => {
    const jisho = new JishoApI();
    res.send(result = {
            kanjiData: 
                await jisho.searchForKanji(req.params.kanji).then(r => {
                if (r.found == true) {
                    return r;
                }
                else {
                    res.send({ error: "Invalid input or no result found." });
                }
            }), 
            audioData: 
                await jisho.scrapeForPhrase(req.params.kanji).then((data) => {
                    if (data) {
                        return data.audio;
                    }
                })
        }
    );
    
});



app.listen(4000);