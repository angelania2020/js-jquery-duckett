let table = 4;  // Элемент таблицы
let operator = 'addition';  // Тип вычисления
let i = 1;  // Значение счётчика
let msg = '';  // Сообщение

if (operator === 'addition') {  // Если переменная оператора требует сложения
    while (i < 11) {  // Пока еще значение счетчика меньше 11
        msg += i + ' + ' + table + ' = ' + (i + table) + '<br />';  // Вычисление
        i++;  // Прибавляем 1 к значению счетчика
    }
} else {  // в противном случае
    while (i < 11) {  // Пока значение счетчика еще меньше 11
        msg += i + ' x ' + table + ' = ' + (i * table) + '<br />';  // Вычисление
        i++;  // Прибавляем 1 к значению счетчика
    }
}

// Выводим сообщение на страницу
let el = document.getElementById('blackboard');
el.innerHTML = msg;