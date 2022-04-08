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

export {getCartData, setCartData, showMiniBasket};