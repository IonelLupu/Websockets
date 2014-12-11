<?php 

include "websocket.php";

WS::init('127.0.0.1',4444);

$online = 0;

WS::onopen(function($client) use (&$online) {
	WS::log($client["ip"]."(".$client['name'].") has connected.");
	WS::emit("notify",[
			"msg" 		=> $client["ip"]."(".$client['name'].") has connected.",
			"online" 	=> ++$online 
		]);
});

WS::onclose(function($client) use (&$online) {
	WS::log($client["ip"]."(".$client['name'].") has disconnected.");
	WS::emit("notify",[
			"msg" 		=> $client["ip"]."(".$client['name'].") has disonnected.",
			"online" 	=> --$online
		]);
});

WS::on("send",function($data,$client){
	WS::emit("message",$client["ip"]."(".$client['name']."): ".$data);
});
?>