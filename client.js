
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
	WS.emit("send",document.getElementById("message").value);
	document.getElementById("message").value = "";
}
document.getElementById("send").addEventListener("click", sendMessage);