(function () {
    var bio = $('#bio');
    var bioCounter = $('#bio-count');

    // Отображаем счетчик, когда поле в фокусе, и обновляем класс
    // Указываем количество оставшихся символов;
    bio.on('focus', updateCounter);
    bio.on('keyup', updateCounter);

    // Когда элемент textarea оказывается вне фокуса, скрываем счетчик,
    // оставляя количество символов
    bio.on('blur', function () {
        // if (bioCounter.text() >= 0) {
        //     // console.log(bioCounter.text()); // Скрытое изначальное значение '140', затем может стать негативным var count
        //     bioCounter.addClass('hide');
        // }
        if (bio.val().length <= 140) {             // Если биография слишком длинная
            bioCounter.addClass('hide');             // Прячем счетчик
        }
    });

    function updateCounter(e) {
        var count = 140 - bio.val().length;
        var status = '';
        if (count < 0) {
            status = 'error';
        } else if (count <= 15) {
            status = 'warn';
        } else {
            status = 'good';
        }
        // Удаляем предыдущие классы
        bioCounter.removeClass('error warn good hide');  //The jQuery removeClass() method removes one or more class names from the selected elements.
        // Добавляем новые классы
        bioCounter.addClass(status);

        var charMsg = 'Осталось символов: <b>' + count + '</b>'; // Выводимое сообщение
        bioCounter.html(charMsg);               // Обновляем элемент счетчика
    }

}());

// См. также аналогичный файл textarea-counter.js и bio.js