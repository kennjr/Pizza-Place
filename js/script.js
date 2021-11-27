const smallPizzaTypeCost = 400;
const mediumPizzaTypeCost = 500;
const largePizzaTypeCost = 700;
const x_largePizzaTypeCost = 800;

const smallPizzaCrustCost = 350;
const mediumPizzaCrustCost = 400;
const largePizzaCrustCost = 550;
const x_largePizzaCrustCost = 700;

const smallExtraCost = 100;
const mediumExtraCost = 200;
const largeExtraCost = 300;
const x_largeExtraCost = 400;

// This is for the message slides that'll be at the top of the site 
var slideIndex = 0;


$(document).ready(() => {
    var orderedPizzas = [];
    let totalBill = 0;
    let pizzasCost = 0;
    let pizzasInCart = []
    let addedDeliveryFee = false;
    resetAllOptionLists(0);
    showSlides()

    document.getElementById("pizza_sizes_dropdown_list").addEventListener("change", (e) => {
        var pizzaSize = $("#pizza_sizes_dropdown_list").val()
        console.log(pizzaSize)
        var mCrustOptions = pizzaCrustOptions(pizzaSize);
        mCrustOptions.forEach((value, index) => {
            var myDLLField = $('select[id="crusts_dropdown_list"]');
            myDLLField.find('option[value="'+value.value+'"]').text(""+value.string+"");   
        });

        var mTypeOptions = pizzaTypeOptions(pizzaSize);
        mTypeOptions.forEach((value, index) => {
            var myDLLField = $('select[id="pizza_types_dropdown_list"]');
            myDLLField.find('option[value="'+value.value+'"]').text(""+value.string+"");   
        });
        
        var mExtraCheeseOptions = pizzaExtraCheeseOptions(pizzaSize);
        mExtraCheeseOptions.forEach((value, index) => {
            var myDLLField = $('select[id="extra_cheese_dropdown_list"]');
            myDLLField.find('option[value="'+value.value+'"]').text(""+value.string+"");   
        });

        var mExtraMeatOptions = pizzaExtraMeatOptions(pizzaSize);
        mExtraMeatOptions.forEach((value, index) => {
            var myDLLField = $('select[id="extra_meat_dropdown_list"]');
            myDLLField.find('option[value="'+value.value+'"]').text(""+value.string+"");   
        });

        var mExtraVeggieOptions = pizzaExtraVeggieOptions(pizzaSize);
        mExtraVeggieOptions.forEach((value, index) => {
            var myDLLField = $('select[id="extra_veggies_dropdown_list"]');
            myDLLField.find('option[value="'+value.value+'"]').text(""+value.string+"");   
        });
    })
    
    $(".order_form").submit((e) => {
        e.preventDefault();

        var pizzaSize = $("#pizza_sizes_dropdown_list").val()
        var pizzaCrust = $("#crusts_dropdown_list").val()
        var pizzaType = $("#pizza_types_dropdown_list").val()
        var extraCheese = $("#extra_cheese_dropdown_list").val()
        var extraMeat = $("#extra_meat_dropdown_list").val()
        var extraVeggie = $("#extra_veggies_dropdown_list").val()
        var side = $("#sides_dropdown_list").val()



        var mPizza = new Pizza(pizzaSize, pizzaCrust, pizzaType, extraCheese, extraMeat, extraVeggie, side)
        let checkingPizza = validateOrder(mPizza)
        if (checkingPizza.value == true) {
            var costOfPizza = billPizza(mPizza);
            var pizzaCostInfo = new listItem(costOfPizza, getPizzaSize(mPizza) +" "+ getPizzaName(mPizza))
            pizzasInCart.push(pizzaCostInfo);
            
            if(confirm("Add a " + getPizzaSize(mPizza) +" " + getPizzaName(mPizza) + " worth ksh " + costOfPizza +" to your cart?") == true){
                orderedPizzas.push(mPizza);
                totalBill += costOfPizza;
                pizzasCost += costOfPizza;
                document.getElementById("number_of_pizzas_string").innerHTML = orderedPizzas.length + " pizza(s)"
                document.getElementById('total_pizzas_cost_string').innerHTML = pizzasCost.toString();
                document.getElementById('vat_cost_string').innerHTML = getVAT(totalBill);
    
                updateTotalBill(totalBill);
            }   
        }else{
            alert(checkingPizza.string)
        }
        
    })

    $("#checkout_btn").on("click", () => {
        if (totalBill > 0 && orderedPizzas.length > 0) {
            // the loop below will get all the items in the users cart
            let pizzasOrderedString = "";
            pizzasInCart.forEach((element, index) => {
                pizzasOrderedString += element.string +" at ksh "+ element.value + "\n";
            })
            if (addedDeliveryFee) {
                console.log("We appreciate your order of : " + pizzasOrderedString + "Delivery fee of : 300\n" + "\nTotaling :ksh " + totalBill + "\nWe'll notify you when the food is ready for delivery")
                alert("We appreciate your order of : " + pizzasOrderedString + "Delivery fee of : 300\n" + "\nTotaling :ksh " + totalBill + "\nWe'll notify you when the food is ready for delivery");
            }
            else if (!addedDeliveryFee) {
                console.log("We appreciate your order of : " + pizzasOrderedString + "\nTotaling : ksh " + totalBill + "\nWe'll notify you when the food is ready for pick up")
                alert("We appreciate your order of : " + pizzasOrderedString + "\nTotaling : ksh " + totalBill +"\nWe'll notify you when the food is ready for pick up");
            }

            totalBill = 00;
            pizzasCost = 00;
            addedDeliveryFee = false;
            orderedPizzas = [];

            document.getElementById("number_of_pizzas_string").innerHTML = "Empty cart"
            document.getElementById('total_pizzas_cost_string').innerHTML = "00";
            document.getElementById('vat_cost_string').innerHTML = "00";
            document.getElementById('delivery_cost_string').innerHTML = "00";

            updateTotalBill(totalBill);
            resetAllOptionLists(0);
        }else{
            alert("There's nothing in your cart, add atleast one pizza to your cart.")
        }
        
    })

    $("#add_delivery_location_btn").on("click", function() {
        var location = $("#delivery_location_edt").val().trim()
        if (location != "") {
            if (confirm("A delivery fee of 300 will be charged for the food to be delivered at "+location+", by clicking Ok the amount will be added to your bill.") == true) {
                addedDeliveryFee = true
                totalBill += 300
                document.getElementById('delivery_cost_string').innerHTML = 300;
                document.getElementById('vat_cost_string').innerHTML = getVAT(totalBill);
                updateTotalBill(totalBill);
            }else{
                // Check whether the user had added a delivery fee before, if so then remove the fee
                if (addedDeliveryFee) {
                    addedDeliveryFee = false
                    totalBill -= 300
                    document.getElementById('delivery_cost_string').innerHTML = 00;
                    document.getElementById('vat_cost_string').innerHTML = getVAT(totalBill);
                    updateTotalBill(totalBill);
                }
            }   
        }else{
            alert("Enter a location for the delivery")
        }
    })
    $("#new_order_text").on("click", () => {
        resetAllOptionLists(0);
    })
    
})

