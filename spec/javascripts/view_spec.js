describe('view', function() {
    describe('history', function() {
        var historyHeaderButton;
        var historyDialog;
        var activeClass = 'active';

        beforeEach(function() {
            var fixture = '<a id="historyHeaderButton"></a>'
                            + '<div id="historyDialog"></div>';
            setFixtures(fixture);

            historyHeaderButton = $('#historyHeaderButton');
            historyDialog = $('#historyDialog');

            historyDialog.hide();

            initializeView();
        });

        it('should toggle history dialog when click history header button', function() {
            historyHeaderButton.click();

            expect(historyDialog).toBeVisible();

            historyHeaderButton.click();

            expect(historyDialog).toBeHidden();
        });

        it('should hide history dialog when click document', function() {
            historyDialog.show();
            $(document).click();

            expect(historyDialog).toBeHidden();
        });

        it('should activate or inactivate history header button when click history header button', function() {
            historyHeaderButton.click();

            expect(historyHeaderButton).toHaveClass(activeClass);

            historyHeaderButton.click();

            expect(historyHeaderButton).not.toHaveClass(activeClass);
        });

        it('should inactive history header button when click document', function() {
            historyHeaderButton.addClass(activeClass);
            $(document).click();

            expect(historyHeaderButton).not.toHaveClass(activeClass);
        });
    });
});