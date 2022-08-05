let noteInput = document.getElementById('noteInput');
let noteName = document.getElementById('noteName');
let target, userInput;

function writeLabel(e) {
    target = e.target;
    userInput = target.value;
    noteName.textContent = userInput;
}

function recorderControls(e) {
    e.preventDefault();
    target = e.target;

    switch (target.getAttribute('data-state')) {
        case 'record':
            record(target);
            break;
        case 'stop':
            stop(target);
            break;
    }
}

function record(target) {
    target.setAttribute('data-state', 'stop');
    target.textContent = 'стоп';
}

function stop(target) {
    target.setAttribute('data-state', 'record');
    target.textContent = 'запись';
}

noteInput.addEventListener('input', writeLabel, false)

document.addEventListener('click', recorderControls, false);