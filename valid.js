"use strict";

document.getElementById('sent').addEventListener('click', validForm);

/**
 * Функция проверки правильности заполнения формы и ее отправки
 */
function validForm() {
  let sum = validInput(name_equipment) + validInput(vendor_code) + validInput(description) + validInput(price);
  if (sum === 4) { // 4 - если все четыре поля заполнены вверно
    let alert = document.querySelectorAll('div.alert');
    alert[0].classList.remove('alert-danger');
    alert[0].classList.add('alert-info');
    alert[0].innerHTML = 'Отправка на сервер...';
    //Далее отправляем файл в формате JSON на сервер и ожидаем ответа. Все через AJAX
    document.getElementsByTagName('button')[0].remove();
    //setTimeout("document.forms['My_form'].submit()", 1500);
  }else {
    let alert = document.querySelectorAll('div.alert');
    alert[0].classList.add('alert-danger');
    alert[0].innerHTML = 'Исправьте ошибки!';
  }
}

/**
 * Функция проверки правильности заполнения поля формы
 * @param {object}object - Объект, содержащий необходимые для проверки свойства поля
 * @returns {number} 1 - true(ошибок не выявлено), 0 - false (есть ошибки)
 */
function validInput(object) {
  let name = document.getElementById(object.id);
  let input = name.getElementsByClassName('entry-field')[0];
  let value = input.value;
  let small = name.getElementsByTagName('small')[0];
  remove(input, small);
  if (object.isRight(value)) {
    success(input, small);
    return 1;
  } else {
    danger(input, small);
    small.innerHTML = '&#10008; ' + object.warring;
    return 0;
  }
}

/**
 * Объект со свойства поля формы
 * @property {string} id - индентификатор поля ввода
 * @property {string} warring - требования к введенным данным
 */
const name_equipment = {
  id: 'name_equipment',
  warring: 'Обязательное поле! Не более 50 символов.',
  isRight(value) {
    return value.length >= 1 && value.length <= 50;
  },
};

const vendor_code = {
  id: 'vendor_code',
  warring: 'Обязательное поле! Артикул содержит от 6 до 18 символов (заглавные латинские буквы и цифры)',
  isRight(value) {
    return value.match(/[A-Z0-9]{6,18}/);
  },
};

const description = {
  id: 'description',
  warring: 'Обязательное поле! Не более 100символов',
  isRight(value) {
    return value.length >= 1 && value.length <= 100;
  },
};


const price = {
  id: 'price',
  warring: 'Обязательное поле! Максимальное значение 15000 и 2 знаков после запятой',
  isRight(value) {
    return value.match(/\d+(.\d{2})?/) ? value > 0 && value <= 15000 : 0;
  },
};

/**
 * Функция удаления лишних классов
 * @param  input - поле ввода
 * @param  small - вспомогательный текст под полем ввода
 */
function remove(input, small) {
  input.classList.remove('crossingBorder-danger');
  input.classList.remove('crossingBorder-success');
  small.classList.remove('text-danger');
  small.classList.remove('text-success');
  small.classList.remove('text-muted');
}

/**
 * Функция добавления классов при правильном заполнении поля (зеленый цвет)
 * @param  input - элемент поле ввода
 * @param  small - вспомогательный текст под полем ввода
 */
function success(input, small) {
  input.classList.add('crossingBorder-success');
  small.classList.add('text-success');
  small.innerHTML = '&#10004; Верно!';

}

/**
 * Функция добавления классов при НЕправильном заполнении поля (красный цвет)
 * @param  input - элемент поле ввода
 * @param  small - вспомогательный текст под полем ввода
 */
function danger(input, small) {
  input.classList.add('crossingBorder-danger');
  small.classList.add('text-danger');
}