function updateTotalBill (newTotal){
    document.getElementById("total_amt_string").innerHTML = newTotal;
}

var getVAT = (amount) => {
    let vat = 0.16 * amount;
    return vat
}

var getPizzaName = (pizza) => {
    switch (pizza.type) {
        case "boerewors_pizza":
            return "Boerewors pizza";
        case "bbq_chicken_pizza":
            return "BBQ Chicken pizza";
        case "pepperoni_pizza":
            return "Pepperoni pizza";
        case "margharita_pizza":
            return "Margharita pizza";
        case "beef_steak_pizza":
            return "Beef Steak pizza";
        case "hawaiian_pizza":
            return "Hawaiian pizza";
        case "veggie_pizza":
            return "Veggie pizza";
        default:
            return "";
    }
}

var getPizzaSize = (pizza) => {
    switch (pizza.size) {
        case "small_pizza":
            return "Small";
        case "medium_pizza":
            return "Medium";
        case "large_pizza":
            return "Large";
        case "x_large_pizza":
            return "Extra large";
        default:
            return "";
    }
}

function resetAllOptionLists(index){
    $('.dropdown_list').prop('selectedIndex', index);
    return;
}

var validateOrder = (pizzaItem) => {
    if (pizzaItem.size == "0") {
        var invalidOrder = new listItem(false, "You've not chosen a size for your pizza");
        return invalidOrder;
    }
    else if (pizzaItem.type == "0") {
        var invalidOrder = new listItem(false, "You've not chosen the type of pizza you'd like");
        return invalidOrder;
    }
    else if (pizzaItem.crust == "0") {
        var invalidOrder = new listItem(false, "You've not chosen a crust for your pizza");
        return invalidOrder;
    }
    else{
        var invalidOrder = new listItem(true, "Everything's good");
        return invalidOrder;
    }
}

