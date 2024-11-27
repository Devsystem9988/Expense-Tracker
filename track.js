const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const history = document.getElementById("history");
const form = document.getElementById("transaction-form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");

let transactions = [];

// Update balance, income, and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const incomeTotal = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  const expenseTotal = (
    amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  income.innerText = `+$${incomeTotal}`;
  expense.innerText = `-$${expenseTotal}`;
}

// Add transaction to the list
function addTransactionDOM(transaction) {
  const sign = transaction.amount > 0 ? "+" : "-";
  const item = document.createElement("li");
  item.classList.add(transaction.amount > 0 ? "plus" : "minus");

  item.innerHTML = `
    ${transaction.description} <span>${sign}$${Math.abs(
    transaction.amount
  ).toFixed(2)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  history.appendChild(item);
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  init();
}

// Handle form submission
form.addEventListener("submit", e => {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    description: description.value,
    amount: +amount.value,
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();

  description.value = "";
  amount.value = "";
});

// Initialize app
function init() {
  history.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();
