const body = document.querySelector('body');
let page = document.querySelector('.page')
let popUp = document.querySelector(".pop-up");
let close_popUp = document.querySelector(".close-button");


// Pop up
function showPopUp() {
    popUp.classList.add("show");
    page.classList.add("blur");
    document.body.style.overflow = 'hidden';
    document.addEventListener('click', handleDocumentClick);
};

function closePopUp() {
    popUp.classList.remove("show");
    page.classList.remove("blur");
    document.body.style.overflow = 'auto';
}
const popUpbtn = document.querySelector('.popup-button');

popUpbtn.addEventListener('click', closePopUp);

close_popUp.onclick = () => {
    closePopUp();
};

function handleDocumentClick(event) {
    if (!popUp.contains(event.target)) {
        closePopUp();
        document.removeEventListener('click', handleDocumentClick);
    }
}
var timeoutID;

function showPopUpAfter5sec() {
    timeoutID = window.setTimeout(showPopUp, 5000);

}
showPopUpAfter5sec()


//Cart/
const cart = document.querySelector('.cart');  //Find cart
const cartClose = document.querySelector('.cart__close'); //Find button close the cart
const cartLink = document.querySelector('.square');   //Find button open the cart 
const counterIndicator = document.querySelector('[data-counterIndicator]'); //Find cart Indicator
const cartContainer = cart.querySelector('.cart__container');   //Find a basket of goods container
const cart__summary = cart.querySelector('.cart__summary');      //Find the field of the amount by the product

/*Open the cart */
cartLink.addEventListener('click', function () {
    cart.classList.toggle('open');
    document.body.classList.toggle('active');
});

/*Close the basket*/
cartClose.addEventListener('click', function () {
    cart.classList.remove('open');
    document.body.classList.remove('active');
});

/*Find elements of the title, message and basement basement*/
const cart__title = cart.querySelector('.cart__title');
const cart__message = cart.querySelector('.cart__message');
const cart__bottom = cart.querySelector('.cart__bottom');

/*The function of counting the amount of the 1st product and all */
function calcAndPrintSumCart() {
    const totalPriceContainer = document.querySelector('.cart__summary');
    const itemInCard = document.querySelectorAll('.cart__product');
    let totalCartSum = 0;

    itemInCard.forEach(function (card) {
        const thisCardCount = card.querySelector('[data-counter]');
        const thisCardPrice = card.querySelector('.cart__product-price');
        const thisCardSummary = card.querySelector('.cart__product-summary');
        const thisCardSum = parseFloat(thisCardCount.value) * parseFloat(thisCardPrice.innerText);
        thisCardSummary.innerText = thisCardSum + '$ USD.';
        totalCartSum = totalCartSum + thisCardSum;
    });
    totalPriceContainer.innerText = 'To pay ' + totalCartSum + '$ USD.';

}
/*Func of changes in the goods meter on the cart icon */
function countChange() {
    let countInCart = 0;
    const allCard = document.querySelectorAll('.cart__product');
    allCard.forEach(function (item) {
        const thisCounter = item.querySelector('[data-counter]');
        countInCart = countInCart + parseInt(thisCounter.value);
    });
    counterIndicator.innerText = countInCart;
    if (countInCart === 0) {
        counterIndicator.innerText = "0";
    }
}/*Func of changes in the counter of goods by entering in the Input */
function inputCountChange() {
    const allCounterInput = document.querySelectorAll('[data-counter]');
    allCounterInput.forEach(function (input) {
        input.oninput = function () {
            if (parseInt(input.value) < 0) {
                input.value = 0;
            }
            else if (input.value == '-') {
                input.value = 0;
            }
        }

    })
};
function ShowMessageInCart() {

    if (cart.querySelector('.cart__product') != null) {
        cart__title.classList.add('WithProduct');
        cart__message.classList.add('WithProduct');
        cart__bottom.classList.add('WithProduct');
    }
    else {
        cart__title.classList.remove('WithProduct');
        cart__message.classList.remove('WithProduct');
        cart__bottom.classList.remove('WithProduct');
    }

}
document.addEventListener('click', function (event) {

    /*When pressed on add to cart btn*/
    if (event.target.hasAttribute("data-addCartButton")) {
        /*Take information about the chosen product */
        const currentCard = event.target.closest('.product-card');
        const currentCardInfo = {
            articul: currentCard.dataset.articul,
            imgSrc: currentCard.querySelector('img').getAttribute("src"),
            title: currentCard.querySelector('.product-title').innerText,
            price: parseFloat(currentCard.querySelector(".price").innerText.replace("$", "").replace("USD", "")),
            count: parseInt(currentCard.querySelector('input[type="number"]').value)
        }


        /*If already in cart */
        let isProductInCart = false;
        const allProductInCart = cartContainer.querySelectorAll('.cart__product');
        allProductInCart.forEach(function (productInCart) {
            const dataArticul = productInCart.dataset.articul;
            if (dataArticul === currentCardInfo.articul) {
                const dataTitle = productInCart.querySelector('.cart__product-title').innerText;
                const dataPrice = parseFloat(productInCart.querySelector('.cart__product-price').innerText);
                if (dataTitle === currentCardInfo.title && dataPrice === currentCardInfo.price) {
                    const dataCounter = productInCart.querySelector('[data-counter]');
                    dataCounter.value = parseInt(dataCounter.value) + currentCardInfo.count;
                    isProductInCart = true;
                }
            }
        });

        if (!isProductInCart) {
            /*Cards template*/
            let productInCartHtml =
                `<div class="cart__product" data-articul="${currentCardInfo.articul}">
    <div class="cart__product-remove">
        Delete
    </div>
    <div class="cart__product-photo">
        <img src="${currentCardInfo.imgSrc}" alt="product" width="150">
    </div>
    <div class="cart__product-info">
        <div class="cart__product-title">
            ${currentCardInfo.title}
        </div>
        <div class="cart__product-price">
            ${currentCardInfo.price}
        </div>
        <div class="cart__product-actions">
            <button data-action="minus">-</button>
            <input type="text" name="" value="${currentCardInfo.count}" data-counter id="">
            <button data-action="plus">+</button>
        </div>
        <div class="cart__product-summary">
        </div>
    </div>
        </div>`;

            cartContainer.insertAdjacentHTML('beforeend', productInCartHtml);
        }



    }
    /*Change the amount of goods in the cart*/
    if (event.target.closest('.cart__product')) {
        const cardCounter = event.target.closest('.cart__product').querySelector('[data-counter]');
        /*If you press the minus*/
        if (event.target.dataset.action === 'minus') {
            /*If there are more goods then 1*/
            if (cardCounter.value > 1) {
                cardCounter.value = --cardCounter.value;


            }
            /*If there are fewer goods*/
            else {
                cardCounter.closest('.cart__product').remove();

            }
        }
        /*If you press the plus*/
        if (event.target.dataset.action === 'plus') {
            cardCounter.value = ++cardCounter.value;

        }
        if (event.target.classList.contains('cart__product-remove')) {
            event.target.closest('.cart__product').remove();
        }


    }
    countChange();
    calcAndPrintSumCart();
    inputCountChange();
    ShowMessageInCart();

});














//Show and close burger-menu
let burger = document.querySelector(".menu-burger");
let links = document.querySelector(".links");

burger.addEventListener("click", function () {
    burger.classList.toggle("open");
    links.classList.toggle("show");
});

