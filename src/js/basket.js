window.addEventListener('DOMContentLoaded', () => {

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




    // создание карточек товаров
    function createCards() {
        const itemsToDelete = document.querySelectorAll('.basket__item');
        itemsToDelete.forEach(item => item.remove());

        const cardData = JSON.parse(sessionStorage.getItem('cart'));
        // console.log(cardData);
        for (let items in cardData) {
            new ItemBasket(items, cardData[items]).render();
            // console.log(items);
        }
        totalSum();

    }
    createCards();

    // обработка событий по клику на плюс и минус
    const parentBasket = document.querySelector('.basket');

    parentBasket.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;
        // console.log(document.querySelectorAll('.basket__item-minus'));

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

    // получаем данные из корзины
    function getCartData(){
        return JSON.parse(sessionStorage.getItem('cart'));
    }

    // Записываем данные в sessionstorage
    function setCartData(item) {
    sessionStorage.setItem('cart', JSON.stringify(item));
    return false;
    }

    // уменьшаем кол-во товара в sessionstorage и на странице
    function minusGoods(num) {
        // получаем корзину
        let  cardData = getCartData();
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
        setCartData(cardData);
        showMiniBasket();
    }


    function plusGoods(num) {
        // получаем корзину
        let  cardData = getCartData();
        // получаем айтем и его внутренности
        const parent = document.querySelector(`[data-id="${num}"]`);

        let sum = parent.querySelector('.basket__item-number'),
            result = parent.querySelector('.basket__item-result');
        
        // уменьшаем кол-во на странице
        console.log(typeof(sum));
        sum.innerHTML++;
        // уменьшаем кол-во в корзине
        cardData[num][3] += 1;

        // пересчитываем общую стоимость товара
        result.innerHTML = `${sumItem(parent)} ₽`;
        // пересчитываем общую стоимость
        totalSum();
        // перезаписываем данные в sessionstorage
        setCartData(cardData);
        showMiniBasket();
    }

    function deleteGoods(num) {
        // получаем корзину
        let  cardData = getCartData();
        const parent = document.querySelector(`[data-id="${num}"]`);

        // удаляем со страницы и облака
        delete cardData[num];
        parent.remove();
        
        // пересчитываем общую стоимость
        totalSum();
        // перезаписываем данные в sessionstorage
        setCartData(cardData);
        showMiniBasket();
    }

    // подсчет общей стоимости товаров
    function totalSum() {
        const prices = document.querySelectorAll('.basket__item-result'),
                total = document.querySelector('.basket__price');
        let sum = 0;

        prices.forEach(price => {
            sum += +price.innerHTML.replace(/\D/g, ''); 
        });
        total.innerHTML = `${sum} ₽`;
    }

    // подсчет стоимости каждого товара
    function sumItem(parent) {
        const price = +parent.querySelector('.basket__item-price').innerHTML.replace(/\D/g,''),
                num = +parent.querySelector('.basket__item-number').innerHTML;

        // console.log(price, num);
        return price * num;
    }
    

    // обновляем мини-корзину

    function showMiniBasket() {
        const cardData = getCartData(),
              miniBasket = document.querySelector('.header__num');
        let sum = 0;

        for (let items in cardData) {
            sum += cardData[items][3];
        }

        if (sum > 0) {
            miniBasket.style.display = "block";
        } else {
            miniBasket.style.display = "none";

        }
        miniBasket.innerHTML = sum;
    }
    showMiniBasket();

     
});