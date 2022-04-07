window.addEventListener('DOMContentLoaded', () => {


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

    // помещение карточек на страницу
    function placeCards(url, parent) {
        fetch(url)
        .then(data => data.json())
        .then(data => {
            data.forEach(({id, img, name, price, oldPrice, discount, rating}) => {
                new Item(id, img, name, price, oldPrice, discount, rating, parent).render();  
        });
        });
    }
    placeCards('http://localhost:3000/headphones', '.headphones__wrapper');
    placeCards('http://localhost:3000/wireless', '.wireless__wrapper');

    // получаем данные из корзины
    function getCartData(){
        return JSON.parse(sessionStorage.getItem('cart'));
    }
      // Записываем данные в LocalStorage
    function setCartData(item){
    sessionStorage.setItem('cart', JSON.stringify(item));
    return false;
    }

    // обработчик на кнопку
    const parent = document.querySelector('.headphones');

    parent.addEventListener('click', (e) => {
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
    function getData(num) {
        const item = document.querySelectorAll('.headphones__item');

        this.img = item[num].querySelector('.headphones__img img').getAttribute('src');
        this.name = item[num].querySelector('.headphones__name').innerHTML;
        this.price = item[num].querySelector('.headphones__price-actual').innerHTML.replace(/\D/g,'');
        this.id = item[num].querySelector('.headphones__buy').getAttribute('data-id');
        return {
            img: this.img,
            name: this.name,
            price: this.price,
            id: this.id
        };
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
    showMiniBasket();
});




function test(word) {
    console.log(word)
}

function hello(fun, word) {
    fun(word);
}

hello(test, 'fdfd');

console.log('.basket__item-minus'.slice(1))