$(document).ready(function () {

    $('.content').hide();
    var $mnu = $('#menu').on('click', 'a', function (e) {
        e.preventDefault();
        var $this = $(this), $li = $(this).closest('li');
        if($li.is('.active')){
            return;
        }
        $li.addClass('active');
        var contentID = $li.attr('data-id');
        $mnu.find('.active').not($li).removeClass('active');

        var url = $(this).attr('href');

        $.get(url, function(data){
            $('#div1').html(data);
            $('.content').show();
        });
    });
    $mnu.find('a:first').click();



});