function billPizza(pizza) {
    var total = 0
    var crustCost = pizza.getCrustCost();
    if (crustCost > 0) {
        // Add the cost of the crust to the total
        total += crustCost
    }
    var typeCost = pizza.getTypeCost();
    total += typeCost;
    if (pizza.extra_cheese != "0") {
        var costOfExtra = addCostOfExtra(pizza.size);
        total += costOfExtra;
    }
    if (pizza.extra_meat != "0") {
        var costOfExtra = addCostOfExtra(pizza.size);
        total += costOfExtra;
    }
    if (pizza.extra_veggie != "0") {
        var costOfExtra = addCostOfExtra(pizza.size);
        total += costOfExtra;
    }
    if (pizza.side != "0") {
        total += 150;
    }
    return total;

}

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("single_message");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 5000); // Change image every 2 seconds
} 

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// This prototype fun will give us the cost of the crust
Pizza.prototype.getCrustCost = function (){
    switch (this.size) {
        case "small_pizza":
            return smallPizzaCrustCost;
        case "medium_pizza":
            return mediumPizzaCrustCost;
        case "large_pizza":
            return largePizzaCrustCost;
        case "x_large_pizza":
            return x_largePizzaCrustCost;
        default:
            return 0;
    }
}

// This prototype fun will give us the cost of the crust
Pizza.prototype.getTypeCost = function (){
    switch (this.size) {
        case "small_pizza":
            return smallPizzaTypeCost;
        case "medium_pizza":
            return mediumPizzaTypeCost;
        case "large_pizza":
            return largePizzaTypeCost;
        case "x_large_pizza":
            return x_largePizzaTypeCost;
        default:
            return 0;
    }
}

function addCostOfExtra (pizzaSize){
    switch (pizzaSize) {
        case "small_pizza":
            return smallExtraCost;
        case "medium_pizza":
            return mediumExtraCost;
        case "large_pizza":
            return largeExtraCost;
        case "x_large_pizza":
            return x_largeExtraCost;
        default:
            return 0;
    }
}

function pizzaCrustOptions (pizzaSize){
    var crustOptions = []

    var firstItem = new listItem("0", "Choose a crust");
    var secondItem = new listItem("crispy_crust", "Crispy");
    var thirdItem = new listItem("thick_crust", "Thick");
    var fourthItem = new listItem("stuffed_crust", "Stuffed");
    var fifthItem = new listItem("thin_crust", "Thin");
    var sixthItem = new listItem("gluten_free_crust", "Gluten free");

    let pizzaCrustCost = ""

    switch (pizzaSize) {
        case "0":
            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem, sixthItem)
            
            return crustOptions;
        case "small_pizza":
            pizzaCrustCost = "  ->  ksh " + smallPizzaCrustCost.toString()

            console.log(pizzaCrustCost)

            secondItem.string += pizzaCrustCost
            thirdItem.string += pizzaCrustCost
            fourthItem.string += pizzaCrustCost
            fifthItem.string += pizzaCrustCost
            sixthItem.string += pizzaCrustCost

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem, sixthItem)
            
            return crustOptions;
        case "medium_pizza":
            pizzaCrustCost = "  ->  ksh " + mediumPizzaCrustCost.toString()

            secondItem.string += pizzaCrustCost
            thirdItem.string += pizzaCrustCost
            fourthItem.string += pizzaCrustCost
            fifthItem.string += pizzaCrustCost
            sixthItem.string += pizzaCrustCost

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem, sixthItem)
            
            return crustOptions;
        case "large_pizza":
            pizzaCrustCost = "  ->  ksh " + largePizzaCrustCost.toString()
            console.log(pizzaCrustCost)

            secondItem.string += pizzaCrustCost
            thirdItem.string += pizzaCrustCost
            fourthItem.string += pizzaCrustCost
            fifthItem.string += pizzaCrustCost
            sixthItem.string += pizzaCrustCost

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem, sixthItem)
            
            return crustOptions;
        case "x_large_pizza":
            pizzaCrustCost = "  ->  ksh " + x_largePizzaCrustCost.toString()

            secondItem.string += pizzaCrustCost
            thirdItem.string += pizzaCrustCost
            fourthItem.string += pizzaCrustCost
            fifthItem.string += pizzaCrustCost
            sixthItem.string += pizzaCrustCost

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem, sixthItem)
            
            return crustOptions;
        default:
            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem, sixthItem)
            
            return crustOptions;
    }
    
}

