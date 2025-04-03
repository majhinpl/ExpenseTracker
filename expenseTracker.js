document.addEventListener("DOMContentLoaded", () => {
  // grab elements
  const expeseDate = document.getElementById("date");
  const expeseAmount = document.getElementById("amount");
  const expeseDesc = document.getElementById("desc");
  const expeseCateg = document.getElementById("categ");
  const submitBtn = document.querySelector(".submit");

  const renderExpenseItem = document.querySelector(".render tbody");
  const totalExpensesAmount = document.querySelector(".total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  let totalAmount = totalCalculate();

  submitBtn.addEventListener("click", () => {
    const date = expeseDate.value.trim();
    const amount = parseFloat(expeseAmount.value.trim());
    const categ = expeseCateg.value.trim();
    const desc = expeseDesc.value.trim();

    if (
      date !== "" &&
      !isNaN(amount) &&
      amount > 0 &&
      categ !== "" &&
      desc !== ""
    ) {
      const newExpenses = {
        id: Date.now(),
        date,
        amount,
        categ,
        desc,
      };

      expenses.push(newExpenses);
      saveToLocalStorage();
      renderExpenseList();
      updateTotal();

      // clear input
      expeseDate.value = "";
      expeseCateg.value = "";
      expeseDesc.value = "";
      expeseAmount.value = "";
    }
  });

  function renderExpenseList() {
    renderExpenseItem.innerHTML = "";
    expenses.forEach((expense) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
      <td>${expense.date}</td>
      <td>${expense.amount}</td>
      <td>${expense.desc}</td>
      <td>${expense.categ}</td>
      <td data-id="${expense.id}">
        <button class="secondary-btn" data-id="${expense.id}" >
          Delete
        </button>          
      </td>    
    `;

      renderExpenseItem.appendChild(tr);
    });
  }

  // Total Expense calculate
  function totalCalculate() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  // Total amount update
  function updateTotal() {
    totalAmount = totalCalculate();
    if (totalExpensesAmount) {
      totalExpensesAmount.textContent = `      
      Total Expenses Amount : ${totalAmount.toFixed(2)}      
      `;
    }
  }

  // save to local storage
  function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  renderExpenseItem.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const expenseId = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((expense) => expense.id !== expenseId);

      saveToLocalStorage();
      renderExpenseList();
      updateTotal();
    }
  });

  renderExpenseList();

  updateTotal();
});
