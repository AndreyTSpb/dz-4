/* jshint browser: true */
"use strict";

let btn_start = document.getElementById('start'),
    budget_value = document.getElementsByClassName('budget-value')[0],
    daybudget_value = document.getElementsByClassName('daybudget-value')[0],
    level_value = document.getElementsByClassName('level-value')[0],
    expenses_value = document.getElementsByClassName('expenses-value')[0],
    optionalexpenses_value = document.getElementsByClassName('optionalexpenses-value')[0],
    income_value = document.getElementsByClassName('income-value')[0],
    monthsavings_value = document.getElementsByClassName('monthsavings-value')[0],
    yearsavings_value = document.getElementsByClassName('yearsavings-value')[0],

    inputs = document.getElementsByClassName('expenses-item'),
    inout_opt = document.querySelectorAll('.optionalexpenses-item'),

    btns = document.getElementsByTagName('button'),
    chk = document.querySelector('#savings'),
    sum = document.querySelector('#sum'),
    percent = document.querySelector('#percent'),
    year_value = document.querySelector('.year-value'),
    month_value = document.querySelector('.month-value'),
    day_value = document.querySelector('.day-value');


let money, time;

function start(){
    money = +prompt("Ваш бюджет на месяц?: ", '');
    time  = prompt("Введите дату в формате YYYY-MM-DD", '');

    if(isNaN(money) || money == null || money == ""){
        money = +prompt("Ваш бюджет на месяц?: ", '');
    }
}
start();

/*Создаем обьект*/
let appData = {
    bujet : {},
    timeData : time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings : true,
    monthIncome: 0,
    detectDayBugget : function(money){
        appData.bujet       = money;
        appData.moneyPreDay = money / 30;
        alert("your bujet for one day: " +  appData.moneyPreDay);
    },
    detectLevel : function(){
        if(appData.moneyPreDay < 50 ){
            return "you loser";
        }else if (appData.moneyPreDay > 100){
            return "you win";
        }else{
            return "comdi comsa";
        }
    },
    chooseOptExpenses : function(){
        for (let i = 1; i<4; i++){
            appData.optionalExpenses[i] = prompt("Не обязательные расходы?", '');
        }
    },
    chooseIncome : function(){
        let ans = prompt("Укажите дополнительные доходы (разделитель запятая)",'');
        if(!isNaN(ans) || ans == null || ans == ""){
            ans = prompt("Укажите дополнительные доходы (разделитель запятая)",'');
        }
        appData.income = ans.split(', ');

        if(appData.income.length > 0){
            let str = "";
            appData.income.forEach(function(item, i){
                k = ++i;
                str += "your income# " + k + " : " + item + "\n";
            });
            if(str.length >0) {alert(str);}
        }
    },
    addExpenses : function(){
        while(confirm("Добавить расход? ")){
            /**
             * Спрашиваем пользователя
             */
            let a = prompt("Обязательная статья расхода в этом месяце?", '');
            let b = prompt("Во сколько обойдется?", '');
        
            if(a.length > 0 && b.length > 0){
                //заполняем вопрос/ответ
                appData.expenses[a] = +b;
            }else{
                alert("Не правильно указанны данные");
            }
        }
        //перебираем все статьи расхода сумируем расход
        for (let i in appData.expenses){
            one_day += parseFloat(appData.expenses[i]);
        }
    },
    checkSavings : function(){
        if(appData.savings == true){
            let save = +prompt("Какова сумма накопления?"), 
                procent = +prompt("Под какой процент?");
    
            appData.monthIncome = save/1000/12*procent;
            alert("Доход в месяц : " + appData.monthIncome);
        }
    },
    summExpenses : function(){
        //перебираем все статьи расхода сумируем расход
        for (let i in appData.expenses){
            one_day += parseFloat(appData.expenses[i]);
        }
    },
    viewData : function(){
        let str = "Our programm has in data: \n";

        for (let key in appData){
            if(typeof(appData[key]) === 'function'){
                //fff
            }else{
                if(appData[key] !== null && typeof appData[key] === 'object'){
                    str += key+ " : \n";
                    for(let key2 in appData[key]){
                        str += "    " + key2 + " : " + appData[key][key2] + "\n"; 
                    }
                }else{
                str += key + " : " + appData[key] + '\n';
                }
            }
    
        }
        return str;
    }
};

for (let key in appData) {
    console.log("Наша программа включает в себя данные: " + key + " - " + appData[key]);
}

btn_start.addEventListener('click', function(){
    alert('click');
});


let btn_expenses = "", btn_optionalexpenses = "", btn_count_budget = "";
for(let i in btns){
    if(btns[i].className == 'expenses-item-btn'){
        btn_expenses = btns[i];
    }else if(btns[i].className == 'optionalexpenses-btn'){
        btn_optionalexpenses = btns[i];
    }else if(btns[i].className == 'count-budget-btn'){
        btn_count_budget = btns[i];
    }
}
btn_expenses.addEventListener('click', function(){
    alert('click2');
});
btn_optionalexpenses.addEventListener('click', function(){
    alert('click3');
});
btn_count_budget.addEventListener('click', function(){
    alert('click4');
});      
