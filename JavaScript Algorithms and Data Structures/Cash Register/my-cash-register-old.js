const changeDue = document.getElementById("change-due");
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const cidMiddle = document.getElementById("cid-middle");
const total = document.getElementById("total");

const getRandomPrice = (min, max) => {
    return Math.random() * (max - min) + min;
};

let setPrice = Number(getRandomPrice(0, 50).toFixed(2));
let setCid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

const updateDom = () => {
    total.textContent = `Total: $${setPrice}`;

    const cidDetails = setCid.map((el) => `${el[0]}: $${el[1]}`);
    cidDetails.forEach((detail) => {
        const cidPar = document.createElement('p');
        cidPar.textContent = detail;
        cidMiddle.append(cidPar);
    });
};

const checkInput = () => {
    if (Number(cash.value) < setPrice) {
        clearTextContent();
        alert("Customer does not have enough money to purchase the item");
        return;
    } else if (Number(cash.value) === setPrice) {
        clearTextContent();
        noChangeNeeded();
    } else {
        clearTextContent();
        checkCashRegister(setPrice, Number(cash.value), setCid);
    };
    clearInput();
};

const checkCashRegister = (price, cash, cid) => {
    const totalCid = cid.reduce((sum, category) => sum + category[1], 0);
    const resultChange = [];
    const changeDif = cash - price;
    let change = cash - price;

    const currency = [
        {
            name: "ONE HUNDRED",
            amount: 100,
            availability: cid[8][1]
        },
        {
            name: "TWENTY",
            amount: 20,
            availability: cid[7][1]
        },
        {
            name: "TEN",
            amount: 10,
            availability: cid[6][1]
        },
        {
            name: "FIVE",
            amount: 5,
            availability: cid[5][1]
        },
        {
            name: "ONE",
            amount: 1,
            availability: cid[4][1]
        },
        {
            name: "QUARTER",
            amount: 0.25,
            availability: cid[3][1]
        },
        {
            name: "DIME",
            amount: 0.1,
            availability: cid[2][1]
        },
        {
            name: "NICKEL",
            amount: 0.05,
            availability: cid[1][1]
        },
        {
            name: "PENNY",
            amount: 0.01,
            availability: cid[0][1]
        }
    ];

    const result = [
        {
            status: "INSUFFICIENT_FUNDS",
            change: []
        },
        {
            status: "CLOSED",
            change: cid
        },
        {
            status: "OPEN",
            change: resultChange
        }
    ];

    currency.forEach((obj) => {
        let count = 0;
        while (change >= obj.amount && obj.availability > 0) {
            change = parseFloat(change.toFixed(2));
            count = parseFloat(count.toFixed(2));
            count += obj.amount;
            change -= obj.amount;
            obj.availability -= obj.amount;
        };
        if (count > 0 || change > obj.amount) {
            resultChange.push([obj.name, count]);
        };
    });

    if (totalCid >= changeDif && change === 0) {
        resultToDom(result[2]);
    } else if (totalCid === changeDif) {
        resultToDom(result[1]);
    } else {
        resultToDom(result[0]);
    };
};

const resultToDom = (result) => {
    const statusPar = document.createElement('p');
    statusPar.textContent = `Status: ${result.status}`;
    changeDue.append(statusPar);

    const resultChangeDetails = result.change.map((el) => `${el[0]}: $${el[1]}`);
    resultChangeDetails.forEach((detail) => {
        const changePar = document.createElement('p');
        changePar.textContent = detail;
        changeDue.append(changePar);
    });
};

const clearTextContent = () => {
    changeDue.textContent = "";
};

const noChangeNeeded = () => {
    changeDue.textContent = "No change due - customer paid with exact cash";
};

const clearInput = () => {
    cash.value = "";
};

// Event Listeners
window.addEventListener("load", updateDom);

purchaseBtn.addEventListener("click", checkInput);

cash.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkInput();
    };
});