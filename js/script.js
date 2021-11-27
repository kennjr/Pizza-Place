$(document).ready(() => {

    resetAllOptionLists(0);

    document.getElementById("pizza_sizes_dropdown_list").addEventListener("change", (e) => {
        var pizzaSize = $("#pizza_sizes_dropdown_list").val()
        console.log(pizzaSize)
        var checkPizzaSize = validateOrder(pizzaSize, "0")
        var mCrustOptions = pizzaCrustOptions(pizzaSize);
                mCrustOptions.forEach((value, index) => {
                    var myDLLField = $('select[id="crusts_dropdown_list"]');
                    myDLLField.find('option[value="'+value.value+'"]').text(""+value.string+"");   
                })
    })
    $("#pizza_sizes_dropdown_list").bind( "slidechange", function(event, ui) {
        // use ui.value for the value
        
    });

    $(".order_form").submit((e) => {
        e.preventDefault();

        var pizzaSize = $("#pizza_sizes_dropdown_list").val()
        // var pizzaCrust = $("#crusts_dropdown_list").val()
        // var pizzaType = $("#pizza_types_dropdown_list").val()
        // var extraCheese = $("#extra_cheese_dropdown_list").val()
        // var extraMeat = $("#extra_meat_dropdown_list").val()
        // var extraVeggie = $("#extra_veggies_dropdown_list").val()
        // var side = $("#sides_dropdown_list").val()



        // var mPizza = new Pizza(pizzaSize, pizzaCrust, pizzaType, extraCheese, extraMeat, extraVeggie, side)
        
        
        
    
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
            return 450;
        case "medium_pizza":
            return 600;
        case "large_pizza":
            return 800;
        case "x_large_pizza":
            return 1000;
        default:
            return 0;
    }
}

function pizzaCrustOptions (pizzaSize){
    var crustOptions = []
    switch (pizzaSize) {
        case "0":
            var firstItem = new listItem("0", "Choose a crust");
            var secondtItem = new listItem("crispy_crust", "Crispy");
            var thirdItem = new listItem("thick_crust", "Thick");
            var fourthItem = new listItem("stuffed_crust", "Stuffed");
            var fifthtItem = new listItem("thin_crust", "Thin");
            var sixthItem = new listItem("gluten_free_crust", "Gluten free");

            crustOptions.push(firstItem, secondtItem, thirdItem, fourthItem, fifthtItem, sixthItem)
            
            return crustOptions;
        case "small_pizza":
            var firstItem = new listItem("0", "Choose a crust");
            var secondtItem = new listItem("crispy_crust", "Crispy   ->  ksh 400");
            var thirdItem = new listItem("thick_crust", "Thick   ->  ksh 400");
            var fourthItem = new listItem("stuffed_crust", "Stuffed   ->  ksh 400");
            var fifthtItem = new listItem("thin_crust", "Thin   ->  ksh 400");
            var sixthItem = new listItem("gluten_free_crust", "Gluten free   ->  ksh 400");

            crustOptions.push(firstItem, secondtItem, thirdItem, fourthItem, fifthtItem, sixthItem)
            
            return crustOptions;
        case "medium_pizza":
            var firstItem = new listItem("0", "Choose a crust");
            var secondtItem = new listItem("crispy_crust", "Crispy   ->  ksh 500");
            var thirdItem = new listItem("thick_crust", "Thick   ->  ksh 500");
            var fourthItem = new listItem("stuffed_crust", "Stuffed   ->  ksh 500");
            var fifthtItem = new listItem("thin_crust", "Thin   ->  ksh 500");
            var sixthItem = new listItem("gluten_free_crust", "Gluten free   ->  ksh 500");

            crustOptions.push(firstItem, secondtItem, thirdItem, fourthItem, fifthtItem, sixthItem)
            
            return crustOptions;
        case "large_pizza":

            var firstItem = new listItem("0", "Choose a crust");
            var secondtItem = new listItem("crispy_crust", "Crispy   ->  ksh 600");
            var thirdItem = new listItem("thick_crust", "Thick   ->  ksh 600");
            var fourthItem = new listItem("stuffed_crust", "Stuffed   ->  ksh 600");
            var fifthtItem = new listItem("thin_crust", "Thin   ->  ksh 600");
            var sixthItem = new listItem("gluten_free_crust", "Gluten free   ->  ksh 600");

            crustOptions.push(firstItem, secondtItem, thirdItem, fourthItem, fifthtItem, sixthItem)
            
            return crustOptions;
        case "x_large_pizza":

            var firstItem = new listItem("0", "Choose a crust");
            var secondtItem = new listItem("crispy_crust", "Crispy   ->  ksh 700");
            var thirdItem = new listItem("thick_crust", "Thick   ->  ksh 700");
            var fourthItem = new listItem("stuffed_crust", "Stuffed   ->  ksh 700");
            var fifthtItem = new listItem("thin_crust", "Thin   ->  ksh 700");
            var sixthItem = new listItem("gluten_free_crust", "Gluten free   ->  ksh 700");

            crustOptions.push(firstItem, secondtItem, thirdItem, fourthItem, fifthtItem, sixthItem)
            
            return crustOptions;
        default:
            var firstItem = new listItem("0", "Choose a crust");
            var secondtItem = new listItem("crispy_crust", "Crispy");
            var thirdItem = new listItem("thick_crust", "Thick");
            var fourthItem = new listItem("stuffed_crust", "Stuffed");
            var fifthtItem = new listItem("thin_crust", "Thin");
            var sixthItem = new listItem("gluten_free_crust", "Gluten free");

            crustOptions.push(firstItem, secondtItem, thirdItem, fourthItem, fifthtItem, sixthItem)
            
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

