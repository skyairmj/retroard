function initializeView() {

    var historyDialog = $('#historyDialog');
    var historyHeaderButton = $('#historyHeaderButton');
    var activeClass = 'active';

    historyHeaderButton.on('click', function(e) {
        if(historyDialog.is(':visible')) {
            historyDialog.hide();
            historyHeaderButton.removeClass(activeClass);
        }
        else {
            historyDialog.show();
            historyHeaderButton.addClass(activeClass);
        }

        e.stopPropagation();
    });

    $(document).on('click', function() {
        historyDialog.hide();
        historyHeaderButton.removeClass(activeClass);
    });
}