var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sseMW = require('./sse');

// Realtime updates
var sseClients = new sseMW.Topic();
var arraydailyhelper = [
    { 
        "id":"1",
        "title":"Title11",
        "category":"Category1", 
        "order":null, 
        "cardType":"DAILY_UPDATE",
        "articles":[
            {
                id:"articleid1",
                uri:"https://github.com/spring-projects/spring-security",
                title:"spring-projects/spring-security",
                description:"spring-security - Spring Security",
                source:"source1",
                imageUri :"https://avatars2.githubusercontent.com/u/317776?s=400&v=4",
                addedAt:"2017-11-13T02:04:18.878"
            },
            {
                id:"articleid2",
                uri:"https://github.com/spring-projects/spring-security",
                title:"spring-projects/spring-security",
                description:"spring-security - Spring Security",
                source:"source2",
                imageUri :"https://avatars2.githubusercontent.com/u/317776?s=400&v=4",
                addedAt:"2017-11-13T02:04:18.878"
            },
            {
                id:"articleid3",
                uri:"https://github.com/spring-projects/spring-security",
                title:"spring-projects/spring-security",
                description:"spring-security - Spring Security",
                source:"source3",
                imageUri :"https://avatars2.githubusercontent.com/u/317776?s=400&v=4",
                addedAt:"2017-11-13T02:04:18.878"
            }
        ],
        createdAt:"2017-11-13T02:04:18.878",
        updatedAt:"2017-11-13T02:04:18.878"
    },
    { 
        "id":"2",
        "title":"Title12",
        "category":"Category2", 
        "order":null, 
        "cardType":"DAILY_UPDATE",
        "articles":[
            {
                id:"articleid2",
                uri:"https://github.com/spring-projects/spring-security",
                title:"spring-projects/spring-security",
                description:"spring-security - Spring Security",
                source:"source2",
                imageUri :"https://avatars2.githubusercontent.com/u/317776?s=400&v=4",
                addedAt:"2017-11-13T02:04:18.878"
            }
        ],
        createdAt:"2017-11-13T02:04:18.878",
        updatedAt:"2017-11-13T02:04:18.878"
    },
    { 
        "id":"3",
        "title":"Title13",
        "category":"Category3", 
        "order":null, 
        "cardType":"DAILY_UPDATE",
        "articles":[
            {
                id:"articleid1",
                uri:"https://github.com/spring-projects/spring-security",
                title:"spring-projects/spring-security",
                description:"spring-security - Spring Security",
                source:"source1",
                imageUri :"https://avatars2.githubusercontent.com/u/317776?s=400&v=4",
                addedAt:"2017-11-13T02:04:18.878"
            }
        ],
        createdAt:"2017-11-13T02:04:18.878",
        updatedAt:"2017-11-13T02:04:18.878"
    },
    { 
        "id":"4",
        "title":"title helper",
        "category": null, 
        "order": "Order1", 
        "cardType":"HELPER",
        "articles":[
            {
                id:"articleid1",
                uri:"https://github.com/spring-projects/spring-security",
                title:"spring-projects/spring-security",
                description:"spring-security - Spring Security",
                source:"source1",
                imageUri :"https://avatars2.githubusercontent.com/u/317776?s=400&v=4",
                addedAt:"2017-11-13T02:04:18.878"
            }
        ],
        createdAt:"2017-11-13T02:04:18.878",
        updatedAt:"2017-11-13T02:04:18.878"
    }
]

var arraybook = [
    {
        "id":"5a08b05aa27d8836b5e4aa4c",
        "isSchoolTextbook":true,
        "schoolTextbookInfo": {
            "subject":"Civics", 
            "grade": "Class VII", 
            "board": "CBSE", 
            "title": "Intro to civics"
        }, 
        "standardTextbookInfo": null,
        "chapters": [ {
            "title": "Chapter 1", 
            "chapterNum": 1, 
            "topics": [
                "civics", 
                "politics"
            ], 
            "links": [
                "www.xyz.com",
                "www.abc.xyz"
            ]
        }, 
        {
            "title": "Chapter 2", 
            "chapterNum": 2, 
            "topics": [
                "sociology"
            ], "links": [

            ]
        } ],
        "allTopics":[
            "civics", 
            "politics", 
            "sociology"
        ], 
        "createdAt":"2017-11 -13T02:04:18.878",
        "updatedAt":"2017-11 -13T02:04:18.878"
    },
    {
        "id":"5a08b05aa27d8836b5e4aa4d",
        "isSchoolTextbook":false,
        "schoolTextbookInfo": null,
        "standardTextbookInfo": {
            "author": "Mahatma Gandhi", 
            "title": "Experiments with truth", 
            "edition": "1stEdition"
        },
        "chapters": [ 
            {
                "title": "Chapter 1", 
                "chapterNum": 1, 
                "topics": [
                    "civics", 
                    "politics"
                ], 
                "links":[
                    "www.xyz.com", 
                    "www.abc.xyz"
                ]
            }, 
            {
                "title": "Chapter 2", 
                "chapterNum": 2, 
                "topics": [
                    "sociology"
                ], 
                "links": []
            }
        ],
        "allTopics": [
            "civics", 
            "politics"
        ], 
        "createdAt":"2017-11 -13T02:04:18.878",
        "updatedAt":"2017-11 -13T02:04:18.878"
    }
]

