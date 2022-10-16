const express = require('express');
const app = express();
const cors = require('cors');
const JishoApI = require('unofficial-jisho-api');

app.use(cors());

app.get('/parts/:part', async(req, res) => {
    const jisho = new JishoApI();
    res.send(await jisho.searchForKanji(req.params.part).then(data => data));
})

app.get('/examples/:kanji', async(req, res) => {
    const jisho = new JishoApI();
    res.send(await jisho.searchForExamples(req.params.kanji).then(data => data));
})

app.get('/data/:kanji',async (req, res) => {
    const jisho = new JishoApI();
    res.send(result = {
            kanjiData: 
                await jisho.searchForKanji(req.params.kanji).then(r => {
                if (r.found == true) {
                    return r;
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