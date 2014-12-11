/**
 * WebSocket extension
 */
var WS = {
	EVENTS 	: [],
	EMITS  	: [],
	WS 		: null,
	url 	: null,

	opened 	: 0,

	init 	: function(url){
		THIS 		= this;
		this.url 	= url;
		if ( typeof(MozWebSocket) == 'function' )
			this.WS = new MozWebSocket(url);
		else
			this.WS = new WebSocket(url);
		this.WS.onerror = function(err,er){
			console.log(arguments);
		}
		this.WS.onopen = function(){
			THIS.opened = 1;
		}
		this.WS.onmessage=function(evt){
			var data = JSON.parse(evt.data);
			for(e in THIS.EVENTS)
				if(e == data.e) THIS.EVENTS[e](data.d);
		}
	},
	send 	: function(data){
		this.WS.send(data);
	},
	onopen 	: function(func){
		THIS           = this;
		this.WS.onopen = function(){
			func();
			for(e in THIS.EMITS)
				THIS.send(THIS.EMITS[e]);
			THIS.opened = 1;
		}
		
	},
	onclose	: function(func){
		this.WS.onclose=function(){
			func();
		}
	},
	disconnect : function(func){
		this.WS.close();
		func();
	},
	emit 	: function(event, data){
		json = { 	e : event,
					d : data}
		data = JSON.stringify(json);
		if(this.opened)
			this.send(data);
		else
			this.EMITS[event] = data;
	},
	on 		: function(event, func){
		this.EVENTS[event] = func;
	}

}