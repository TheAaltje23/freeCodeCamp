const input = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById('output');
const outputText = document.getElementById("output-text");

const checkInput = () => {
    if (input.value === "") {
        output.classList.remove("hidden", "output-correct");
        output.classList.add("output-error");
        outputText.textContent = "Please enter a valid number";
    } else if (input.value < 1) {
        output.classList.remove("hidden", "output-correct");
        output.classList.add("output-error");
        outputText.textContent = "Please enter a number greater than or equal to 1";
    } else if (input.value > 3999) {
        output.classList.remove("hidden", "output-correct");
        output.classList.add("output-error");
        outputText.textContent = "Please enter a number less than or equal to 3999";
    } else {
        output.classList.remove("hidden", "output-error");
        output.classList.add("output-correct");
        outputText.textContent = `${convertToRoman(input.value)}`;
    }
};

function convertToRoman(num) {
    let result = "";

    const romanNumArr = [
        {
            roman: "M",
            numeral: 1000
        },
        {
            roman: "CM",
            numeral: 900
        },
        {
            roman: "D",
            numeral: 500
        },
        {
            roman: "CD",
            numeral: 400
        },
        {
            roman: "C",
            numeral: 100
        },
        {
            roman: "XC",
            numeral: 90
        },
        {
            roman: "L",
            numeral: 50
        },
        {
            roman: "XL",
            numeral: 40
        },
        {
            roman: "X",
            numeral: 10
        },
        {
            roman: "IX",
            numeral: 9
        },
        {
            roman: "V",
            numeral: 5
        },
        {
            roman: "IV",
            numeral: 4
        },
        {
            roman: "I",
            numeral: 1
        },
    ];

    romanNumArr.forEach((obj) => {
        while (num >= obj.numeral) {
            result += (obj.roman);
            num -= obj.numeral;
        }
    });

    return result;
};

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkInput();
    }
});
convertBtn.addEventListener("click", checkInput);