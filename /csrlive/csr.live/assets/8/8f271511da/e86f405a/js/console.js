function Jslogger() {
    let timer = 2000;
    let messages = [];
    this.log = function (params) {
        messages.push(params);
    };
    let looper = function () {
        if (messages.length > 0) {
            try {
                $.post('/site/error-log', { log: JSON.stringify(messages) }, function () {
                    messages = [];
                });
            } catch (e) {
            }
        }
        setTimeout(looper, timer);
    };
    $(document).ready(function () {
        setTimeout(looper, timer);
    });
}
var jslogger = new Jslogger();
window.onerror = function (message, source, lineno, colno, error) {
    if (typeof 'message' === 'string') {
        jslogger.log([message, source, lineno, colno]);
    }
};
if (window.console) {
    window.console.error = (function () {
        var error = console.error;

        return function () {
            let message = [];
            for (let arg of Array.prototype.slice.call(arguments)) {
                message.push(typeof arg === 'object' ? JSON.stringify(arg) : arg);
            }
            jslogger.log([message.join(' '), window.location.href]);

            return error.apply(console, arguments);
        }
    })();
}
let sessionExpire, sessionExpireAlert;
function updateSessionExpire(timeout) {
    timeout = timeout || 1800;
    sessionExpire = new Date()
    sessionExpire.setMilliseconds(sessionExpire.getMilliseconds() + timeout * 1000);
}
updateSessionExpire();
$(document).ajaxSuccess(function () {
    updateSessionExpire();
});
function checkSessionExpire() {
    let now = new Date();
    let diff = Math.round((sessionExpire.getTime() - now.getTime()) / 1000);
    if (diff < 0) {
        location.href = '/logout';
        return;
    }
    else if (diff < 60) {
        if (!sessionExpireAlert) {
            sessionExpireAlert = true;
            swal({
                title: console_lang_items['title_warning'],
                type: 'warning',
                html: true,
                text: console_lang_items['text_session_expire'].replace('{counter}', '<span class="text-center session-expire-time"></span>'),
                confirmButtonText: console_lang_items['btn_confirm'],
            }, function (isConfirm) {
                if (isConfirm) {
                    sessionExpireAlert = false;
                    updateSessionExpire();
                    $.ajax({
                        url: '/site/ping'
                    });
                }
            });
        }
        $('.session-expire-time').html('<h2>' + diff + '</h2>');
    }
    setTimeout(checkSessionExpire, 300);
}
setTimeout(checkSessionExpire, 300);
$(document).ready(function() {
    $.fn.modal.Constructor.prototype.enforceFocus = function() {};
    $.fn.modal.Constructor.prototype._enforceFocus = function() {};
});
