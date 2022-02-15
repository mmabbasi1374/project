function loadGithubUsers() {
    // Object to create HTTP requests
    var xhttp = new XMLHttpRequest();

    // http protocol is mandatory
    // otherwise we might get a CORS error
    xhttp.open('GET', 'http://makeup-api.herokuapp.com/api/v1/products', true);
    
    xhttp.onload = function() {
        console.log('yes it is runs');
        if(this.status == 200) {
            // we are converting the text to an object
            let products = JSON.parse(this.responseText); //array
            
            // Exercise:
            // Display the users on the document
            var outputt = "";
            for (var i = 0; i < products.length; i++) {
                console.log(userss[i]);
               // console.log(users[i])//show in console
                     outputt += `
                     <div class="dv">
                     <img src="${products[i].avatar_url}" class="pic"></li>
                            <ul >
                                <li > id: ${products[i].id}</li>
                                <li > brand: ${products[i].brand}</li>
                               
                             </ul>
                             </div>
                         ` + `<br>`;
                }

            document.getElementById('output4').innerHTML = outputt;
            
            console.log("The request succeeded.")
             
    }
        else if(this.status == 404 || this.status == 403) {
            document.getElementById("output4").innerHTML = "The file cannot be found, error code: " + this.status;
        } 
        else {
            document.getElementById("output4").innerHTML = "Some problem occured.";
           // window.alert("Some problem occured.");
        }
    }
    xhttp.send();
}
function JSalert(){
	swal("Congrats!", ", Your account is created!", "success");
}