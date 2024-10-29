// function removecontent(){
//     console.log("hello");
    
//     document.getElementById("inputBoxQn1").value = "";
// }

// function increase(){
//     let num =1;
//     document.getElementById('scaleInBox').value= num;
//     num =  num+1;
//     document.getElementById('scaleInBox').value=num;
//     console.log()
// }
// Function to increase the counter
function increase() {
    // Get the current value of the input box
    let inputBox = document.getElementById("scaleInBox");
    let currentValue = parseInt(inputBox.value) || 0;
    
    // Increase the value and update the input box
    inputBox.value = currentValue + 1;
}

// Function to decrease the counter
function decrease() {
    // Get the current value of the input box
    let inputBox = document.getElementById("scaleInBox");
    let currentValue = parseInt(inputBox.value) || 0;

    // Decrease the value, but prevent it from going below 0
    if (currentValue > 0) {
        inputBox.value = currentValue - 1;
    }
}
function addFn() {
    const divEle = document.getElementById("QuestionBox");
    divEle.innerHTML += `
    <div class="question1">
                    <input class="inputBoxQn1" type="text" placeholder="Enter Question">
                    <i class="fa-solid fa-trash"></i>

                </div>

`;
}


