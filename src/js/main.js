/* jshint browser: true */
"use strict";
document.addEventListener('DOMContentLoaded', function(){

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

});