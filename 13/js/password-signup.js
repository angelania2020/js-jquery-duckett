(function () {
    var password = document.getElementById('password');
    var passwordConfirm = document.getElementById('conf-password');

    function setErrorHighlighter(e) {
        var validLengthPass = password.value.length >= 8;
        var validLengthPassConfirm = passwordConfirm.value.length >= 8;
        var validBothSame = password.value === passwordConfirm.value;

        if (validLengthPass && validLengthPassConfirm && validBothSame) {
            password.className = 'pass';
            passwordConfirm.className = 'pass';
        } else if (validLengthPass && validLengthPassConfirm && !validBothSame) {
            password.className = 'pass';
            passwordConfirm.className = 'fail';
        } else if (validLengthPass && !validLengthPassConfirm && !validBothSame) {
            password.className = 'pass';
            passwordConfirm.className = 'fail';
        } else if (!validLengthPass && !validLengthPassConfirm && !validBothSame) {
            password.className = 'fail';
            passwordConfirm.className = 'fail';
        } else if (!validLengthPass && validLengthPassConfirm && !validBothSame) {
            password.className = 'fail';
            passwordConfirm.className = 'fail';
        } else if (!validLengthPass && !validLengthPassConfirm && validBothSame) {
            password.className = 'fail';
            passwordConfirm.className = 'fail';
        }
    }

    function removeErrorHighlighter(e) {
        var target = e.target || e.srcElement;
        if (target.className === 'fail') {
            target.className = '';
        }
    }

    addEvent(password, 'focus', removeErrorHighlighter);
    addEvent(password, 'blur', setErrorHighlighter);
    addEvent(passwordConfirm, 'focus', removeErrorHighlighter);
    addEvent(passwordConfirm, 'blur', setErrorHighlighter);
}());