var arraytopic = [
    "civics", 
    "politics", 
    "sociology",
    "sociology1",
    "sociology2"
]

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../Client/public')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../Client/public/login.html'));
});

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, '../Client/public/login.html'));
});

app.get('/dashboard', function (req, res) {
    res.sendFile(path.join(__dirname, '../Client/public/login.html'));
});


//event
app.use(sseMW.sseMiddleware)
// initial registration of SSE Client Connection 
app.get('/api/v1/card', function (req, res) {
    var sseConnection = res.sseConnection;
    sseConnection.setup();
    sseClients.add({client: sseConnection, type: req.query.type });
    initHeartbeat({client: sseConnection, type: req.query.type });
});


app.get('/api/v1/book', function (req, res) {
    var sseConnection = res.sseConnection;
    sseConnection.setup();
    sseClients.add({client: sseConnection, type: 'BOOKS' });
    initHeartbeatSearchBook({client: sseConnection, type: 'BOOKS' }, req.query.topic);
});


app.get('/api/v1/book/topics', function (req, res) {
    var sseConnection = res.sseConnection;
    sseConnection.setup();
    sseClients.add({client: sseConnection, type: 'TOPICS' });
    initHeartbeat({client: sseConnection, type: 'TOPICS' });
});


app.get('/fireevent', function (req, res) {
    
    if(req.query.type == 'DAILY_UPDATE') {
        for(var i = 0; i < arraydailyhelper.length; i ++) {
            if(arraydailyhelper[i].category) {
                updateSseClients(arraydailyhelper[i], 'DAILY_UPDATE');
            }
        }
    }

    if(req.query.type == 'HELPER') {
        for(var i = 0; i < arraydailyhelper.length; i ++) {
            if(arraydailyhelper[i].order) {
                updateSseClients(arraydailyhelper[i], 'HELPER');
            }
        }
    }

    if(req.query.type == 'BOOKS') {
        for(var i = 0; i < arraybook.length; i ++) {
            updateSseClients(arraybook[i], 'BOOKS');
        }
    }

    if(req.query.type == 'TOPICS') {
        for(var i = 0; i < arraytopic.length; i ++) {
            updateSseClients(arraytopic[i], 'TOPICS');
        }
    }
    res.send('done')
});

initHeartbeatSearchBook = function(p_sseClient, topic) {
    if(p_sseClient.type == 'BOOKS'  ) {
        if(topic) {
            arraybook.forEach(item => {
                for(var i = 0; i < item.allTopics.length; i ++) {
                    if(item.allTopics[i].indexOf(topic) >= 0) {
                        p_sseClient.client.send(item); 
                    }
                }
            });
        } else {
            arraybook.forEach(item => {
                p_sseClient.client.send(item); 
            });
        }
    } 
}

initHeartbeat = function(p_sseClient) {
    if(p_sseClient.type == 'DAILY_UPDATE'  ) {
        arraydailyhelper.forEach(item => {
            if(item.category) {
                p_sseClient.client.send( item); 
            }
        });
    } 
    if(p_sseClient.type == 'HELPER'  ) {
        arraydailyhelper.forEach(item => {
            if(item.order) {
                p_sseClient.client.send(item); 
            }
        });
    } 

    if(p_sseClient.type == 'BOOKS'  ) {
        arraybook.forEach(item => {
            p_sseClient.client.send(item); 
        });
    } 

    if(p_sseClient.type == 'TOPICS'  ) {
        arraytopic.forEach(item => {       
            p_sseClient.client.send(item, 'error'); 
        });
    } 
}

updateSseClients = function (message, type) {
    var msg = message;
    this.m = message;
    sseClients.forEach(
        function (sseConnection) {
            if(sseConnection.type == type) {
                sseConnection.client.send(this.m);
            }
        }, this
    );
} //updateSseClients


