$(document).ready(() => {

    resetAllOptionLists(0);

    document.getElementById("pizza_sizes_dropdown_list").addEventListener("change", (e) => {
        var pizzaSize = $("#pizza_sizes_dropdown_list").val()
        console.log(pizzaSize)
        var mCrustOptions = pizzaCrustOptions(pizzaSize);
        mCrustOptions.forEach((value, index) => {
            var myDLLField = $('select[id="crusts_dropdown_list"]');
            myDLLField.find('option[value="'+value.value+'"]').text(""+value.string+"");   
        })
    })
    
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

function pizzaTypeOptions (pizzaSize){
    var crustOptions = []
    var firstItem = new listItem("0", "Choose a pizza");
    var secondtItem = new listItem("boerewors_pizza", "Boerewors pizza");
    var thirdItem = new listItem("bbq_chicken_pizza", "Chicken BBQ pizza");
    var fourthItem = new listItem("pepperoni_pizza", "Pepperoni pizza");
    var fifthtItem = new listItem("margharita_pizza", "Margharita pizza");
    var seventhItem = new listItem("beef_steak_pizza", "Beef Steak pizza");
    var eighthItem = new listItem("hawaiian_pizza", "Hawaiian pizza");
    var ninthItem = new listItem("veggie_pizza", "Veggie pizza");
    switch (pizzaSize) {
        case "0":
            crustOptions.push(firstItem, secondtItem, thirdItem, fourthItem, fifthtItem, sixthItem, seventhItem, eighthItem, ninthItem)
            
            return crustOptions;
        case "small_pizza":
            let smallPizzaTypeCost = "  ->  ksh 800"

            firstItem.string = firstItem + smallPizzaTypeCost;
            secondtItem.string = secondtItem + smallPizzaTypeCost;
            thirdItem.string = thirdItem + smallPizzaTypeCost;
            fourthItem.string = fourthItem + smallPizzaTypeCost;
            fifthtItem.string = fifthtItem + smallPizzaTypeCost;
            sixthItem.string = sixthItem + smallPizzaTypeCost;
            seventhItem.string = seventhItem + smallPizzaTypeCost;
            eighthItem.string = eighthItem + smallPizzaTypeCost;

            crustOptions.push(firstItem, secondtItem, thirdItem, fourthItem, fifthtItem, sixthItem, seventhItem, eighthItem, ninthItem)
            
            return crustOptions;
        case "medium_pizza":
            let mediumPizzaTypeCost = "  ->  ksh 800"

            firstItem.string = firstItem + mediumPizzaTypeCost;
            secondtItem.string = secondtItem + mediumPizzaTypeCost;
            thirdItem.string = thirdItem + mediumPizzaTypeCost;
            fourthItem.string = fourthItem + mediumPizzaTypeCost;
            fifthtItem.string = fifthtItem + mediumPizzaTypeCost;
            sixthItem.string = sixthItem + mediumPizzaTypeCost;
            seventhItem.string = seventhItem + mediumPizzaTypeCost;
            eighthItem.string = eighthItem + mediumPizzaTypeCost;

            crustOptions.push(firstItem, secondtItem, thirdItem, fourthItem, fifthtItem, sixthItem, seventhItem, eighthItem, ninthItem)
            
            return crustOptions;
        case "large_pizza":
            let largePizzaTypeCost = "  ->  ksh 800"

            firstItem.string = firstItem + largePizzaTypeCost;
            secondtItem.string = secondtItem + largePizzaTypeCost;
            thirdItem.string = thirdItem + largePizzaTypeCost;
            fourthItem.string = fourthItem + largePizzaTypeCost;
            fifthtItem.string = fifthtItem + largePizzaTypeCost;
            sixthItem.string = sixthItem + largePizzaTypeCost;
            seventhItem.string = seventhItem + largePizzaTypeCost;
            eighthItem.string = eighthItem + largePizzaTypeCost;

            crustOptions.push(firstItem, secondtItem, thirdItem, fourthItem, fifthtItem, sixthItem, seventhItem, eighthItem, ninthItem)
            
            return crustOptions;
        case "x_large_pizza":
            let x_largePizzaTypeCost = "  ->  ksh 800"

            firstItem.string = firstItem + x_largePizzaTypeCost;
            secondtItem.string = secondtItem + x_largePizzaTypeCost;
            thirdItem.string = thirdItem + x_largePizzaTypeCost;
            fourthItem.string = fourthItem + x_largePizzaTypeCost;
            fifthtItem.string = fifthtItem + x_largePizzaTypeCost;
            sixthItem.string = sixthItem + x_largePizzaTypeCost;
            seventhItem.string = seventhItem + x_largePizzaTypeCost;
            eighthItem.string = eighthItem + x_largePizzaTypeCost;

            crustOptions.push(firstItem, secondtItem, thirdItem, fourthItem, fifthtItem, sixthItem, seventhItem, eighthItem, ninthItem)
            
            return crustOptions;
        default:
            crustOptions.push(firstItem, secondtItem, thirdItem, fourthItem, fifthtItem, sixthItem, seventhItem, eighthItem, ninthItem)
            
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

