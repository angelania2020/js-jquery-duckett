/* Данный сценарий находится внутри функции-выражения, вызываемой сразу после создания.
Это делается для защиты области видимости переменных. */

(function () {

    //Создаём объект hotel и записываем детали предложения
    var hotel = {
        name: 'Отель "Пляж"',
        roomRate: 240,
        discount: 15, //Процентное значение скидки
        offerPrice: function () {
            var offerRate = this.roomRate * ((100 - this.discount) / 100);
            return offerRate;
        }
    }

    //Записываем название отеля, стандартную ставку и специальную ставку
    var hotelName, roomRate, specialRate;
    hotelName = document.getElementById('hotelName');
    roomRate = document.getElementById('roomRate');
    specialRate = document.getElementById('specialRate');

    hotelName.textContent = hotel.name;
    roomRate.textContent = hotel.roomRate.toFixed(2) + '₽';
    specialRate.textContent = hotel.offerPrice() + '₽';

    //Вычисляем и записываем информацию об истечении акции
    var expiryMsg; //Сообщение, выводимое пользователям
    var today; //Сегодняшняя дата
    var elEnds; //Элемент, в котором отображается сообщение об окончании акции

    function offerExpires(today) {
        //Объявляем переменные с локальной областью видимости
        var weekFromToday, day, date, month, year, dayNames, monthNames;
        //Добавляем ещё 7 дней (в миллисекундах)
        weekFromToday = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        //Создаем массивы, в которых будут содержаться названия дней и месяцев
        dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        //Собираем фрагменты даты, которые будут отображаться на странице
        day = dayNames[weekFromToday.getDay()];
        date = weekFromToday.getDate();
        month = monthNames[weekFromToday.getMonth()];
        year = weekFromToday.getFullYear();
        //Создаем сообщение
        expiryMsg = 'Акция завершается в ';
        expiryMsg += day + '<br>(' + date + ' ' + month + ' ' + year + ')';
        return expiryMsg;
    }

    today = new Date(); //Записываем сегодняшнюю дату в переменную
    elEnds = document.getElementById('offerEnds');
    elEnds.innerHTML = offerExpires(today);
    console.log(today.getDay());

    //Завершаем выражение функции, вызванной сразу после создания
}());