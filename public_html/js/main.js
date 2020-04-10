
const SAVE_DIGIT = 2;

window.addEventListener('load', e => {
  //new PWAConfApp();
  registerSW(); 
});

async function registerSW() { 
  if ('serviceWorker' in navigator) { 
    try {
      await navigator.serviceWorker.register('./sw.js'); 
    } catch (e) {
      alert('ServiceWorker registration failed. Sorry about that.'); 
    }
  } else {
    document.querySelector('.alert').removeAttribute('hidden'); 
  }
}


function calculateMain()
{
    //ger required attributes
    var orderSubtotal = document.getElementById('orderSubtotal').value;
    var personSubtotalInput = document.getElementById('personSubtotal').value + "";//need split
    var personSubtotal = 0.0;
    var otherFeesInput = document.getElementById('otherFees').value + "";//need split
    var otherFees = 0.0;
    var otherFeesForThisPerson = 0.0;
    var discount = document.getElementById('promotion').value;
    var portion;
    var process;
    var result;

    //Split them and add up
    personSubtotalInput = personSubtotalInput.split('+');
    for (var i = 0, max = personSubtotalInput.length; i < max; i++)
    {
        //add splited value
        personSubtotal += parseFloat(personSubtotalInput[i]);
        //personSubtotal = parseFloat(personSubtotal);
    }


    //add up other fees
    otherFeesInput = otherFeesInput.split('+');
    for (var i = 0, max = otherFeesInput.length; i < max; i++)
    {
        otherFees += parseFloat(otherFeesInput[i]);
    }
    console.log(otherFees);
    //calculate portion
    if (isNaN(orderSubtotal))
    {
        result = "<strong class='red'>Please enter a number on Subtotal</strong>";
        process = "Error. Please enter number on subtotal.";
        document.getElementById('orderSubtotal').focus();
    } else if (isNaN(personSubtotal) || isNaN(otherFees))
    {
        result = "<strong class='red'>Please enter numbers in currect format. Only '+' operator is supported. </strong>";
        process = "Error. Please enter numbers in currect format. Only '+' operator is supported. ";
        document.getElementById('personSubtotal').focus();
    } else
    {

        if (personSubtotal <= orderSubtotal)
        {
            //this person pays less than total order, continue
            portion = personSubtotal / orderSubtotal;
            var showPercentage = portion * 100;
            showPercentage = showPercentage.toFixed(SAVE_DIGIT);

            process = "This person's expense occupies " + showPercentage + "% of the total order.\n";
            otherFeesForThisPerson = portion * otherFees;
            process += "Therefore, this person should pay " + showPercentage + "% of the total additional fees($" + otherFees + "), which is $" + otherFeesForThisPerson.toFixed(SAVE_DIGIT) + "\n";
            discount = parseFloat(discount);

            if (!isNaN(discount) && discount !== 0.0)
            {
                process += "There is a promotional discount of $" + discount + ". This person should be able to split discount as well.\n";
                discount = portion * discount;
                process += "Therefore, $" + discount + " will be substracted from the total of this person. (" + showPercentage + "%)\n";
                result = personSubtotal + otherFeesForThisPerson - discount;
                result = result.toFixed(SAVE_DIGIT);
                process += "In summary, what he has to pay =  his initial amount of $" + personSubtotal + " + aditional fee of $" + otherFeesForThisPerson.toFixed(SAVE_DIGIT) + " - promotional discount of $" + discount.toFixed(SAVE_DIGIT) + " = $" + result;
            } else
            {
                result = personSubtotal + otherFeesForThisPerson;
                result = result.toFixed(SAVE_DIGIT);
                process += "In summary, what he has to pay =  his initial amount of $" + personSubtotal + " + aditional fee of $" + otherFeesForThisPerson.toFixed(SAVE_DIGIT) + " = $" + result;

            }
            result = "<h4>&#128512; This person has to pay $<strong><mark>" + result +"</mark></strong></h4>";


        } else
        {
            //math does not add up.
            result = "<strong class='red'>Math error. This person is paying more than the total of order.</strong>";
            process = "Math error. This person is paying $" + personSubtotal + " but the subtotal of the order is $" + orderSubtotal;
        }
    }
    ///output///
    document.getElementById('result').innerHTML = result;
    document.getElementById('process').innerHTML = process;
    document.getElementById('resultDiv').style.setProperty("display", "inline");
//    document.getElementById('resultDiv').style.defineProperty("visibility","visiable");
    //document.getElementById('resultDiv').class -= "hide";
}

