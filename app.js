const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let url = 'https://dedas.alo-tech.com/api/?function=monitoringAgentStatistic2&session=ahRzfm11c3RlcmktaGl6bWV0bGVyaXIUCxIHU2Vzc2lvbhiAgLiqnt-MCgyiARJkZWRhcy5hbG8tdGVjaC5jb20';
    let settings = { method: "Get" };

    fetch(url, settings)
    .then(res => res.json())
    .then(datas => {
        let url2 = 'https://dedas.alo-tech.com/api/?function=monitoringWaitingCalls&session=ahRzfm11c3RlcmktaGl6bWV0bGVyaXIUCxIHU2Vzc2lvbhiAgLjKpoT3CwyiARJkZWRhcy5hbG8tdGVjaC5jb20';
        
        fetch(url2, settings)
        .then(res2 => res2.json())
        .then(waiting => {
            let url3 = 'https://dedas.alo-tech.com/api/?function=monitoringQueue&session=ahRzfm11c3RlcmktaGl6bWV0bGVyaXIUCxIHU2Vzc2lvbhiAgLjKpoT3CwyiARJkZWRhcy5hbG8tdGVjaC5jb20';

            fetch(url3, settings)
            .then(res3 => res3.json())
            .then(queue => {
                res.render('index', {datas:datas, waiting:waiting, queue:queue});
            });
        }); 
    });
 
});

module.exports = app;
