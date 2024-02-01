const changeDue: HTMLDivElement | null = document.getElementById(
  "change-due"
) as HTMLDivElement;
const cash: HTMLInputElement | null = document.getElementById(
  "cash"
) as HTMLInputElement;
const purchaseBtn: HTMLButtonElement | null = document.getElementById(
  "purchase-btn"
) as HTMLButtonElement;
const cidMiddle: HTMLDivElement | null = document.getElementById(
  "cid-middle"
) as HTMLDivElement;
const total: HTMLParagraphElement | null = document.getElementById(
  "total"
) as HTMLParagraphElement;

const getRandomPrice = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

let setPrice: number = Number(getRandomPrice(0, 50).toFixed(2));

type CurrencyItem = [string, number];

let setCid: CurrencyItem[] = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const updateDom = (): void => {
  total.textContent = `Total: $${setPrice}`;

  const cidDetails: string[] = setCid.map((el) => `${el[0]}: $${el[1]}`);
  cidDetails.forEach((detail: string) => {
    const cidPar: HTMLParagraphElement = document.createElement("p");
    cidPar.textContent = detail;
    cidMiddle.append(cidPar);
  });
};

const checkInput = (): void => {
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
  }
  clearInput();
};

interface ResultItem {
  status: "INSUFFICIENT_FUNDS" | "CLOSED" | "OPEN";
  change: any[];
}

const checkCashRegister = (
  price: number,
  cash: number,
  cid: CurrencyItem[]
) => {
  const totalCid = cid.reduce(
    (sum: number, category: CurrencyItem) => sum + category[1],
    0
  );
  const resultChange: any[] = [];
  const changeDif: number = cash - price;
  let change: number = cash - price;

  interface Currency {
    name: string;
    amount: number;
    availability: number;
  }

  const currency: Currency[] = [
    {
      name: "ONE HUNDRED",
      amount: 100,
      availability: cid[8][1],
    },
    {
      name: "TWENTY",
      amount: 20,
      availability: cid[7][1],
    },
    {
      name: "TEN",
      amount: 10,
      availability: cid[6][1],
    },
    {
      name: "FIVE",
      amount: 5,
      availability: cid[5][1],
    },
    {
      name: "ONE",
      amount: 1,
      availability: cid[4][1],
    },
    {
      name: "QUARTER",
      amount: 0.25,
      availability: cid[3][1],
    },
    {
      name: "DIME",
      amount: 0.1,
      availability: cid[2][1],
    },
    {
      name: "NICKEL",
      amount: 0.05,
      availability: cid[1][1],
    },
    {
      name: "PENNY",
      amount: 0.01,
      availability: cid[0][1],
    },
  ];

  const result: ResultItem[] = [
    {
      status: "INSUFFICIENT_FUNDS",
      change: [],
    },
    {
      status: "CLOSED",
      change: cid,
    },
    {
      status: "OPEN",
      change: resultChange,
    },
  ];

  currency.forEach((obj) => {
    let count = 0;
    while (change >= obj.amount && obj.availability > 0) {
      change = parseFloat(change.toFixed(2));
      count = parseFloat(count.toFixed(2));
      count += obj.amount;
      change -= obj.amount;
      obj.availability -= obj.amount;
    }
    if (count > 0 || change > obj.amount) {
      resultChange.push([obj.name, count]);
    }
  });

  if (totalCid >= changeDif && change === 0) {
    resultToDom(result[2]);
  } else if (totalCid === changeDif) {
    resultToDom(result[1]);
  } else {
    resultToDom(result[0]);
  }
};

const resultToDom = (result: ResultItem) => {
  const statusPar: HTMLParagraphElement = document.createElement("p");
  statusPar.textContent = `Status: ${result.status}`;
  changeDue.append(statusPar);

  const resultChangeDetails: string[] = result.change.map(
    (el) => `${el[0]}: $${el[1]}`
  );
  resultChangeDetails.forEach((detail: string) => {
    const changePar: HTMLParagraphElement = document.createElement("p");
    changePar.textContent = detail;
    changeDue.append(changePar);
  });
};

const clearTextContent = (): void => {
  changeDue.textContent = "";
};

const noChangeNeeded = (): void => {
  changeDue.textContent = "No change due - customer paid with exact cash";
};

const clearInput = (): void => {
  cash.value = "";
};

// Event Listeners
window.addEventListener("load", updateDom);

purchaseBtn.addEventListener("click", checkInput);

cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkInput();
  }
});
