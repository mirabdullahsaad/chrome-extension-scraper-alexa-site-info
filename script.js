function initial_request(){
    var shops = scrapper_shop;
    if(shops == ''){
        alert("Shop urls can't be blank");
    }else{
        shops = shops.split(',')
        for (var i = 0; i < shops.length; i++) {
            $.ajax({
                url: 'https://saad.eastus.cloudapp.azure.com/scrapper.php',
                data:{initial_request : true, shop_name: shops[i]},
                type: 'POST',
                async:false,
                cache: false,
                success: function(res) {
                    if (res.trim() == 'success') {
                        get_data_for_this_shop(shops[i]);
                    }
                } 
            });
        }
    }

}

function get_data_for_this_shop(shop){
    console.log(shop);
    $.ajax({
        url: 'https://www.alexa.com/siteinfo/'+shop,
        type: 'GET',
        async:false,
        cache: false,
        success: function(res) {
            var text = res.toString();
			var score_data = [];
			$(text).find('.overlap').find('.Row').each(function(){
				var temp_data = {};
				temp_data['overlap_score'] = $(this)[0].childNodes[1].dataset.popsicle;
				temp_data['shop_name'] = $(this)[0].childNodes[3].dataset.popsicle;
				temp_data['rank'] = $(this)[0].childNodes[5].dataset.popsicle;
				score_data.push(temp_data);
			});
			$.ajax({
                url: 'https://saad.eastus.cloudapp.azure.com/scrapper.php',
                data:{req_with_value : true, score_data : score_data, shop : shop},
                type: 'POST',
                async:false,
                cache: false,
                success: function(res) {
                    if (res.trim() != 'failed') {
                        res = JSON.parse(res.trim());
                        if(res.count < 100){
                            if (res.status == "0") {
                                get_data_for_this_shop(res.shop_name);
                            }
                        }
                    }
                } 
            });
        }
    });
}

initial_request();
