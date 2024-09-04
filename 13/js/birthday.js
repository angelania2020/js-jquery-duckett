(function () {
    var $birth = $('#birthday');
    var $parentsConsent = $('#parents-consent');
    var $consentContainer = $('#consent-container');

    // Создаем виджет выбора даты с помощью jQuery UI
    $birth.prop('type', 'text').data('type', 'date').datepicker({
        dateFormat: 'yy-mm-dd'
    });

    $birth.on('blur change', checkDate);

    function checkDate() {
        var dob = this.value.split('-');  // Массив из даты
        // Передаем в toggleParentsConsent() дату рождения в виде объекта Date
        toggleParentsConsent(new Date(dob[0], dob[1] - 1, dob[2]));
    }

    function toggleParentsConsent(date) {
        if (isNaN(date)) return;
        var now = new Date();
        // Если разница меньше 13 лет (мс * секунды * минуты * часы * дни * годы)
        // високосные годы не учитываются!
        // Если пользователю меньше 13, выводим флажок родительского согласия
        if ((now - date) < (1000 * 60 * 60 * 24 * 365 * 13)) {
            $consentContainer.removeClass('hide');
            $parentsConsent.focus();  //Spacebar for ticking it
        } else {
            $consentContainer.addClass('hide');
            $parentsConsent.prop('checked', false);
        }
    }
}());