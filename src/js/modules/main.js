import {getCartData, setCartData, showMiniBasket} from '../services/services';
 
function goods(parent) {
    'use strict';

    if (document.querySelector('body').getAttribute('data-title') == 'goods') {

    showMiniBasket();

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
                    let cardData = getCartData() || {};
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
                    setCartData(cardData);
                    // Обновляем иконку корзины
                    showMiniBasket();
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

export default goods;



