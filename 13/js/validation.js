// Валидация формы с помощью JavaScript.
// A. Анонимная функция, запускаемая событием submit 
// Б. Инициация универсальных проверок
// В. Инициация индивидуальных проверок
// Г. Функции для получения / установки / отображения / удаления сообщений об ошибках
// Д. Объект, проверяющий тип данных с использованием регулярных выражений, вызываемых validateTypes в разделе Б

// Связи: jQuery, jQueryUI, birthday.js, css/c13.css

(function () {
    document.forms.register.noValidate = true;  // Отключаем HTML5-валидацию

    // -------------------------------------------------------------------------
    // A. АНОНИМНАЯ ФУНКЦИЯ, ЗАПУСКАЕМАЯ СОБЫТИЕМ SUBMIT 
    // -------------------------------------------------------------------------
    $('form').on('submit', function (e) {
        var elements = this.elements;
        var valid = {};
        var isValid;
        var isFormValid;

        // УНИВЕРСАЛЬНЫЕ ПРОВЕРКИ (вызывает функцию за пределами обработчика событий)
        var i;
        for (i = 0, l = elements.length; i < l; i++) {
            // Вызываются validateRequired() и validateTypes()
            isValid = validateRequired(elements[i]) && validateTypes(elements[i]);
            if (!isValid) {
                showErrorMessage(elements[i]);
            } else {
                removeErrorMessage(elements[i]);
            }
            valid[elements[i].id] = isValid;
        }

        // ИНДИВИДУАЛЬНАЯ ВАЛИДАЦИЯ
        // Проверка информации о себе
        if (!validateBio()) {
            showErrorMessage(document.getElementById('bio'));
            valid.bio = false;
        } else {
            removeErrorMessage(document.getElementById('bio'));
        }

        // пароль (здесь вы можете кэшировать пароль в переменной)
        if (document.getElementById('password').value.length != 0) {
            if (!validatePassword()) {
                showErrorMessage(document.getElementById('password'));
                valid.password = false;
            } else {
                removeErrorMessage(document.getElementById('password'));
            }
        }

        // совпадают ли пароли
        if (!validatePasswordConfirm()) {
            showErrorMessage(document.getElementById('conf-password'));
            valid['conf-password'] = false;
        } else {
            removeErrorMessage(document.getElementById('conf-password'));
        }

        // родительское согласие (здесь вы можете кэшировать родительское согласие в переменной)
        if (!validateParentsConsent()) {
            showErrorMessage(document.getElementById('parents-consent'));
            valid['parents-consent'] = false;
        } else {
            removeErrorMessage(document.getElementById('parents-consent'));
        }

        // console.log(valid);

        // ПРОЙДЕНА ЛИ ПРОВЕРКА / МОЖНО ЛИ ОТПРАВЛЯТЬ ФОРМУ?
        // Перебираем объект valid, при обнаружении ошибок присваиваем isFormValid значение false
        for (var field in valid) {
            if (!valid[field]) {
                isFormValid = false;
                break;
            }
            isFormValid = true;
        }

        if (!isFormValid) {
            e.preventDefault();
        }
    });  // Конец обработчика событий
    //  КОНЕЦ: анонимная функция вызывается кнопкой отправки формы

    // -------------------------------------------------------------------------
    // Б. ИНИЦИАЦИЯ УНИВЕРСАЛЬНЫХ ПРОВЕРОК
    // -------------------------------------------------------------------------

    // ПРОВЕРКА, ОБЯЗАТЕЛЬНО ЛИ ПОЛЕ К ЗАПОЛНЕНИЮ, И СОДЕРЖИТ ЛИ ОНО ЗНАЧЕНИЕ
    // Зависит от isRequired() и isEmpty(), как показано ниже, и setErrorMessage - показано далее.
    function validateRequired(el) {
        if (isRequired(el)) {
            var valid = !isEmpty(el);
            if (!valid) {
                setErrorMessage(el, 'Поле необходимо заполнить');
            }
            return valid;
        }
        return true;
    }

    // ПРОВЕРКА, ОБЯЗАТЕЛЕН ЛИ ЭЛЕМЕНТ
    // Вызывается функцией validateRequired()
    function isRequired(el) {
        return ((typeof el.required === 'boolean') && el.required) || (typeof el.require === 'string');
    }

    // ПРОВЕРКА, ПУСТ ЛИ ЭЛЕМЕНТ (или значение идентично тексту заполнителя)
    // Браузеры с поддержкой HTML5 допускают ввод значения, идентичного тексту заполнителя (при отключенном jQuery?), но в этом случае, это не следует делать
    // Вызывается функцией validateRequired()
    function isEmpty(el) {
        return !el.value || el.value === el.placeholder;
    }

    // ПРОВЕРКА, СООТВЕТСТВКЕТ ЛИ ВВЕДЕННОЕ ЗНАЧЕНИЕ ТИПУ ЭЛЕМЕНТА
    // Зависит от объекта validateType (показано в конце IIFE-функции)
    function validateTypes(el) {
        if (!el.value) return true;  // Если у элемента нет значения, возвращаем true
        var type = $(el).data('type') || el.getAttribute('type');
        if (typeof validateType[type] === 'function') {
            return validateType[type](el);
        } else {
            return true;  // Возвращаем true, потому что его нельзя проверить
        }
    }

    // -------------------------------------------------------------------------
    // В. ИНИЦИАЦИЯ ИНДИВИДУАЛЬНЫХ ПРОВЕРОК
    // -------------------------------------------------------------------------

    // ЕСЛИ ВОЗРАСТ ПОЛЬЗОВАТЕЛЯ МЕНЕЕ 13 ЛЕТ, ПРОВЕРИТЬ, УСТАНОВЛЕН ЛИ ФЛАЖОК РОДИТЕЛЬСКОГО СОГЛАСИЯ
    // Связи: birthday.js (в противном случае проверка не сработает)
    function validateParentsConsent() {
        var parentsConsent = document.getElementById('parents-consent');
        var consentContainer = document.getElementById('consent-container');
        var valid = true;
        if (consentContainer.className.indexOf('hide') === -1) {  // Если флажок видим
            valid = parentsConsent.checked;
            if (!valid) {
                setErrorMessage(parentsConsent, 'Требуется согласие родителей');
            }
        }
        return valid;
    }

    // Проверка, что объем текста биографии не превышает 140 символов
    function validateBio() {
        var bio = document.getElementById('bio');
        var valid = bio.value.length <= 140;
        if (!valid) {
            setErrorMessage(bio, 'Объем текста превышает 140 символов');
        }
        return valid;
    }

    // Мой вариант
    // Проверка, что значения паролей в обоих полях идентичны и содержат не менее 8 символов
    // function validatePassword() {
    //     var password = document.getElementById('password');
    //     var passwordConfirm = document.getElementById('conf-password');
    //     var validLength = password.value.length >= 8;
    //     var validBothSame = password.value === passwordConfirm.value;
    //     var valid;
    //     if (validLength && validBothSame) {
    //         valid = true;
    //     } else if (validLength && !validBothSame) {
    //         setErrorMessage(password, 'Пароли должны совпадать');
    //         valid = false;
    //     } else if (!validLength) {
    //         setErrorMessage(password, 'Пароль должен состоять из не менее 8 символов');
    //         valid = false;
    //     }
    //     return valid;
    // }
    function validatePassword() {
        var password = document.getElementById('password');
        var valid = password.value.length >= 8;
        if (!valid) {
            setErrorMessage(password, 'Пароль должен состоять из не менее 8 символов');
            valid = false;
        }
        return valid;
    }
    function validatePasswordConfirm() {
        var passwordConfirm = document.getElementById('conf-password');
        var valid = password.value === passwordConfirm.value;
        if (!valid) {
            setErrorMessage(passwordConfirm, 'Пароли должны совпадать');
            valid = false;
        }
        return valid;
    }

    // -------------------------------------------------------------------------
    // Г. ФУНКЦИИ ДЛЯ ПОЛУЧЕНИЯ / УСТАНОВКИ / ОТОБРАЖЕНИЯ / УДАЛЕНИЯ СООБЩЕНИЙ ОБ ОШИБКАХ
    // -------------------------------------------------------------------------
    function setErrorMessage(el, message) {
        $(el).data('errorMessage', message);  // Сохраняем сообщение об ошибке внутри элемента
    }

    function getErrorMessage(el) {
        return $(el).data('errorMessage') || el.title;
    }

    function showErrorMessage(el) {
        var $el = $(el);
        var errorContainer = $el.siblings('.error.message');
        if (!errorContainer.length) {
            // Создаем элемент span для хранения сообщения и добавляем его после поля с ошибкой
            errorContainer = $('<span class="error message"></span>').insertAfter($el);
        }
        errorContainer.text(getErrorMessage(el));
    }

    function removeErrorMessage(el) {  // Вызывается, когда нет ошибки и ошибки были исправлены
        var errorContainer = $(el).siblings('.error.message');
        // console.log(errorContainer);
        errorContainer.remove();  // (jQuery метод) Удаляем элемент, содержащий сообщение об ошибке, если такого нет, то игнорирует, так как коллекция пустая
    }

    // -------------------------------------------------------------------------
    // Д. ОБЪЕКТ, ПРОВЕРЯЮЩИЙ ТИП ДАННЫХ 
    // -------------------------------------------------------------------------

    // Проверка правильности введенных данных или, в противном случае,  отображение сообщения об ошибке
    // Возвращает true если все верно, в противном случае - возвращает false
    var validateType = {
        email: function (el) {
            var valid = /[^@]+@[^@]+/.test(el.value);
            if (!valid) {
                setErrorMessage(el, 'Проверьте правильность адреса');
            }
            return valid;
        },
        number: function (el) {
            var valid = /^\d+$/.test(el.value);
            if (!valid) {
                setErrorMessage(el, 'Введите допустимый номер');
            }
            return valid;
        },
        date: function (el) {
            var valid = /^(\d{2}\/\d{2}\/\d{4})|(\d{4}-\d{2}-\d{2})$/.test(el.value);
            if (!valid) {
                setErrorMessage(el, 'Введите допустимую дату');
            }
            return valid;
        }
    };

}());