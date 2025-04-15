let transactions = [];

function addTransaction() {
    const type = document.getElementById("transactionType").value;
    const date = document.getElementById("transactionDate").value;
    const description = document.getElementById("transactionDescription").value;
    const category = document.getElementById("transactionCategory").value;
    const amount = parseFloat(document.getElementById("transactionAmount").value);

    if (!date || !description || isNaN(amount)) {
        alert("Please enter valid details.");
        return;
    }

    const transaction = { type, date, description, category, amount };
    transactions.push(transaction);
    updateTransactionList();
    updateSummary();
}

function updateTransactionList() {
    const list = document.getElementById("transactionList");
    list.innerHTML = "";

    transactions.forEach((transaction, index) => {
        const li = document.createElement("li");
        li.className = `list-group-item ${transaction.type === "income" ? "transaction-income" : "transaction-expense"}`;
        li.innerHTML = `
            ${transaction.date} - ${transaction.description} - ${transaction.category} - $${transaction.amount.toFixed(2)}
            <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${index})">X</button>
        `;
        list.appendChild(li);
    });
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateTransactionList();
    updateSummary();
}

function updateSummary() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });

    document.getElementById("totalIncome").innerText = `$${totalIncome.toFixed(2)}`;
    document.getElementById("totalExpense").innerText = `$${totalExpense.toFixed(2)}`;
}
