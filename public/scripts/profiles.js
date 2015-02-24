
$(document).ready(function () {
    console.log('loading');
    var btcGood = false;
    var usernameGood = false;
    var passGood = false;
    var emailGood = false;

    $('#btc').on('keyup change', function() {
        console.log($('#btc')[0].value);
        if (/^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/.test($('#btc')[0].value)){
            btcGood = true;
            if (btcGood&&usernameGood&&passGood&&emailGood)
                $('#btn-login').prop('disabled', false);
        } else {
            btcGood = false;
            $('#btn-login').prop('disabled', true);
        }
    });

    $('#username').on('keyup change', function() {
        console.log($('#username')[0].value);
        if (/^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/.test($('#username')[0].value)){
            usernameGood = true;
            if (btcGood&&usernameGood&&passGood&&emailGood)
                $('#btn-login').prop('disabled', false);
        } else {
            usernameGood = false;
            $('#btn-login').prop('disabled', true);
        }
    });

    $('#key').on('keyup change', function() {
        console.log($('#key')[0].value);
        if (/^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/.test($('#key')[0].value)){
            passGood = true;
            if (btcGood&&usernameGood&&passGood&&emailGood)
                $('#btn-login').prop('disabled', false);
        } else {
            passGood = false;
            $('#btn-login').prop('disabled', true);
        }
    });


    $('#email').on('keyup change', function() {
        console.log($('#email')[0].value);
        if (/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test($('#email')[0].value)){
            emailGood = true;
            if (btcGood&&usernameGood&&passGood&&emailGood)
                $('#btn-login').prop('disabled', false);
        } else {
            emailGood = false;
            $('#btn-login').prop('disabled', true);
        }
    });

    $('#btn-login').click( function() {
        $.ajax({
            url: '/login',
            type: 'POST',
            dataType: 'json',
            data: $('#login-form').serialize(),
            success: function(data) {
                console.log(data);
                if (data.success){
                    $('#alert1').slideDown();
                } else {
                    $('#alert2').slideDown();
                }
            }
        });
    });

});


