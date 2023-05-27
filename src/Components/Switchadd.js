var socket = null ;

  function pressFunction(div_button_id , button_number , device_type){
    check_button = document.getElementById(div_button_id) ; 
    state_change_value = check_button.checked ; 
    console.log("The change state value is : " + state_change_value ) ; 
    console.log("The button number is : " + button_number) ; 
    if (socket != null ) {
      socket.send(
        JSON.stringify(
          { 
            "command" : "change_switch_status" , 
            "state_change_value" : state_change_value , 
            "button_number" : button_number ,
            "device_type" : device_type ,
          }
        )
      )
    }
    else { 
      console.log("The socket is null !") ; 
    }
  }
  console.log(window.location.protocol)
  if (window.location.protocol == "http:" ){
    var ws_path = "ws://" + window.location.host +"/";
    var socket = new WebSocket(ws_path) ; 
    }
   else {
       var ws_path = "wss://"+window.location.host+"/" ; 
       var socket = new WebSocket(ws_path) ; 
   }
    socket.onopen = function(event) { 
      console.log("Socket is connected now !") ; 
      socket.send(
        JSON.stringify(
          {
            "command" : "join_pi_group" ,
          }
        )
      )
    }
     
    socket.onclose = function(event) { 
      console.log("Socket is disconnected now !") ;  
      socket = null ;   
    }

    socket.onmessage = function(event){ 
      var data = JSON.parse(event.data) ;
      console.log(data) ; 
      var data_type = data["DATA_TYPE"]

      if(data_type == "GROUP_JOINED" && data["data"] == "group_joined_successful") {
        socket.send(
          JSON.stringify(
            {
              "command": "get_switch_list" ,
            }
          )
        )
      } 

      if (data_type == "SWITCH_BUTTON_LIST"){
        var switch_list = data["switch_list_data"] ; 
        container = document.getElementById("main") ; 
        Object.keys(switch_list).forEach(
        
          device=>{
            var button_number = switch_list[device][1] ; 
            var device_object = switch_list[device][2] ; 
            var device_state = switch_list[device][3] ;
            var device_type = switch_list[device][4] ;
            var div = document.createElement("div") ; 
            div.style.backgroundColor = "rgb(171,214,228)" ;
            div.style.height = 140+"px" ;
            div.style.width = 120+"px" ;
            div.style.display = "flex" ;
            div.style.alignItems = "center" ;
            div.style.justifyContent = "center" ; 
            div.style.border = "3px solid rgba(81, 84, 68, 0.333)" ;
            
            var label = document.createElement("label") ; 
            label.className = "switch" ;

            var input = document.createElement("input") ; 
            input.type = "checkbox" ; 
            input.id = getSwichId(button_number) ; 
            if(device_state == 1) {
              input.checked = true ;
            }
            else {
              input.checked = false ; 
            }
            input.addEventListener("click" , function(){
              pressFunction(input.id , button_number , device_type) ;
            }) ;
             var span = document.createElement("span") ; 
             span.className = "slider round" ; 

            label.appendChild(input) ; 
            label.appendChild(span) ; 

            div.appendChild(label) ; 
            container.appendChild(div);
          }
        )
      }
      if(data_type == "BUTTON_STATE_CHANGE"){
        console.log("Button state change request !")
        state_changed         = data["state_changed"] ;
        state_change_value    = data["state_change_value"] ;
        button_number         = data["button_number"] ;

        if(state_changed){
          var switch_id = getSwichId(button_number) ; 
          var button_switch = document.getElementById(switch_id) ; 
          if(state_change_value) {
            button_switch.checked = true ; 
          }
          else {
            button_switch.checked = false ; 
          }
          console.log(button_switch);
        }
      }

    }
  
function getSwichId(button_id) { 
  var string = "id_switch_"+button_id ; 
  return string; 
}