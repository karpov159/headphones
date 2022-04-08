/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/basket.js":
/*!**********************************!*\
  !*** ./src/js/modules/basket.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function basket(parent) {

    'use strict';

    if (document.querySelector('body').getAttribute('data-title') == 'basket') {
    
    // функция показа мини-корзины
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.showMiniBasket)();     

    // карточка товара
    class ItemBasket {
        constructor(id,[img, name, price, num]) {
            this.id = id;
            this.img = img;
            this.name = name;
            this.price = price;
            this.num = num;
        }

        // помещаем на страницу
        render() {
            const div = document.createElement('div');
            div.classList.add('basket__item');
            div.setAttribute('data-id', `${this.id}`);

            div.innerHTML = `
            <div class="basket__item-left">
                <div class="basket__item-img">
                    <img src="${this.img}" alt="headphones">
                </div>
                <div class="basket__item-switch">
                    <img class="basket__item-minus" src="icons/-.svg" alt="Minus">
                    <div class="basket__item-number">${this.num}</div>
                    <img class="basket__item-plus" src="icons/+.svg" alt="plus">
                </div>    
            </div>
            <div class="basket__item-center">
                <div class="basket__item-name">${this.name}</div>
                <div class="basket__item-price">${this.price} ₽</div>
            </div>
            <div class="basket__item-right">
                <img class="basket__item-delete" src="icons/delete.svg" alt="delete">
                <div class="basket__item-result"> ${this.price * this.num} ₽</div>
            </div>
            `;
            document.querySelector('.basket__items').append(div);    
            }
        }

    // уменьшаем кол-во товара в sessionstorage и на странице
    const minusGoods = (num) => {
        // получаем корзину
        let  cardData = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getCartData)();
        // получаем айтем и его внутренности
        const parent = document.querySelector(`[data-id="${num}"]`),
              sum = parent.querySelector('.basket__item-number'),
              result = parent.querySelector('.basket__item-result');
        
        // уменьшаем кол-во на странице
        sum.innerHTML -= 1;
        // уменьшаем кол-во в корзине
        cardData[num][3] -= 1;
        // если товара меньше 0, убираем со страницы и из корзины
        if (cardData[num][3] <= 0) {
            delete cardData[num];
            parent.remove();
        }
        // пересчитываем общую стоимость товара
        result.innerHTML = `${sumItem(parent)} ₽`;
        // пересчитываем общую стоимость
        totalSum();
        // перезаписываем данные в sessionstorage
        (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.setCartData)(cardData);
        // Обновляем мини-корзину
        (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.showMiniBasket)();
    };


    const plusGoods = (num) => {
        // получаем корзину
        let  cardData = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getCartData)();
        // получаем айтем и его внутренности
        const parent = document.querySelector(`[data-id="${num}"]`);

        let sum = parent.querySelector('.basket__item-number'),
            result = parent.querySelector('.basket__item-result');
        
        // уменьшаем кол-во на странице
        sum.innerHTML++;
        // уменьшаем кол-во в корзине
        cardData[num][3] += 1;

        // пересчитываем общую стоимость товара
        result.innerHTML = `${sumItem(parent)} ₽`;
        // пересчитываем общую стоимость
        totalSum();
        // перезаписываем данные в sessionstorage
        (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.setCartData)(cardData);
        // Обновляем мини-корзину
        (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.showMiniBasket)();
    };

    const deleteGoods = (num) => {
        // получаем корзину
        let  cardData = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getCartData)();
        const parent = document.querySelector(`[data-id="${num}"]`);

        // удаляем со страницы и облака
        delete cardData[num];
        parent.remove();
        
        // пересчитываем общую стоимость
        totalSum();
        // перезаписываем данные в sessionstorage
        (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.setCartData)(cardData);
        // Обновляем мини-корзину
        (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.showMiniBasket)();
    };

    // подсчет общей стоимости товаров
    const totalSum = () => {
        const prices = document.querySelectorAll('.basket__item-result'),
                total = document.querySelector('.basket__price');
        
        let sum = 0;
        // перебираем все цены и складываем значение
        prices.forEach(price => {
            sum += +price.innerHTML.replace(/\D/g, ''); 
        });
        // помещаем значение на страницу
        total.innerHTML = `${sum} ₽`;
    };

    // подсчет стоимости каждого товара
    const sumItem = (parent) => {
        const price = +parent.querySelector('.basket__item-price').innerHTML.replace(/\D/g,''),
                num = +parent.querySelector('.basket__item-number').innerHTML;

        return price * num;
    };

    // создание карточек товаров
    const createCards = () => {
        const cardData = JSON.parse(sessionStorage.getItem('cart'));
        for (let items in cardData) {
            new ItemBasket(items, cardData[items]).render();
        }
        totalSum();

    };
    createCards();

    // обработка событий по клику на плюс и минус
    document.querySelector(parent).addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;

        // обработчик события
        function addEvent(selector, func) {
            if (target && target.classList.contains(selector.slice(1))) {
                document.querySelectorAll(selector).forEach((btn, i) => {
                    if (target == btn) {
                        const num = document.querySelectorAll('.basket__item')[i].getAttribute('data-id');
                        func(num);
                        
                    }
                });
            }
        }

        // навешиваем обработчики на кнопку плюс, минус и удалить товар
        addEvent('.basket__item-minus', minusGoods);
        addEvent('.basket__item-plus', plusGoods);
        addEvent('.basket__item-delete', deleteGoods);

    });
    
    }
}

/* harmony default export */ __webpack_exports__["default"] = (basket);


