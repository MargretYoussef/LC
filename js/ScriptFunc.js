//display all products limited with 20 in the home page through API
productsHomePage();
function productsHomePage() {
    var xhr = new XMLHttpRequest();
    var userObject = [];
    xhr.open("get", "https://fakestoreapi.com/products", true);
    xhr.send()
    xhr.addEventListener('readystatechange', function () {

        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4 && xhr.status == 200) {
                //var idInput = parseInt(document.getElementById("displayUsers").value);
                userObject = JSON.parse(xhr.responseText);
                //console.log(userObject);

                postProducts();
            }
        }
    })

    function postProducts() {
        var cartoona = ``;

        for (var i = 0; i < 20; i++) {
            cartoona += `
                            <div class="prodSelf">
                                <div class="more" id="more">
                                    <img id="prodImage" src="${userObject[i].image}">
                                    <div class="details">
                                        <h4 id="prodName">${userObject[i].title}</h4>
                                        <h3 id="prodPrice">${userObject[i].price + " LE"}</h3>
                                        <div class="addCart" id="${userObject[i].id}">
                                            <button onclick="myFunction(this)"> Cart + </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;

        }
        document.getElementById("productsBody").innerHTML = cartoona;
    }
}

//-------------------------------------------------------------
//add products in an array and save it in the local storage....
var userproducts = [];  //products added to the session storage
function myFunction(e) {
    //console.log(e.parentNode.id);
    var idProdParent = e.parentNode.id;

    var xhr = new XMLHttpRequest();
    xhr.open("get", "https://fakestoreapi.com/products", true);

    xhr.send();
    xhr.addEventListener('readystatechange', function () {

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var userObjectproducts = JSON.parse(xhr.responseText);

                var productID = userObjectproducts[idProdParent - 1];
                userproducts.push(productID);

                //localStorage.setItem("UserCart", JSON.stringify(userproducts));
                sessionStorage.setItem("UserCart", JSON.stringify(userproducts));

                //console.log(userproducts);
            }
        }
    })
}

//-------------------------------------------------------
var userproductsArray = [];
productsInShoppingCart();
//display the products from local storage to the cart page
function productsInShoppingCart() {
    //var userproductsUserCart = localStorage.getItem("UserCart");
    var userproductsUserCart = sessionStorage.getItem("UserCart");
    userproductsArray = JSON.parse(userproductsUserCart);
    console.log(userproductsArray);

    postProductsInCArtPage();

    function postProductsInCArtPage() {
        var cartoona2 = ``;

        for (var x = 0; x < userproductsArray.length; x++) {
            //console.log(userproductsArray[x]);
            cartoona2 += `
                <div class="prodSelfCart">
                    <div class="moreCart" id="moreCart">
                        <img id="prodImageCart" src="${userproductsArray[x].image}" style="width: 100%; height:200px">
                        <div class="detailsCart">
                            <h4 id="prodNameCart">${userproductsArray[x].title}</h4>
                            <h3 id="prodPriceCart">${userproductsArray[x].price}  LE</h3>
                            <div class="deleteFromCart" id="delete">
                                    <button id="${userproductsArray[x].id}-delete" class="delete" onclick="deleteProduct(this)"><i class="fa-solid fa-trash-can"></i> Remove</button>
                            </div>
                            <form class="prodQuantity" id="prodQuantityid">
                                    <label for="quantity">Quantity</label>
                                    <input onchange="quantityprice(this)" id="${userproductsArray[x].id}-quantity" class="quantity" type="number" placeholder="01" min="01" max="10" value="01" style="width:70px ;"></input>
                                    <label  id="${userproductsArray[x].id}-totalmoney" >${userproductsArray[x].price}  LE</label>
                            </form>
                        </div>
                    </div>
                </div>
            `;
        }
        document.getElementById("cartProductsBody").innerHTML = cartoona2;
    }
}

//----------------------------------------------
//quantity and total price for one product......
quantityprice();
function quantityprice(x){
    var quantityId1 = x.id;  //full id
    var quantityId2 = x.id.split('-')[0];  // split id

    for(var n = 0; n < userproductsArray.length; n++){
        if(quantityId2 == userproductsArray[n].id){
            var quantityValue = document.getElementById(quantityId1).value;

            //product subPrice 
            var productPrice = userproductsArray[n].price;
            console.log(quantityValue + "......" + productPrice);

            //product subPrice  * quantity.....
            var totalsubPrice = productPrice * quantityValue;
            console.log("total = " + totalsubPrice + " LE");  
            
            //calling the display price.....
            displayPrice(quantityId2 , totalsubPrice);
        }
    }
}

function displayPrice(q , a){
    document.getElementById(q + '-totalmoney').innerHTML = a.toFixed(2) + "LE";
}

//------------------------
//remove product from cart
function deleteProduct(r){
    var deleteID = r.id.split('-')[0];
    console.log(deleteID);
    console.log(userproductsArray);
    for(var x = 0; x < userproductsArray.length; x++){
        if(deleteID == userproductsArray[x].id){
            userproductsArray.splice(x , 1);
            alert("Are You Sure Deleting This Product?");
            sessionStorage.setItem("UserCart" , JSON.stringify(userproductsArray));
        }
    }
    productsInShoppingCart();
}
