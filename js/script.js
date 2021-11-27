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


$(document).ready(() => {

    resetAllOptionLists(0);
    

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
        
        
        
    
    })
    
})

function resetAllOptionLists(index){
    $('.dropdown_list').prop('selectedIndex', index);
    return;
}

var validateOrder = (pizzaItem, nonValue) => {
    if (pizzaItem == nonValue){
        return false;
    }
    else{
        return true;
    }
}

function billPizza(pizza) {
    var total = 0
    var crustCost = pizza.getCrustCost();
    if (crustCost > 0) {
        // Add the cost of the crust to the total
        total += crustCost
    }

    // check if th

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
    var thirdItem = new listItem("bbq_chicken_pizza", "Chicken BBQ pizza");
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

