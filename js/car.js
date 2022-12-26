$(function() {
    //全选和取消全选
    $(".checkall").change(function() {
        $(".checkall, .j-checkbox").prop("checked", $(this).prop("checked"));
        //选中的换背景颜色
        if($(this).prop("checked")){
            $(".j-checkbox").parents(".cart-item").addClass("check-cart-item");
        }else{
            $(".j-checkbox").parents(".cart-item").removeClass("check-cart-item");
        }
    })
    $(".j-checkbox").change(function() {
        //$(".j-checkbox:checked"),选出被选中的复选框
        if($(".j-checkbox").length === $(".j-checkbox:checked").length){
            $(".checkall").prop("checked", true);
        }else{
            $(".checkall").prop("checked", false);
        }
        //选中的换背景颜色
        if($(this).prop("checked")){
            $(this).parents(".cart-item").addClass("check-cart-item");
        }else{
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
        
    })

    //增减商品数量
    $(".increment").click(function() {
        //得到它的兄弟
        var num = $(this).siblings("input").val();
        $(this).siblings("input").val(++num);
        //根据商品数量修改小计
        var p_sum = $(this).parents(".p-num").siblings(".p-sum");
        var p_price = $(this).parents(".p-num").siblings(".p-price").html().substr(1);
        p_sum.html('￥' + num * p_price);
        getNum();
    })
    $('.decrement').click(function() {
        var num = $(this).siblings("input").val();
        if(num > 1){
            $(this).siblings("input").val(--num);
        }
        //根据商品数量修改小计
        var p_sum = $(this).parents(".p-num").siblings(".p-sum");
        var p_price = $(this).parents(".p-num").siblings(".p-price").html().substr(1);
        p_sum.html('￥' + num * p_price);
        getNum();
    })

    //用户输入数量，小计随之更改
    $(".p-num input").change(function() {
        var num = $(this).val();
        var p_sum = $(this).parents(".p-num").siblings(".p-sum");
        var p_price = $(this).parents(".p-num").siblings(".p-price").html().substr(1);
        p_sum.html('￥' + num * p_price);
        getNum();
    })
    
    function getNum() {
        //计算总数量及总价
        var totalNum = 0;
        var totalPrice = 0;
        $(".itxt").each(function(index, domEle){
            
            totalNum += parseInt($(domEle).val()); 
            
        })
        $(".p-sum").each(function(index, domEle){
            totalPrice += parseFloat($(domEle).html().substr(1));//toFixed：保留两位小数
        })
        $(".price-sum em").html(totalPrice.toFixed(2));
        $(".amount-sum em").html(totalNum);
    }
    getNum();//在页面加载进来的时候就计算一次

    //删除商品
    $(".p-action").click(function() {
        $(this).parents(".cart-item").remove();
        getNum();
    })
    //删除选中的商品
    $(".remove-batch").click(function() {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getNum();
    })
    //清空购物车
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getNum();
    })

})