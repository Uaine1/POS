/* Adding Order*/
var clickCount = 0;

function add_order() {
    if (clickCount >= 3) {
        alert('You can only add up to 3 food items.');
        return;
    }

    var interactableDiv = document.querySelector('.interactable');

    var form = document.createElement('form');
    form.className = 'adding_removing'; // Added class name to the new form

    var choiceParagraph = document.createElement('p');
    choiceParagraph.className = 'choice';
    choiceParagraph.textContent = 'Choice';
    
    var selectMenu = document.createElement('select');
    selectMenu.name = 'menu';
    selectMenu.id = 'menu';
    
    var menuOptions = ['Burger', 'Fries', 'Fishbol', 'Kikiam'];
    menuOptions.forEach(function(optionText) {
        var option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        selectMenu.appendChild(option);
    });

    var quantityParagraph = document.createElement('p');
    quantityParagraph.className = 'quantity';
    quantityParagraph.textContent = 'Quantity';

    var quantityInput = document.createElement('input');
    quantityInput.type = 'text';
    quantityInput.id = 'quantity';
    quantityInput.name = 'quantity';

    form.appendChild(choiceParagraph);
    form.appendChild(selectMenu);
    form.appendChild(quantityParagraph);
    form.appendChild(quantityInput);

    interactableDiv.insertBefore(form, interactableDiv.children[1]); // Insert the new form before the second form

    clickCount++;

    // Optional: Scroll to the newly added form
    form.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    
}


/* Removing Order */
function remove_order() {
    if (clickCount <= 0) {
        alert('No food items to remove.');
         return;
     }
    
     var interactableDiv = document.querySelector('.interactable');
     var forms = interactableDiv.querySelectorAll('.adding_removing'); // Select all forms with the class "adding_removing"
    
    if (forms.length > 1) { // Check if there are more than one form (excluding the original form)
        interactableDiv.removeChild(forms[forms.length - 1]); // Remove the last added form
        clickCount--;
    } else {
        alert('You cannot remove the original order form.');
    }
}

/* Finalizing Order */
// Just to see what is the total amount of the items 

function finalize_order() {
    var interactableDiv = document.querySelector('.interactable');
    var originalForm = interactableDiv.querySelector('.adding_removing'); // Select the original form

    var totalPrice = 0;

    // Calculate total price for the original form
    var originalItem = originalForm.querySelector('#menu').value;
    var originalQuantity = parseInt(originalForm.querySelector('#quantity').value);
    totalPrice += getPrice(originalItem) * originalQuantity;

    // Calculate total price for the additional forms
    var additionalForms = interactableDiv.querySelectorAll('.adding_removing');
    for (var i = 1; i < additionalForms.length; i++) { // Start from index 1 to skip the original form
        var item = additionalForms[i].querySelector('#menu').value;
        var quantity = parseInt(additionalForms[i].querySelector('#quantity').value);
        totalPrice += getPrice(item) * quantity;
    }

    alert('Total price: ' + totalPrice + ' pesos');
}

/* Paying Out */
// The final computation shows your change 
function pay_out() {
    var cashInput = document.getElementById('cash').value;
    var totalAmount = getTotalAmount();
    
    // Check if cash input is valid
    if (isNaN(cashInput) || cashInput === "") {
        alert("Please enter a valid cash amount.");
        return;
    }

    var change = parseFloat(cashInput) - totalAmount;

    if (change < 0) {
        alert("Insufficient cash. Please provide more cash.");
    } else {
        alert("Change: " + change.toFixed(2) + " pesos");
    }
}

function pay_out() {
    var cashInput = document.getElementById('cash').value;
    var totalAmount = getTotalAmount();
    
    // Check if cash input is valid
    if (isNaN(cashInput) || cashInput === "") {
        alert("Please enter a valid cash amount.");
        return;
    }

    var change = parseFloat(cashInput) - totalAmount;

    if (change < 0) {
        alert("Insufficient cash. Please provide more cash.");
    } else {
        alert("Change: " + change.toFixed(2) + " pesos");
    }
}

function getTotalAmount() {
    var interactableDiv = document.querySelector('.interactable');
    var originalForm = interactableDiv.querySelector('.adding_removing'); // Select the original form

    var totalPrice = 0;

    // Calculate total price for the original form
    var originalItem = originalForm.querySelector('#menu').value;
    var originalQuantity = parseInt(originalForm.querySelector('#quantity').value);
    totalPrice += getPrice(originalItem) * originalQuantity;

    // Calculate total price for the additional forms
    var additionalForms = interactableDiv.querySelectorAll('.adding_removing');
    for (var i = 1; i < additionalForms.length; i++) { // Start from index 1 to skip the original form
        var item = additionalForms[i].querySelector('#menu').value;
        var quantity = parseInt(additionalForms[i].querySelector('#quantity').value);
        totalPrice += getPrice(item) * quantity;
    }

    return totalPrice;
}

/* The Prices of Each Item*/
function getPrice(item) {
    switch (item) {
        case 'Burger':
            return 60;
        case 'Fries':
            return 50;
        case 'Fishbol':
            return 20;
        case 'Kikiam':
            return 25;
        default:
            return 0;
    }
}

/*Reseting The Whole System*/
function reset_order() {
    var interactableDiv = document.querySelector('.interactable');

    // Clear the cash input field
    var cashInput = document.getElementById('cash');
    cashInput.value = '';

    // Remove all added food item forms except the original one
    var additionalForms = interactableDiv.querySelectorAll('.adding_removing');
    for (var i = 1; i < additionalForms.length; i++) {
        interactableDiv.removeChild(additionalForms[i]);
    }

    // Reset click count
    clickCount = 0;
}