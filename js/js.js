var cart = {};

$('document').ready(function(){
    loadGoods();
    checkCart();
    showCartGoods();
});
    function loadGoods() {
        $.getJSON('goods.json', function (data) {
            var out = '';
            for (var key in data){
                out+='<div class="single-goods">';
                out+='<h3>'+data[key]['name']+'</h3>';
                out+='<p>Цена: '+data[key]['price']+'</p>';
                out+='<p class="goods__description">Описание товара: '+data[key]['description']+'</p>';
                out+='<img src="'+data[key].image+'">';
                out+='<button class="buy" data-art="'+key+'">В корзину</button>';
                out+='</div>';
            }
            $('#goods').html(out);
            $('button.buy').on('click', addToCart);
        });
    }
function addToCart() {
    var articul = $(this).attr('data-art');
    if (cart[articul]!=undefined) {
        cart[articul]++;
    } else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart) );
    showCartGoods();
}
function checkCart() {
    if ( localStorage.getItem('cart') != null) {
        cart = JSON.parse ( localStorage.getItem('cart'));
    }
}

function showCartGoods(){
    var out = 0;
    for (var i in cart){
        out += cart[i]
    }
    $('#cart-goods').html("Товаров в корзине: " + out);
}