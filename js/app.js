"use strict";

let startBtn              = document.getElementById('start'),

    budgetValue           = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue        = document.getElementsByClassName('daybudget-value')[0],
    levelValue            = document.getElementsByClassName('level-value')[0],
    expensesValue         = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue           = document.getElementsByClassName('income-value')[0],
    monthSavingsValue     = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue      = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem          = document.getElementsByClassName('expenses-item'),
    
    expensesBtn           = document.getElementsByTagName('button')[0],
    optionalExpensesBtn   = document.getElementsByTagName('button')[1],
    countBudgetBtn        = document.getElementsByTagName('button')[2],

    optionalExpensesItem  = document.querySelectorAll('.optionalexpenses-item'),

    chooseIncome          = document.querySelector('.choose-income'),
    checkSavings          = document.querySelector('#savings'),
    chooseSum             = document.querySelector('.choose-sum'),
    choosePercent         = document.querySelector('.choose-percent'),
    yearValue             = document.querySelector('.year-value'),
    monthValue            = document.querySelector('.month-value'),
    dayValue              = document.querySelector('.day-value');

let money, time, opEx;

let obj = {
    budget: money,
    timeData: time,
    expenses : {},
    optionalExpenses: {},
    income : [],
    savings: false
};

startBtn.addEventListener('click', function() {
    time  = prompt ("Введите дату в формате YYYY-MM-DD");
    money = +prompt ("Ваш бюджет на месяц?");

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt ("Ваш бюджет на месяц?");
    }
    obj.budget          = money;
    obj.timeData        = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value         = new Date(Date.parse(time)).getFullYear();
    monthValue.value        = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value          = new Date(Date.parse(time)).getDate();
});

expensesBtn.addEventListener('click', function() {
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
        if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null
            && a != '' && b != '' && a.length < 50) {
            console.log("done");
            obj.expenses[a] = b;
            sum+= +b;
        }else {
            i = i - 1;
        }
    }
    expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function(){
    for (let i = 0; i < optionalExpensesItem.length; i++){
        opEx = optionalExpensesItem[i].value;
        obj.optionalExpenses[i] = opEx;
        optionalExpensesValue.textContent += obj.optionalExpenses[i] + ' ';
    }
});

countBudgetBtn.addEventListener('click',function() {
    if(obj.budget != undefined) {
        obj.moneyPerDay = (obj.budget/30).toFixed();
        dayBudgetValue.textContent = obj.moneyPerDay;
        if(obj.moneyPerDay <100){
            levelValue.textContent = "Минималный уровень достатка";
        } else if(obj.moneyPerDay >100 && obj.moneyPerDay <2000){
            levelValue.textContent = "Средний уровень достатка";
        } else if (obj.moneyPerDay >2000){
            levelValue.textContent = "Высокий уровень достатка"; 
        } else{
            levelValue.textContent = "Произошла ошибка";
        } 
    }else{
        dayBudgetValue.textContent = "Произошла ошибка";
    }
});

chooseIncome.addEventListener('input',function() {
    let items = chooseIncome.value;
    obj.income = items.split(", ");
    incomeValue.textContent = obj.income;
});

checkSavings.addEventListener('click', function() {
if (obj.savings == true) {
    obj.savings = false;
} else {
    obj.savings = true;
}
});

chooseSum.addEventListener('input', function() {
    if (obj.savings == true) {
       let sum = +chooseSum.value,
           percent = +choosePercent.value;
           obj.monthIncome = sum/100/12*percent;
        obj.monthIncome = sum/100*percent;

        monthSavingsValue.textContent = obj.monthIncome.toFixed(1);
        yearSavingsValue.textContent  = obj.yearIncome.toFixed(1);
    }
});

choosePercent.addEventListener('input', function() {
    if (obj.savings == true) {
            let sum = +chooseSum.value,
                percent = +choosePercent.value;
                obj.monthIncome = sum/100/12*percent;
             obj.monthIncome = sum/100*percent;
     
             monthSavingsValue.textContent = obj.monthIncome.toFixed(1);
             yearSavingsValue.textContent  = obj.yearIncome.toFixed(1);  
    }
});