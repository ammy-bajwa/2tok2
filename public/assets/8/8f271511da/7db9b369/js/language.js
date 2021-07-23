function changeLanguage(id) {
    $.ajax({
        url: '/site/change-language?language=' + id,
        type: 'post',
        dataType: 'json',
        success: function () {
            location.reload();
        }
    });
}
