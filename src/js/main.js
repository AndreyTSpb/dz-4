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
    input_choose_income = document.querySelector('.choose-income'),

    btns = document.querySelectorAll('button'),
    chk = document.querySelector('#savings'),
    sum = document.querySelector('#sum'),
    percent = document.querySelector('#percent'),
    year_value = document.querySelector('.year-value'),
    month_value = document.querySelector('.month-value'),
    day_value = document.querySelector('.day-value');


let money, time , flag = false;

if(flag == false){
    btns.forEach(function(btn){
        if(btn.className !== 'start'){
            btn.disabled = true;
        }
    });
    sum.disabled = true;
    percent.disabled = true;
}

/**
 * button active
 */
function active_bnts(){
    if(flag == true){
        btns.forEach(function(btn){
            btn.disabled = false;
        });
    }
}

chk.addEventListener('click', function(){
    if(chk.checked){
        appData.savings = true;
        sum.disabled = false;
        percent.disabled = false;
    }else{
        appData.savings = false;
        sum.disabled = true;
        percent.disabled = true;
    }
});

/**
 * updating html value
 */
function update_date_on_site(){
    //console.log(appData.bujet);
    budget_value.innerHTML = appData.bujet;
    daybudget_value.textContent = appData.moneyPreDay;
    level_value.textContent = appData.level_life;
    expenses_value.textContent = get_str_expenses();
    optionalexpenses_value.textContent = (Object.keys(appData.optionalExpenses).length > 0)? appData.optionalExpenses:"";
    monthsavings_value.textContent = (appData.monthIncome > 0 )? appData.monthIncome:"";
    yearsavings_value.textContent  = (appData.monthIncome > 0 )? appData.monthIncome*12:"";
    income_value.textContent =  get_incom_summ();
}
/**
 * Create string expenses
 */
function get_str_expenses(){
    let expenses = 0;
    if(Object.keys(appData.expenses).length > 0){
        for(let key in appData.expenses){
            expenses += +appData.expenses[key]; 
        }
    }
    return expenses;
}

function get_incom_summ(){
    let summ = 0;
    if(appData.income.length > 0){
        console.log('rrr');
        appData.income.forEach(function(item){
            summ += (item[1]>0)?+item[1]:0;
        });
    }
    return summ;
}

/**
 * starting function
 */
function start(){

    /*start data*/
    money = +prompt("Ваш бюджет на месяц?: ", '');
    time  = prompt("Введите дату в формате YYYY-MM-DD", '');

    if(isNaN(money) || money == null || money == ""){
        money = +prompt("Ваш бюджет на месяц?: ", '');
    }
    appData.bujet = money;
    appData.time  = time;
    flag = true;
    
    /**
     * add data
     */
    year_value.value = new Date(Date.parse(time)).getFullYear();
    month_value.value = new Date(Date.parse(time)).getMonth()+1;
    day_value.value  = new Date(Date.parse(time)).getDate();
    
    /* enabeled buttons*/
    active_bnts();
    
    /*update info*/
    update_date_on_site();
}

/*Создаем обьект*/
let appData = {
    bujet : {},
    timeData : time,
    expenses : {},
    expenses_summ : 0,
    optionalExpenses : {},
    optionalExpenses_summ : 0,
    income : [],
    savings : true,
    monthIncome: 0,
    level_life: '',
    detectDayBugget : function(){
        appData.moneyPreDay = appData.bujet / 30;
    },
    detectLevel : function(){
        if(appData.moneyPreDay < 50 ){
            appData.level_life = "you loser";
        }else if (appData.moneyPreDay > 100){
            appData.level_life = "you win";
        }else{
            appData.level_life = "comsi comsa";
        }
    },
    chooseOptExpenses : function(){
        let str ="";

        for(let i=0; i < inout_opt.length; i++){
            str += inout_opt[i].value + ", ";
        }
        appData.optionalExpenses = str;
    },
    chooseIncome : function(income_value){
        let arr = income_value.split(',');
        console.log(arr);
        let arr_2 = [];
        arr.forEach(function(item){
            arr_2.push(item.split(":"));
        });
        console.log(arr_2);

        appData.income = arr_2;

    },
    addExpenses : function(){
        let arr_a = [], arr_b = [];

        for(let i=0; i<inputs.length; i++){
            if(i % 2 > 0){
                arr_b.push(+inputs[i].value); 
            }else{
                arr_a.push(inputs[i].value);
            }
        }

        if(arr_a.length > 0 && arr_b.length > 0){
            for(let i=0; i< arr_a.length; i++){
                appData.expenses[arr_a[i]] = +arr_b[i];
            }
        }
    },
    checkSavings : function(save, procent){

        if(appData.savings == true){
            appData.monthIncome = save/1000/12*procent;
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

// for (let key in appData) {
//     console.log("Наша программа включает в себя данные: " + key + " - " + appData[key]);
// }


/*START*/
btn_start.addEventListener('click', function(){
    start();
});


/**
 * Name buttons
 */
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
    appData.addExpenses();
    update_date_on_site();
});
btn_optionalexpenses.addEventListener('click', function(){
    appData.chooseOptExpenses();
    update_date_on_site();
});
btn_count_budget.addEventListener('click', function(){
    appData.detectDayBugget();
    appData.detectLevel();
    update_date_on_site();
});

/**
 * Update Saving 
 */
function update_saving(){
    if(sum.value > 0 && percent.value > 0){

        appData.checkSavings(+sum.value, +percent.value);
        update_date_on_site();
    }
}
/**
 * INPUTS
 */
sum.addEventListener('focusout', function(){
    update_saving();
});      
percent.addEventListener('focusout', function(){
    update_saving();
});
input_choose_income.addEventListener('focusout', function(){
    if(input_choose_income.value.length > 0){
        appData.chooseIncome(input_choose_income.value);
        update_date_on_site();
    }
});