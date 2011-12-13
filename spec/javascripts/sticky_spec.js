describe('sticky', function() {
    var sticky;
    beforeEach(function() {
        var fixture = '<div id="stickyDialog"></div>'
                        + '<div id="modal"></div>';
        setFixtures(fixture);
        StickyDialog.initialize();
        StickyDialog.dom.hide();
        StickyDialog.modal.hide();
        sticky = new Sticky(function(){});
    });

    describe('initialize', function() {
        it('should initialize a sticky with empty content and modifying status', function() {
            expect(sticky.content).toBe('');
            expect(sticky.status).toBe('modifying');
        });

        it('should pop up a sticky dialog and the modal', function() {
            expect(StickyDialog.dom).toBeVisible();
            expect(StickyDialog.modal).toBeVisible();
        });

        it('should not be able to scroll the window', function() {
            this.after(function() {
                $('body').css('overflow', 'visible');
            });

            expect($('body').css('overflow')).toBe('hidden');
        });
    });

    describe('update', function() {
        it('should update sticky with data', function() {
            sticky.update({
                content: 'some content',
                status: 'some status'
            });

            expect(sticky.content).toBe('some content');
            expect(sticky.status).toBe('some status');
        });

        it('should update dom with content', function() {
            sticky.update({
                content: 'some content'
            });

            expect(sticky.dom.find('.stickyText')).toHaveText('some content');
        });
    });

    describe('remove', function() {
        it('should remove the dom', function() {
            var container = $('<div></div>');
            container.append(sticky.dom);
            sticky.remove();

            expect(container).toBeEmpty();
        });

        it('should call onRemove function', function() {
            spyOn(sticky, 'onRemove');
            sticky.remove();

            expect(sticky.onRemove).toHaveBeenCalled();
        });
    });
});