function pizzaTypeOptions (pizzaSize){
    var crustOptions = []

    var firstItem = new listItem("0", "Choose a pizza");
    var secondItem = new listItem("boerewors_pizza", "Boerewors pizza");
    var thirdItem = new listItem("bbq_chicken_pizza", "BBQ Chicken pizza");
    var fourthItem = new listItem("pepperoni_pizza", "Pepperoni pizza");
    var fifthItem = new listItem("margharita_pizza", "Margharita pizza");
    var sixthItem = new listItem("beef_steak_pizza", "Beef Steak pizza");
    var seventhItem = new listItem("hawaiian_pizza", "Hawaiian pizza");
    var eighthItem = new listItem("veggie_pizza", "Veggie pizza");

    let pizzaTypeCost = ""

    switch (pizzaSize) {
        case "0":
            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem, sixthItem, seventhItem, eighthItem)
            
            return crustOptions;
        case "small_pizza":
            pizzaTypeCost = "  ->  ksh " + smallPizzaTypeCost.toString()

            
            secondItem.string += pizzaTypeCost;
            thirdItem.string += pizzaTypeCost;
            fourthItem.string += pizzaTypeCost;
            fifthItem.string += pizzaTypeCost;
            sixthItem.string += pizzaTypeCost;
            seventhItem.string += pizzaTypeCost;
            eighthItem.string += pizzaTypeCost;

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem, sixthItem, seventhItem, eighthItem)
            
            return crustOptions;
        case "medium_pizza":
            pizzaTypeCost = "  ->  ksh " + mediumPizzaTypeCost.toString()

            
            secondItem.string += pizzaTypeCost;
            thirdItem.string += pizzaTypeCost;
            fourthItem.string += pizzaTypeCost;
            fifthItem.string += pizzaTypeCost;
            sixthItem.string += pizzaTypeCost;
            seventhItem.string += pizzaTypeCost;
            eighthItem.string += pizzaTypeCost;

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem, sixthItem, seventhItem, eighthItem)
            
            return crustOptions;
        case "large_pizza":
            pizzaTypeCost = "  ->  ksh " + largePizzaTypeCost.toString()

            
            secondItem.string += pizzaTypeCost;
            thirdItem.string += pizzaTypeCost;
            fourthItem.string += pizzaTypeCost;
            fifthItem.string += pizzaTypeCost;
            sixthItem.string += pizzaTypeCost;
            seventhItem.string += pizzaTypeCost;
            eighthItem.string += pizzaTypeCost;

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem, sixthItem, seventhItem, eighthItem)
            
            return crustOptions;
        case "x_large_pizza":
            pizzaTypeCost = "  ->  ksh " + x_largePizzaTypeCost.toString()

            
            secondItem.string += pizzaTypeCost;
            thirdItem.string += pizzaTypeCost;
            fourthItem.string += pizzaTypeCost;
            fifthItem.string += pizzaTypeCost;
            sixthItem.string += pizzaTypeCost;
            seventhItem.string += pizzaTypeCost;
            eighthItem.string += pizzaTypeCost;

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem, sixthItem, seventhItem, eighthItem)
            
            return crustOptions;
        default:
            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem, sixthItem, seventhItem, eighthItem)
            
            return crustOptions;
    }
    
}

function pizzaExtraCheeseOptions (pizzaSize){
    var crustOptions = []

    var firstItem = new listItem("0", "Cheese up your pizza");
    var secondItem = new listItem("cheddar_cheese", "Cheddar cheese");
    var thirdItem = new listItem("feta_cheese", "Feta cheese");
    var fourthItem = new listItem("mozzarella_cheese", "Mozzarella cheese");

    let pizzaExtraCost = ""

    switch (pizzaSize) {
        case "0":
            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem)
            
            return crustOptions;
        case "small_pizza":
            pizzaExtraCost = "  ->  ksh " + smallExtraCost.toString()

            
            secondItem.string += pizzaExtraCost;
            thirdItem.string += pizzaExtraCost;
            fourthItem.string += pizzaExtraCost;

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem)
            
            return crustOptions;
        case "medium_pizza":
            pizzaExtraCost = "  ->  ksh " + mediumExtraCost.toString()

            
            secondItem.string += pizzaExtraCost;
            thirdItem.string += pizzaExtraCost;
            fourthItem.string += pizzaExtraCost;

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem)
            
            return crustOptions;
        case "large_pizza":
            pizzaExtraCost = "  ->  ksh " + largeExtraCost.toString()

            
            secondItem.string += pizzaExtraCost;
            thirdItem.string += pizzaExtraCost;
            fourthItem.string += pizzaExtraCost;

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem)
            
            return crustOptions;
        case "x_large_pizza":
            pizzaExtraCost = "  ->  ksh " + x_largeExtraCost.toString()

            
            secondItem.string += pizzaExtraCost;
            thirdItem.string += pizzaExtraCost;
            fourthItem.string += pizzaExtraCost;

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem)
            
            return crustOptions;
        default:
            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem, sixthItem, seventhItem, eighthItem)
            
            return crustOptions;
    }
    
}

