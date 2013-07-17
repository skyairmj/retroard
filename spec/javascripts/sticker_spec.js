describe('sticker', function() {
    var sticker;
    beforeEach(function() {
        var fixture = '<div id="stickerDialog"></div>'
                        + '<div id="modal"></div>';
        setFixtures(fixture);
        StickerDialog.initialize();
        StickerDialog.dom.hide();
        StickerDialog.modal.hide();
        sticker = new Sticker(function(){}, 'some uuid', 'well');
    });

    describe('initialize', function() {
        it('should initialize a sticker with empty content and modifying status', function() {
            expect(sticker.content).toBe('');
            expect(sticker.status).toBe('modifying');
            expect(sticker.lastModified).toBe('');
            expect(sticker.uuid).toBeDefined();
            expect(sticker.uuid).not.toBeNull();
            expect(sticker.uuid).not.toBe('');
        });

		it("should add section name to sticker", function() {
			expect(sticker.section).toBe('well')
		});
    });

    describe('update', function() {
        it('should update sticker with data', function() {
            var someDate = new Date();
            sticker.update({
                content: 'some content',
                status: 'some status',
                lastModified: someDate
            });

            expect(sticker.content).toBe('some content');
            expect(sticker.status).toBe('some status');
            expect(sticker.lastModified).toBe(someDate);
        });

        it('should update dom with content', function() {
            sticker.update({
                content: 'some content'
            });

            expect(sticker.dom.find('.sticker-body')).toHaveText('some content');
        });
    });

    describe('remove', function() {
        it('should remove the dom', function() {
            var container = $('<div></div>');
            container.append(sticker.dom);
            sticker.remove();

            expect(container).toBeEmpty();
        });

        it('should call onRemove function', function() {
            spyOn(sticker, 'onRemove');
            sticker.remove();

            expect(sticker.onRemove).toHaveBeenCalled();
        });
    });

    describe('dataToSent', function() {
        it("should generate data to sent", function() {
            window.teamName = 'rca';
            sticker.content = 'content';
            expect(sticker.dataToSent()).toBe($.toJSON({
                'resource': 'sticker',
                'method': 'save',
                'data': {
                    'section': 'well',
                    'uuid': 'some uuid',
                    'lastModified': '',
                    'content': 'content',
                    'teamName': 'rca'
                }
            }));
        });
    });
});
