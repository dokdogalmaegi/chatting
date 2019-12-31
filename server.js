const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

var filter = new Array('개새끼','개색기','개색끼','개자식','개보지','개자지','개년','개걸래','개걸레','씨발','씨팔','씨부랄','씨바랄','씹창','씹탱','씹보지','씹자지','씨방세','씨방새','씨펄','시펄','십탱','씨박','썅','쌍놈','쌍넘','싸가지','쓰벌','씁얼','상넘이','상놈의','상놈이','상놈을','좆','좃','존나게','존만한','같은년','넣을년','버릴년','부랄년','바랄년','미친년','니기미','니미씹','니미씨','니미럴','니미랄','호로','후레아들','호로새끼','후레자식','후래자식','후라들년','후라들넘','빠구리','병신','ㅆㅂ', 'ㅅㅂ', 'ㅄ');

var count = 1;
io.on('connection', function(socket) {
    console.log('user connected: ', socket.id);
    var name = 'user' + count++;
    io.to(socket.id).emit('change name', name);

    socket.on('disconnect', function() {
        console.log('user disconnected: ', socket.id);
    })
    
    socket.on('send message', function(naem, text) {
        for(var i = 0; i < filter.length; i++) {
            filter_count = text.indexOf(filter[i])
            if (filter_count >= 0) {
                // console.log(name,text)
                text = '비속어로 필터링된 단어가 포함되어 있습니다. 건전하게 채팅을 즐겨주세요';
                name = '욕쟁이 ' + name;
            }
            else {
                text = text;
            }
        }
        var msg = name + ' : ' + text;
        console.log(msg);
        io.emit('receive message', msg);
    })
})

http.listen(3000, function() {
    console.log('서버가 정상적으로 작동했습니다.')
})