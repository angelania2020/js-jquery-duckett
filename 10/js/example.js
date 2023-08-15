var width = 12; // переменная width
// var height = 10; // переменная height
var height = 'test'; // переменная height

function calculateArea(width, height) {
    try {
        var area = width * height; // Пытаемся вычислить площадь
        if (!isNaN(area)) { // Если это число
            return area; // Возвращаем площадь
        } else {
            throw new Error('calculateArea() получила некорректное число'); // Создаём собственную ошибку
        }
    } catch (error) { // Если произошла ошибка
        console.log(`${error.name} ${error.message}`); // Выводим ее в консоли
        return 'Не удалось вычислить площадь.'; // Показываем пользователю сообщение
    } finally {
        var info = document.createElement('p'); // Добавляем параграф с информацией о вычислении площади
        info.innerHTML = 'площадь = ширина х высота';
        document.getElementById('contact').appendChild(info);
    }
}

// ПЫТАЕМСЯ ВЫВЕСТИ ПЛОЩАДЬ НА СТРАНИЦЕ
document.getElementById('area').innerHTML = calculateArea(width, height);