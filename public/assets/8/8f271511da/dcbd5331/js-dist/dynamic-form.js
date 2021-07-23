function dynamicFormHandler(formElem) {
    var form = jQuery(formElem);
    // return false if form still have some validation errors
    if (form.find('.has-error').length) {
        return false;
    }
    var data = new FormData(formElem);
    data.append('submit', 1);

    // submit form
    jQuery.ajax({
        url: form.attr('action'),
        type: 'post',
        data: data,
        processData: false,
        contentType: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.success) {
                jQuery("#modalHeader .close").trigger("click");
                var func = response.callback_function;
                if (func) {
                    //Create the function
                    var param = response.callback_param;
                    var fn = window[func];
                    //Call the function
                    fn(param);
                }
            } else {
                form.yiiActiveForm('updateMessages', response.errors);
                form.find('button[type="submit"]').prop('disabled', false);
            }
        },
        error: function () {
            alert('error');
            console.log('internal server error');
        }
    });
    return false;
}


jQuery('body').on('beforeSubmit', 'form#dynamic-form, form.dynamic-form', function () {
    return dynamicFormHandler(this);
});