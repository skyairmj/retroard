describe('sticky', function() {
    var sticky;
    beforeEach(function() {
        var fixture = '<div id="stickyDialog"></div>'
                        + '<div id="modal"></div>';
        setFixtures(fixture);
        StickyDialog.initialize();
        StickyDialog.dom.hide();
        StickyDialog.modal.hide();
        sticky = new Sticky(function(){}, 'some uuid', 'well');
    });

    describe('initialize', function() {
        it('should initialize a sticky with empty content and modifying status', function() {
            expect(sticky.content).toBe('');
            expect(sticky.status).toBe('modifying');
            expect(sticky.lastModified).toBe('');
            expect(sticky.uuid).toBeDefined();
            expect(sticky.uuid).not.toBeNull();
            expect(sticky.uuid).not.toBe('');
        });

		it("should add section name to sticky", function() {
			expect(sticky.section).toBe('well')
		});
    });

    describe('update', function() {
        it('should update sticky with data', function() {
            var someDate = new Date();
            sticky.update({
                content: 'some content',
                status: 'some status',
                lastModified: someDate
            });

            expect(sticky.content).toBe('some content');
            expect(sticky.status).toBe('some status');
            expect(sticky.lastModified).toBe(someDate);
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
