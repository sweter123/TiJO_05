describe('app', function () {
    'use strict';

    var app = window.app;
    describe('generateMessage', function () {
        it('should return number of vowels and false if text isn`t palindrome', function () {
            expect(app.generateMessage("tak albo nie")).toEqual({vowel: 5, palindrome: false});
        });
        it('should return number of vowels and true if text is palindrome', function () {
            expect(app.generateMessage("ala")).toEqual({vowel: 2, palindrome: true});
        });
        it('should throw error "Empty string!" ', function () {
            expect(function(){ app.generateMessage("");} ).toThrowError('Empty string!');
        });
    });

    describe('isPalindrome', function () {
        describe('toHaveBeenCalled', function () {
            beforeAll(function () {
                spyOn(app, 'isPalindrome');
                app.generateMessage("tak albo nie");
            });
            it('should call isPalindrome function', function () {
                expect(app.isPalindrome).toHaveBeenCalled();
                expect(app.isPalindrome).toHaveBeenCalledWith("tak albo nie");
            });
        });

        describe('and.callThrough', function () {
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.callThrough();
                app.generateMessage("tak albo nie");
            });
            it('should call isPalindrome function when generateMessage is call', function () {
                expect(app.isPalindrome).toHaveBeenCalled();
                expect(app.isPalindrome).toHaveBeenCalledWith("tak albo nie");
            });
        });

        describe('and.returnValue', function () {
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.returnValue(false);
            });
            it('should call isPalindrome and return false', function () {
                expect(app.isPalindrome("tak albo nie")).toEqual(false);
            });
            it('should call generate message and isPalindrome should return false', function () {
                expect(app.generateMessage("tak albo nie")).toEqual({vowel: 5, palindrome: false});
            });
        });

        describe('and.callFake', function () {
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.callFake(function(str){
                    for (var i=0;i<str.length;i++){
                        if (str[i] == ' '){
                            return true;
                        }
                    }
                    return false;
                });
            });
            it('should call isPalindrome fake function', function () {
                expect(app.isPalindrome("tak albo nie")).toEqual(true);
            });
            it('should call generateMessage and isPalindrome fake function', function () {
                expect(app.generateMessage("tak albo nie")).toEqual({vowel: 5, palindrome: true});
            });
        });

        describe('calls.count()', function () {
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.callThrough();
            });
            it('should notice that call isPalindrome is call', function () {
                app.isPalindrome("kajak");
                expect(app.isPalindrome.calls.count()).toBe(1);
            });
            it('should notice that isPalindrome is call when generateMessage is call', function () {
                app.generateMessage("kajak");
                expect(app.isPalindrome.calls.count()).toEqual(2);
            });
        });
    });

    describe('vowelCount', function () {

        describe('toHaveBeenCalled', function () {
            beforeAll(function () {
                spyOn(app, 'vowelCount');
                app.vowelCount("tak albo nie");
            });
            it('should call vowelCount function', function () {
                expect(app.vowelCount).toHaveBeenCalled();
                expect(app.vowelCount).toHaveBeenCalledWith("tak albo nie");
            });
        });

        describe('and.callThrough', function () {
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.callThrough();
                app.vowelCount("tak albo nie");
            });
            it('should call vowelCount function', function () {
                expect(app.vowelCount).toHaveBeenCalled();
                expect(app.vowelCount).toHaveBeenCalledWith("tak albo nie");
            });
        });

        describe('and.returnValue', function () {
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.returnValue(5);
            });
            it('should call vowelCount function and return 5', function () {
                expect(app.vowelCount("tak albo nie")).toEqual(5);
            });
            it('should call generateMessage function and vowelCount function should return 5', function () {
                expect(app.generateMessage("tak albo nie")).toEqual({vowel: 5, palindrome: false});
            });
        });

        describe('and.callFake', function () {
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.callFake(function(str){
                    var liczba=0;
                    for (var i=0;i<str.length;i++){
                        if (str[i] == ' '){
                            liczba++;
                        }
                    }
                    return liczba;
                });
            });
            it('should call vowelCount when the generateMessage function is called', function () {
                expect(app.vowelCount("tak albo nie")).toEqual(2);
                expect(app.generateMessage("tak albo nie")).toEqual({vowel: 2, palindrome: false});
            });
        });

        describe('calls.count()', function () {
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.callThrough();
            });
            it('should notice that vowelCount is call', function () {
                app.vowelCount("tak albo nie");
                expect(app.vowelCount.calls.count()).toBe(1);
            });
            it('should notice that vowelCount is call when generateMessage is call', function () {
                app.generateMessage("tak albo nie");
                expect(app.vowelCount.calls.count()).toBe(2);
            });
        });
    });
});