function pizzaExtraMeatOptions (pizzaSize){
    var crustOptions = []

    var firstItem = new listItem("0", "Add extra meat");
    var secondItem = new listItem("boerewors", "Boerewors");
    var thirdItem = new listItem("pepperoni", "Pepperoni");
    var fourthItem = new listItem("chicken", "Chicken");
    var fifthItem = new listItem("beef_steak", "Beef Steak");

    let pizzaExtraCost = ""

    switch (pizzaSize) {
        case "0":
            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem)
            
            return crustOptions;
        case "small_pizza":
            pizzaExtraCost = "  ->  ksh " + smallExtraCost.toString()

            
            secondItem.string += pizzaExtraCost;
            thirdItem.string += pizzaExtraCost;
            fourthItem.string += pizzaExtraCost;
            fifthItem.string += pizzaExtraCost;

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem)
            
            return crustOptions;
        case "medium_pizza":
            pizzaExtraCost = "  ->  ksh " + mediumExtraCost.toString()

            secondItem.string += pizzaExtraCost;
            thirdItem.string += pizzaExtraCost;
            fourthItem.string += pizzaExtraCost;
            fifthItem.string += pizzaExtraCost;

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem)
            
            return crustOptions;
        case "large_pizza":
            pizzaExtraCost = "  ->  ksh " + largeExtraCost.toString()

            
            secondItem.string += pizzaExtraCost;
            thirdItem.string += pizzaExtraCost;
            fourthItem.string += pizzaExtraCost;
            fifthItem.string += pizzaExtraCost;

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem)
            
            return crustOptions;
        case "x_large_pizza":
            pizzaExtraCost = "  ->  ksh " + x_largeExtraCost.toString()

            
            secondItem.string += pizzaExtraCost;
            thirdItem.string += pizzaExtraCost;
            fourthItem.string += pizzaExtraCost;
            fifthItem.string += pizzaExtraCost;

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem)
            
            return crustOptions;
        default:
            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem)
            
            return crustOptions;
    }
    
}

function pizzaExtraVeggieOptions (pizzaSize){
    var crustOptions = []

    var firstItem = new listItem("0", "Add extra veggies");
    var secondItem = new listItem("green_peppers", "Green Peppers");
    var thirdItem = new listItem("red_peppers", "Red Peppers");
    var fourthItem = new listItem("red_onions", "Red Onions");
    var fifthItem = new listItem("mushrooms", "Mushrooms");

    let pizzaExtraCost = ""

    switch (pizzaSize) {
        case "0":
            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem)
            
            return crustOptions;
        case "small_pizza":
            pizzaExtraCost = "  ->  ksh " + smallExtraCost.toString()

            
            secondItem.string += pizzaExtraCost;
            thirdItem.string += pizzaExtraCost;
            fourthItem.string += pizzaExtraCost;
            fifthItem.string += pizzaExtraCost;

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem)
            
            return crustOptions;
        case "medium_pizza":
            pizzaExtraCost = "  ->  ksh " + mediumExtraCost.toString()

            
            secondItem.string += pizzaExtraCost;
            thirdItem.string += pizzaExtraCost;
            fourthItem.string += pizzaExtraCost;
            fifthItem.string += pizzaExtraCost;

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem)
            
            return crustOptions;
        case "large_pizza":
            pizzaExtraCost = "  ->  ksh " + largeExtraCost.toString()

            
            secondItem.string += pizzaExtraCost;
            thirdItem.string += pizzaExtraCost;
            fourthItem.string += pizzaExtraCost;
            fifthItem.string += pizzaExtraCost;

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem)
            
            return crustOptions;
        case "x_large_pizza":
            pizzaExtraCost = "  ->  ksh " + x_largeExtraCost.toString()

            
            secondItem.string += pizzaExtraCost;
            thirdItem.string += pizzaExtraCost;
            fourthItem.string += pizzaExtraCost;
            fifthItem.string += pizzaExtraCost;

            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem)
            
            return crustOptions;
        default:
            crustOptions.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem)
            
            return crustOptions;
    }
    
}

function listItem (value, string){
    this.value = value;
    this.string = string;
}

// This is the constructor for a single pizza
function Pizza (size, crust, type, extra_cheese, extra_meat, extra_veggie, side){
    this.size = size;
    this.side = side;
    this.crust = crust;
    this.type = type;
    this.extra_cheese = extra_cheese;
    this.extra_meat = extra_meat;
    this.extra_veggie = extra_veggie;
}