/***/ }),

/***/ "./src/js/modules/main.js":
/*!********************************!*\
  !*** ./src/js/modules/main.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");

 
function goods(parent) {
    'use strict';

    if (document.querySelector('body').getAttribute('data-title') == 'goods') {

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.showMiniBasket)();

     // карточки товаров
    class Item {
        constructor(id, img, name, price, oldPrice, discount, rating, parentSelector) {
            this.id = id;
            this.img = img;
            this.name = name;
            this.price = price;
            this.oldPrice = oldPrice;
            this.discount = discount;
            this.rating = rating;
            this.parent = document.querySelector(parentSelector);
        }

        // помещение карточки на страницу
        render() {
            const div = document.createElement('div');
            div.classList.add('headphones__item');

            div.innerHTML = `
            <div class="headphones__img">
                        <img src="${this.img}" alt="headphones">
                    </div>
                    <div class="headphones__info">
                        <div class="headphones__name">${this.name}</div>
                        <div class="headphones__price">
                            <div class="headphones__price-actual">${this.price}</div>
                            <div class="headphones__price-old">${this.oldPrice}</div>
                            <!-- <div class="headphones__price-discount">${this.discount}</div> -->
                        </div>
                        <div class="headphones__rating">
                            <a href="#" class="headphones__rating-img">
                                <img src="icons/Vector.svg" alt="star">
                            </a>
                            <div class="headphones__rating-num">${this.rating}</div>
                        </div>
                        <a href="#" data-id="${this.id}" class="headphones__buy">Купить</a>
                    </div>
            `;
            this.parent.append(div);
        }
}

// получение данных о товаре из дб и помещение на страницу
    const placeCards= (url, parent) => {
        fetch(url)
        .then(data => data.json())
        .then(data => {
            data.forEach(({id, img, name, price, oldPrice, discount, rating}) => {
                new Item(id, img, name, price, oldPrice, discount, rating, parent).render();  
        });
        });
    };
    // Для наушников
    placeCards('http://localhost:3000/headphones', '.headphones__wrapper');
    // для беспроводных
    placeCards('http://localhost:3000/wireless', '.wireless__wrapper');

    // обработчик на кнопку
    document.querySelector(parent).addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;

        if (target && target.classList.contains('headphones__buy')) {
            // перебираем кнопки купить
            document.querySelectorAll('.headphones__buy').forEach((btn,i) => {
                if (target == btn) {
                    // если кнопки совпадают получаем данные из корзины или создаем новый объект
                    let cardData = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getCartData)() || {};
                    // передаем айди нужного айтема и получаем его данные
                    const obj = getData(i);
                    // если айтем с таким айди уже есть, прибавляем +1
                    if (cardData.hasOwnProperty(obj.id)) {
                        cardData[obj.id][3] += 1;
                        // если нет, создаем новый айтем в корзине
                    } else {
                        cardData[obj.id] = [obj.img, obj.name, obj.price, 1];
                    }
                    // перезаписываем данные в корзине
                    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.setCartData)(cardData);
                    // Обновляем иконку корзины
                    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.showMiniBasket)();
                }
            });
        }
    });

    // получение данных выбранного товара
    const getData = (num) => {
        const item = document.querySelectorAll('.headphones__item'),

        img = item[num].querySelector('.headphones__img img').getAttribute('src'),
        name = item[num].querySelector('.headphones__name').innerHTML,
        price = item[num].querySelector('.headphones__price-actual').innerHTML.replace(/\D/g,''),
        id = item[num].querySelector('.headphones__buy').getAttribute('data-id');
        return {
            img: img,
            name: name,
            price: price,
            id: id
        };
    };

        }
    }

/* harmony default export */ __webpack_exports__["default"] = (goods);





/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCartData": function() { return /* binding */ getCartData; },
/* harmony export */   "setCartData": function() { return /* binding */ setCartData; },
/* harmony export */   "showMiniBasket": function() { return /* binding */ showMiniBasket; }
/* harmony export */ });
// получаем данные из Sessionstorage
function getCartData() {
    return JSON.parse(sessionStorage.getItem('cart'));
}
// Записываем данные в Sessionstorage
function setCartData(item) {
    sessionStorage.setItem('cart', JSON.stringify(item));
    return false;
}

// обновляем мини-корзину
function showMiniBasket() {
    // получаем данные из корзины и саму корзину
    const cardData = getCartData(),
        miniBasket = document.querySelector('.header__num');
    let sum = 0;

    // суммируем количество товаров в корзине
    for (let items in cardData) {
        sum += cardData[items][3];
    }

    // если товаров больше 0, показываем элемент на странице
    if (sum > 0) {
        miniBasket.style.display = "block";
    } else {
        miniBasket.style.display = "none";

    }
    // помещаем сумму в элемент
    miniBasket.innerHTML = sum;
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/main */ "./src/js/modules/main.js");
/* harmony import */ var _modules_basket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/basket */ "./src/js/modules/basket.js");



window.addEventListener('DOMContentLoaded', () => {
    (0,_modules_main__WEBPACK_IMPORTED_MODULE_0__["default"])('.headphones');
    (0,_modules_basket__WEBPACK_IMPORTED_MODULE_1__["default"])('.basket');
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map