var cart = {};

$.getJSON('goods.json', function(data){
       var goods = data;
      //console.log(goods);
    checkCart();
   // console.log(cart);
    showCart();
    
    function showCart() {
        if (  $.isEmptyObject(cart)  ) {
            var out = 'Корзина пуста.';
             $('#my-cart').html(out);
        } else {
        var out = '';
        for (var i in cart){
            out += '<div class="goods__in-cart">';
            out += '<img src="'+goods[i].image+'" class="goods__image-m">';
            out += '<span class="name">'+goods[i].name+'</span>';
            out += '<button class="minus" data-art="'+i+'">-</button>';
            out += cart[i];
            out += '<button class="plus" data-art="'+i+'">+</button>';
            out += 'Цена: ' + cart[i]*goods[i].price;
            out += '<button class="delete" data-art="'+i+'">Удалить</button>';
            out += '</div>';
        }
         
        $('#my-cart').html(out);
        $('.plus').on('click', plusGoods);
        $('.minus').on('click', minusGoods);
        $('.delete').on('click', deleteGoods);
            }
    }
    function showAmount(){
    var out = 0;
    for (var i in cart){
        out += cart[i]*goods[i].price
    }
    $('#amount').html("Общая сума: " + out);
}
    showAmount();
    function plusGoods() {
        var articul = $(this).attr('data-art');
        cart[articul]++;
        saveLocalStorage();
        showCart();
        showAmount();
    }
    function minusGoods() {
        var articul = $(this).attr('data-art');
        if (cart[articul]>0) cart[articul]--;
        saveLocalStorage();
        showCart();
        showAmount();
    }
    function deleteGoods() {
        var articul = $(this).attr('data-art');
        delete cart[articul];
        saveLocalStorage();
        showCart();
        showAmount();
    }
    
});

function checkCart() {
    if ( localStorage.getItem('cart') != null) {
        cart = JSON.parse ( localStorage.getItem('cart'));
    }
}

function saveLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}