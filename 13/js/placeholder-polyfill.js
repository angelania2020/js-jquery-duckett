(function () {

    var length = document.forms.length;  // Получаем количество форм
    for (var i = 0, l = length; i < l; i++) {  // Перебираем каждую из них
        showPlaceholder(document.forms[i].elements);  // Вызываем showPlaceholder()
    }

    function showPlaceholder(elements) {
        for (var i = 0, l = elements.length; i < l; i++) {
            var el = elements[i];

            if (!el.placeholder) {
                continue;
            }

            el.style.color = 'maroon';
            el.value = el.placeholder;
            // Does not work for date input. Value will be empty.
            // But corrected in birthday.js if birthday.js executed first, then this file.

            addEvent(el, 'focus', function () {
                if (this.value === this.placeholder) {
                    // console.log(this.placeholder);
                    this.value = '';
                    this.style.color = 'blue';
                }
                // Triggered but cannot be seen when picking date execept for blinking cursor or autocomplete. Blur may not fire for autocomplete?
            });
            addEvent(el, 'blur', function () {
                if (this.value === '') {
                    this.value = this.placeholder;
                    this.style.color = 'lime';
                }
                // Date blur event occurs when date is being selected. (Value changes, but blur is fired first.)
                // console.log(this.value)
            });
            // console.log(el.value)
        }
    }
}());