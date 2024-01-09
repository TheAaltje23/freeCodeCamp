const check = document.getElementById('check-btn');
const clear = document.getElementById('clear-btn');
const userInput = document.getElementById('user-input');
const result = document.getElementById('results-div');

// Check logic
const checkInput = () => {
    const par = document.createElement('p');
    par.className = 'results-text';

    if (userInput.value === "") {
        alert('Please provide a phone number');
        return;
    } else if (telephoneCheck(userInput.value)) {
        par.textContent = `Valid US number: ${userInput.value}`;
        par.style.color = '#00471B';
        userInput.value = "";
    } else {
        par.textContent += `Invalid US number: ${userInput.value}`;
        par.style.color = '#4D3800';
        userInput.value = "";
    };
    result.appendChild(par);
};

// Clear logic
const clearInput = () => {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    };
};

// Regex
const telephoneCheck = str => {
    const regex = /^(?:1|1\s)?(?:\([0-9]{3}\)|[0-9]{3})(?:-|\s)?(?:[0-9]{3})(?:-|\s)?(?:[0-9]{4})$/;
    return regex.test(str);
}

// Event Listeners
userInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        checkInput();
    };
});
check.addEventListener("click", checkInput);
clear.addEventListener("click", clearInput);