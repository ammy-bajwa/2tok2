;var Modal = function (options, modalOptions) {
    let _this = this;
    this.title = options.title || '';
    this.content = options.content || '';
    this.size = options.size || 'modal-md';
    this.noModalBodyPadding = options.noModalBodyPadding || false;
    this.modalOptions = modalOptions || {};
    this.modalOptions.backdrop = 'static';
    this.afterClose = options.afterClose || null;
    this.afterShown = options.afterShown || null;
    this.unClosable = options.unClosable || false;

    let modalContainer = jQuery('#modal'),
        titleContinaer = jQuery('#modalHeaderTitle'),
        contentContainer = jQuery('#modalContent');

    modalContainer.off('hidden.bs.modal');

    this.resetModalContent = function () {
        titleContinaer.html('');
        contentContainer.html('');
        modalContainer.find('.modal-body').removeClass('no-padding');
        modalContainer.find('button.close').show();
    };

    this.resetModalContent();

    if (this.noModalBodyPadding) {
        modalContainer.find('.modal-body').addClass('no-padding');
    }

    titleContinaer.html(this.title);
    contentContainer.html(this.content);

    modalContainer.modal(this.modalOptions);
    if(this.unClosable){
        modalContainer.off('keydown.dismiss.bs.modal');
        modalContainer.find('button.close').hide();
    }

    jQuery('#modal .modal-dialog').removeClass('modal-md').addClass(this.size);
    let toolTips = jQuery('.modal-body').find('[data-toggle="tooltip"]');
    if (toolTips.length > 0){
        toolTips.tooltip();
    }

    if (this.afterClose !== null){
        modalContainer.on('hidden.bs.modal', function () {
            if (typeof _this.afterClose=== 'function') {
                _this.afterClose();
            }
        });
    }

    if (this.afterShown !== null){
        modalContainer.on('shown.bs.modal', function () {
            if (typeof _this.afterShown === 'function'){
                _this.afterShown();
            }
        });
    }
};