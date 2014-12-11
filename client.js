
var url  	= 'ws://127.0.0.1:4444';

WS.init(url);

var chatarea = document.getElementById("chatarea");

WS.onopen(function(ss){
	chatarea.innerHTML = "You are connected to chat! Say Hi!";
	console.log("Conected with websockets");
})

WS.on("notify",function(resp){
	chatarea.innerHTML += "\n" + resp.msg;
	document.getElementById("online").innerHTML = resp.online;
})
WS.on("message",function(msg){
	chatarea.innerHTML += "\n" + msg;
})

function sendMessage(){
	var input = document.getElementById("message").value;
	WS.emit("send",input);
}

document.getElementById("send").addEventListener("click", function(){
    sendMessage();
    document.getElementById("message").value = "";
});