function loadGithubUsers() {
    // Object to create HTTP requests
    var xhttp = new XMLHttpRequest();

    // http protocol is mandatory
    // otherwise we might get a CORS error
    xhttp.open('GET', 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline', false);
    
    xhttp.onload = function() {
        console.log('yes it is runs');
        if(this.status == 200) {
            // we are converting the text to an object
            let products = JSON.parse(this.responseText); //array
            
            // Exercise:
            // Display the users on the document
            var outputt = "";
            for (var i = 0; i < products.length; i++) {
                console.log(products[i]);
               // console.log(users[i])//show in console
                     outputt += `
                     <div class="dv">
                     <img src="${products[i].image_link}" class="pic"></li>
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
/*external code for carousel*/
$(document).ready(function () {
    var itemsMainDiv = ('.MultiCarousel');
    var itemsDiv = ('.MultiCarousel-inner');
    var itemWidth = "";

    $('.leftLst, .rightLst').click(function () {
        var condition = $(this).hasClass("leftLst");
        if (condition)
            click(0, this);
        else
            click(1, this)
    });

   ResCarouselSize();




    $(window).resize(function () {
        ResCarouselSize();
    });

    //this function define the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "MultiCarousel" + id);


            if (bodyWidth >= 1200) {
                incno = itemsSplit[3];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 992) {
                incno = itemsSplit[2];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 768) {
                incno = itemsSplit[1];
                itemWidth = sampwidth / incno;
            }
            else {
                incno = itemsSplit[0];
                itemWidth = sampwidth / incno;
            }
            $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
            $(this).find(itemClass).each(function () {
                $(this).outerWidth(itemWidth);
            });

            $(".leftLst").addClass("over");
            $(".rightLst").removeClass("over");

        });
    }


    //this function used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.leftLst');
        var rightBtn = ('.rightLst');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemWidth * s);
            $(el + ' ' + rightBtn).removeClass("over");

            if (translateXval <= itemWidth / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        }
        else if (e == 1) {
            var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemWidth * s);
            $(el + ' ' + leftBtn).removeClass("over");

            if (translateXval >= itemsCondition - itemWidth / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }

    //It is used to get some elements from btn
    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }

}); 

/*for drog and drop ***********
**************************
************************
*******************
******************/
// Variables
var orangeSquare = document.getElementById("drop-element");
var pinkSquareContainer = document.getElementsByClassName("draggable-container")[0];

//Feature detection from Modernizr
var div = document.createElement("div");

if ("draggable" in div || ("ondragstart" in div && "ondrop" in div))
  console.log("Drag and Drop API is supported!");

// Draggable Element Functions
function onDragStartForPinkSquare(event) {
  event.dataTransfer.setData("text/plain", event.target.id); // "draggable-element"
  // define allowed effects
  event.dataTransfer.effectsAllowed = "move";

  // change cursor style
  event.target.style.cursor = "move";
   
  // To possibly create a drag image then hide the original
  setTimeout(()=>event.target.classList.add('hide'), 0);
}

function onDragEndForPinkSquare(event) {
  event.target.style.cursor = "pointer";
  event.target.classList.remove('hide');
}

// Generic onDragOver and onDrop Functions
function onDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function onDrop(event, color) {
  event.preventDefault();

  // Extract id of element and get it's reference
  var id = event.dataTransfer.getData("text/plain");
  var pinkSquaere = document.getElementById(id);

  // Only append element, if it's not already appended to that elem
  // i.e. if that element is not it's parent

  if (color === "pink") {
    if (!pinkSquaere.parentNode.isSameNode(pinkSquareContainer))
      event.target.appendChild(pinkSquaere);
  } else {
    if (!pinkSquaere.parentNode.isSameNode(orangeSquare))
      event.target.appendChild(pinkSquaere);
  }
}

// Functions for drop zone 1 (Orange Square)

function onDragOverForOrangeSquare(event) {
  onDragOver(event);
}

function onDropForOrangeSquare(event) {
 onDrop(event, "orange");
}

// Functions for drop zone 2 (Pink bordered Square)

function onDragOverForPinkSquareContainer(event) {
  onDragOver(event);
}

function onDropForPinkSquareContainer(event) {
  onDrop(event, "pink");
}
