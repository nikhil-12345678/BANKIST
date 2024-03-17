'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
const balance = accounts.forEach(function (accs) {
  accs.balance = accs.movements.reduce((acc, mov) => (acc += mov), 0);
});
let myaccount;
accounts.find(acc => acc.userName === inputLoginUsername.value);
accounts.find(acc => acc.userName === Number(inputLoginPin.value));
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  const abc = accounts.find(acc => acc.userName === inputLoginUsername.value);
  const def = accounts.find(acc => acc.pin === Number(inputLoginPin.value));
  console.log(abc);
  if (abc && def && abc == def) {
    containerApp.style.opacity = 100;
    displayBalance(abc.movements);
    displayMovements(abc.movements);
    myaccount = abc;
  }
});

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayBalance = function (movements) {
  const deposit = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => (acc += mov), 0);
  labelSumIn.textContent = `${deposit}`;

  const withdrawal = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => (acc += mov), 0);

  labelSumOut.textContent = `${Math.abs(withdrawal)}`;
  labelBalance.textContent = deposit + withdrawal;
};

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  let loanAmount = 0.1 * Number(inputLoanAmount.value);
  const apply = myaccount.movements.find(mov => mov > loanAmount);
  if (loanAmount && apply) {
    console.log(`hey`);
    myaccount.movements.push(10 * loanAmount);
    myaccount.balance += 10 * loanAmount;
  }
});

/////////////////////////////////////////////////
const displayMovements = function (movements) {
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? `deposit` : `withdrawal`;
    const html = ` <div class="movements__row">
  <div class="movements__type movements__type--${type}"> ${i} ${type}</div>

  <div class="movements__value">${mov}</div>
</div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// const movementsUsd = movements.map(function (mov) {
//   return mov * 1.1;
// });
// console.log(movementsUsd);
const movementsUsd = [];
for (const mov of movements) {
  movementsUsd.push(mov);
}
console.log(accounts);

const display = accounts.forEach(function (accs) {
  accs.userName = accs.owner
    .toLowerCase()
    .split(' ')
    .map(function (i) {
      return i[0];
    })
    .join('');
  console.log(accs);
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const reciever = accounts.find(acc => acc.userName === inputTransferTo.value);
  const amount = Number(inputTransferAmount.value);

  if (reciever && amount < myaccount.balance) {
    myaccount.movements.push(-amount);
    reciever.movements.push(amount);
    myaccount.balance = myaccount.balance - amount;
    reciever.balance = reciever.balance + amount;
    displayBalance(myaccount.movements);
    displayMovements(myaccount.movements);
  }
});

btnSort.addEventListener('click', function () {
  myaccount.movements.sort((a, b) => {
    if (a > b) return 1;
    else return -1;
  });
  displayMovements(myaccount.movements);
});
