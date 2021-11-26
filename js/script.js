$(document).ready(() => {

    $(".order_form").submit((e) => {
        e.preventDefault();

    })

})

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

