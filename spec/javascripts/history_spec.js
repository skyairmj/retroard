describe('histroy', function() {

    var history;
    beforeEach(function() {
        var fixture = '<a id="historyHeaderButton"></a>'
                        + '<div id="historyDialog"></div>';
        setFixtures(fixture);

        history = new History();
        history.historyDialog.hide();
        history.initialize();
    });

    it('should toggle history dialog when click history header button', function() {
        history.historyHeaderButton.click();

        expect(history.historyDialog).toBeVisible();

        history.historyHeaderButton.click();

        expect(history.historyDialog).toBeHidden();
    });

    it('should hide history dialog when click document', function() {
        history.historyDialog.show();
        $(document).click();

        expect(history.historyDialog).toBeHidden();
    });

    it('should activate or inactivate history header button when click history header button', function() {
        history.historyHeaderButton.click();

        expect(history.historyHeaderButton).toHaveClass(history.activeClass);

        history.historyHeaderButton.click();

        expect(history.historyHeaderButton).not.toHaveClass(history.activeClass);
    });

    it('should inactive history header button when click document', function() {
        history.historyHeaderButton.addClass(history.activeClass);
        $(document).click();

        expect(history.historyHeaderButton).not.toHaveClass(history.activeClass);
    });

});