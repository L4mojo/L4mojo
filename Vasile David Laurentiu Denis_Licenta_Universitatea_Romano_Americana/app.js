let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Breakfast bowl',
        image: '1.PNG',
        price: 8.50 
    },
    {
        id: 2,
        name: 'Breakfast burrito',
        image: '2.PNG',
        price: 9.00
    },
    {
        id: 3,
        name: 'Egg sandwich',
        image: '3.PNG',
        price: 7.50
    },
    {
        id: 4,
        name: 'Avocado toast',
        image: '4.PNG',
        price: 8.00
    },
    {
        id: 5,
        name: 'Fried chicken',
        image: '5.PNG',
        price: 13.00
    },
    {
        id: 6,
        name: 'Seasonal caprese',
        image: '6.PNG',
        price: 12.00
    },
    {
        id: 7,
        name: 'House Roasted Turrkey',
        image: '7.PNG',
        price: 11.00
    },
    {
        id: 8,
        name: 'Tofu Wrap',
        image: '8.PNG',
        price: 10.00
    },
    {
        id: 9,
        name: 'BLT',
        image: '9.PNG',
        price: 10.00
    },
    {
        id: 10,
        name: 'Veggie Burger',
        image: '6.PNG',
        price: 10.00
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}