//Add and delete article
app.delete('/api/v1/card/:cardId/article', function (req, res) {
    let cardupdate = {};
    arraydailyhelper = arraydailyhelper.map(item => {
            if(item.id != req.params.cardId) {
                return item;
            }
            let id = req.body.id;
            let articles = [];
            item.articles.map(itemarticle => {
                if(itemarticle.id != id) {
                    articles.push(itemarticle);
                }
            });
            item.articles = articles;
            cardupdate = item;
            return item;
    });

    if(cardupdate.catagory) {
        updateSseClients(cardupdate, 'DAILY_UPDATE');
    } else {
        updateSseClients(cardupdate, 'HELPER');
    }
    res.status = 200;
    res.send({code: 1});
});

//api save article
app.put('/api/v1/card/:cardId/article', function (req, res) {
    let cardupdate = {};
    let article = req.body;

    if(article.id) {

    } else {
        
    }
    arraydailyhelper = arraydailyhelper.map(item => {
            if(item.id != req.params.cardId) {
                return item;
            }
            if(!article.id) {
                article.id = Date.now().toString();
                item.articles.push(article);
            } else {
                let ishave = false;
                item.articles = item.articles.map(itemarticle => {
                    if(itemarticle.id == article.id) {
                        ishave = true;
                        return article;
                    } 
                    return itemarticle;
                });

                if(!ishave) {

                    if(item.articles) {
                        if(item.articles.length > 0) {
                            item.articles.push(article);
                        } else {
                            item.articles = [];
                            item.articles.push(article);
                        }
                    } else {
                        item.articles = [];
                        item.articles.push(article);
                    }
                }
            }
            cardupdate = item;
            return item;
    });

    if(cardupdate.category) {
        updateSseClients(cardupdate, 'DAILY_UPDATE');
    } else {
        updateSseClients(cardupdate, 'HELPER');
    }
    res.status = 200;
    res.send({code: 1});
});

app.get('/api/v1/card/article/parse', function(req, res) {
    res.send({
        "id": Date.now().toString(),
        "uri": req.query.uri,
        "title": "spring-projects/spring-security",
        "source": "abc",
        "description": "spring-security - Spring Security",
        "imageUri": "https://avatars2.githubusercontent.com/u/317776?s=400&v=4",
        "addedAt": "2017-11-13T01:29:51.102"
      });    
});


//api save card
app.put('/api/v1/card', function (req, res) {
    let cardupdate = req.body;
    arraydailyhelper = arraydailyhelper.map(item => {
            if(item.id == cardupdate.id) {
                return cardupdate;
            }
            return item;
    });

    if(cardupdate.category) {
        updateSseClients(cardupdate, 'DAILY_UPDATE');
    } else {
        updateSseClients(cardupdate, 'HELPER');
    }
    res.status = 200;
    res.send({code: 1});
});

//add card
app.post('/api/v1/card', function (req, res) {
    let cardupdate = req.body;
    cardupdate.id = Date.now().toString();
    cardupdate.articles.map( (item, index) => {
        item.id = Date.now().toString() + index.toString();
        return item;
    });
    arraydailyhelper.push(cardupdate);
    if(cardupdate.category) {
        updateSseClients(cardupdate, 'DAILY_UPDATE');
    } else {
        updateSseClients(cardupdate, 'HELPER');
    }
    res.status = 200;
    res.send({code: 1});
});

//api delete card
app.delete('/api/v1/card/:cardId', function (req, res) {
    let cardupdate = req.body;
    let array = [];
    arraydailyhelper.map(item => {
        if(req.params.cardId != item.id) {
            array.push(item)
        }
    });
    arraydailyhelper = array;

    res.status = 200;
    res.send({code: 1});
});

//===================================== Book =================================
//api delete card
app.delete('/api/v1/book/:bookId', function (req, res) {
    let array = [];
    arraybook.map(item => {
        if(req.params.bookId != item.id) {
            array.push(item)
        }
    });
    arraybook = array;
    res.status = 200;
    res.send({code: 1});
});

//add book
app.post('/api/v1/book', function (req, res) {
    var book = req.body;
    book.id = Date.now().toString();
    arraybook.push(book);
    updateSseClients(book, 'BOOKS');
    res.status = 200;
    res.send({code: 1});
});

//update book
app.put('/api/v1/book', function (req, res) {
    var book = req.body;
    arraybook = arraybook.map(item => {
        if(item.id == book.id) {
            return book;
        }
        return item;
    });
    updateSseClients(book, 'BOOKS');
    res.status = 200;
    res.send({code: 1});
});

//Client
app.post('/api/v1/login', function (req, res) {
    var paramer = req.body;
    if (paramer.username == 'admin' && paramer.password == 'admin') {
        res.status(200);
        res.send({ "token": "050c5300-e10f-41f9-98c1-d542841d80bb" });
    } else {
        res.status(400);
        res.send({ "token": "" });
    }
});

var server = app.listen(3001, function () {
});
