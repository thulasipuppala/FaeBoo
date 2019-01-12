"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var PasswordStrengthBarComponent = /** @class */ (function () {
    function PasswordStrengthBarComponent(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.colors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];
    }
    PasswordStrengthBarComponent.prototype.measureStrength = function (p) {
        var force = 0;
        var regex = /[$-/:-?{-~!"^_`\[\]]/g; // "
        var lowerLetters = /[a-z]+/.test(p);
        var upperLetters = /[A-Z]+/.test(p);
        var numbers = /[0-9]+/.test(p);
        var symbols = regex.test(p);
        var flags = [lowerLetters, upperLetters, numbers, symbols];
        var passedMatches = flags.filter(function (isMatchedFlag) {
            return isMatchedFlag === true;
        }).length;
        force += 2 * p.length + (p.length >= 10 ? 1 : 0);
        force += passedMatches * 10;
        // penalty (short password)
        force = p.length <= 6 ? Math.min(force, 10) : force;
        // penalty (poor variety of characters)
        force = passedMatches === 1 ? Math.min(force, 10) : force;
        force = passedMatches === 2 ? Math.min(force, 20) : force;
        force = passedMatches === 3 ? Math.min(force, 40) : force;
        return force;
    };
    PasswordStrengthBarComponent.prototype.getColor = function (s) {
        var idx = 0;
        if (s <= 10) {
            idx = 0;
        }
        else if (s <= 20) {
            idx = 1;
        }
        else if (s <= 30) {
            idx = 2;
        }
        else if (s <= 40) {
            idx = 3;
        }
        else {
            idx = 4;
        }
        return { idx: idx + 1, col: this.colors[idx] };
    };
    Object.defineProperty(PasswordStrengthBarComponent.prototype, "passwordToCheck", {
        set: function (password) {
            if (password) {
                var c = this.getColor(this.measureStrength(password));
                var element = this.elementRef.nativeElement;
                if (element.className) {
                    this.renderer.setElementClass(element, element.className, false);
                }
                var lis = element.getElementsByTagName('li');
                for (var i = 0; i < lis.length; i++) {
                    if (i < c.idx) {
                        this.renderer.setElementStyle(lis[i], 'backgroundColor', c.col);
                    }
                    else {
                        this.renderer.setElementStyle(lis[i], 'backgroundColor', '#DDD');
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], PasswordStrengthBarComponent.prototype, "passwordToCheck", null);
    PasswordStrengthBarComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'jhi-password-strength-bar',
            template: "\n        <div id=\"strength\">\n            <small jhiTranslate=\"global.messages.validate.newpassword.strength\">Password strength:</small>\n            <ul id=\"strengthBar\">\n                <li class=\"point\"></li>\n                <li class=\"point\"></li>\n                <li class=\"point\"></li>\n                <li class=\"point\"></li>\n                <li class=\"point\"></li>\n            </ul>\n        </div>",
            styleUrls: ['password-strength-bar.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [core_1.Renderer, core_1.ElementRef])
    ], PasswordStrengthBarComponent);
    return PasswordStrengthBarComponent;
}());
exports.PasswordStrengthBarComponent = PasswordStrengthBarComponent;
//# sourceMappingURL=password-strength-bar.component.js.map