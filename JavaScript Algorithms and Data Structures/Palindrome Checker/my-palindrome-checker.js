const checkButton = document.getElementById("check-btn");
const textInput = document.getElementById("text-input");
const resultDiv = document.getElementById("result");
const resultP = document.getElementById("result-p");

const checkInput = () => {
    if (textInput.value === "") {
        alert("Please input a value");
    } else {
        output();
    }
}

const output = () => {
    if (palindrome(textInput.value) === true) {
        resultDiv.classList.remove("hidden");
        resultP.innerHTML = `<strong>${textInput.value}</strong> is a palindrome`;
        textInput.value = "";
    } else {
        resultDiv.classList.remove("hidden");
        resultP.innerHTML = `<strong>${textInput.value}</strong> is not a palindrome`;
        textInput.value = "";
    }
}

const palindrome = (str) => {
    // Only alphanumeric characters and lowercased
    const regex = /[a-zA-Z0-9]/g;
    const arr = str.toLowerCase().match(regex);
    const length = arr.length;

    // Check even words
    if (length % 2 == 0) {
        const leftSide = arr.slice(0, length / 2).join('');
        const rightSide = arr.slice(length / 2).reverse().join('');
        if (leftSide === rightSide) {
            return true;
        } else {
            return false;
        }
        // Check uneven words
    } else {
        const leftSide = arr.slice(0, length / 2 + 1).join('');
        const rightSide = arr.slice(length / 2).reverse().join('');
        if (leftSide === rightSide) {
            return true;
        } else {
            return false;
        }
    }
}

checkButton.addEventListener("click", checkInput);
textInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        checkInput();
    }
});