(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Subject')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Subject'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.ngumodal = global.ng.ngumodal || {}),global.ng.core,global.rxjs_Subject));
}(this, (function (exports,_angular_core,rxjs_Subject) { 'use strict';

var NguModalService = /** @class */ (function () {
    function NguModalService() {
        // id: number;
        this.openModal = false;
        this.isOpened = new rxjs_Subject.Subject();
    }
    NguModalService.prototype.open = function (m) {
        this.openModal = true;
        this.isOpened.next({ type: this.openModal, id: m });
        // console.log(this.openModal);
    };
    NguModalService.prototype.close = function (index) {
        this.openModal = false;
        this.isOpened.next({ type: this.openModal, id: index });
        // console.log(this.openModal);
    };
    NguModalService.prototype.confirm = function (m, message) {
        return new Promise(function (resolve) {
            return resolve(window.confirm(message || 'Is it OK?'));
        });
    };
    NguModalService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    NguModalService.ctorParameters = function () { return []; };
    return NguModalService;
}());

var NguModalComponent = /** @class */ (function () {
    function NguModalComponent(modal, el, renderer) {
        this.modal = modal;
        this.el = el;
        this.renderer = renderer;
        this.beforestart = new _angular_core.EventEmitter();
        this.afterstart = new _angular_core.EventEmitter();
        this.beforeend = new _angular_core.EventEmitter();
        this.afterend = new _angular_core.EventEmitter();
    }
    NguModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.modalDiv = this.modalMain1.nativeElement;
        // this.modalDiv1 = this.el.nativeElement.querySelectorAll('.modalTxt')[0];
        // this.modalDiv2 = this.el.nativeElement.querySelectorAll('.modalTxt1')[0];
        // this.overlay = this.el.nativeElement.querySelectorAll('.overlay')[0];
        this.MIndex.backdrop = typeof this.MIndex.backdrop !== 'undefined' ? this.MIndex.backdrop : true;
        // this.renderer.listen(this.modalDiv2, 'click', (event) => {
        //   if (event.target) {
        //     console.log('target 1');
        //   }
        // });
        // this.renderer.listen(this.modalDiv1, 'click', (event) => {
        //   if (event.target) {
        //     console.log('target 2');
        //   }
        // });
        var id = this.generateID();
        this.renderer.setElementClass(this.modalDiv, id, true);
        var styleItem = document.createElement('style');
        if (this.MIndex.width && !this.MIndex.width.fixed) {
            var data = '';
            data += this.MIndex.width.xs ? "@media (max-width:767px){." + id + " .innerdiv {width: " + this.MIndex.width.xs + "}}" : '';
            data += this.MIndex.width.sm ? "@media (min-width:768px){." + id + " .innerdiv {width: " + this.MIndex.width.sm + "}}" : '';
            data += this.MIndex.width.md ? "@media (min-width:992px){." + id + " .innerdiv {width: " + this.MIndex.width.md + "}}" : '';
            data += this.MIndex.width.lg ? "@media (min-width:1200px){." + id + " .innerdiv {width: " + this.MIndex.width.lg + "}}" : '';
            styleItem.innerHTML = data;
        }
        else {
            var width = this.MIndex.width ? (this.MIndex.width.fixed || '310px') : '310px';
            styleItem.innerHTML = "." + id + " .innerdiv {width: " + width + "; min-width: " + width + ";}";
        }
        this.modalDiv.appendChild(styleItem);
        this.modalSub = this.modal.isOpened.subscribe(function (val) {
            // tslint:disable-next-line:no-unused-expression
            val.id === _this.MIndex.id && _this.toggleModal(val.type);
            val.id === 0 && _this.close();
        });
    };
    NguModalComponent.prototype.ngOnDestroy = function () {
        this.modalSub.unsubscribe();
    };
    NguModalComponent.prototype.generateID = function () {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 6; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return "ngumodal" + text;
    };
    NguModalComponent.prototype.close = function () {
        this.modal.close(this.MIndex.id);
    };
    NguModalComponent.prototype.backdrop = function () {
        // tslint:disable-next-line:no-unused-expression
        this.MIndex.backdrop && this.close();
    };
    NguModalComponent.prototype.toggleModal = function (val) {
        var _this = this;
        var body = document.body.style;
        // const overlay = this.el.nativeElement.querySelectorAll('.overlay')[0];
        var modal = this.modalDiv;
        if (!val) {
            this.beforeend.emit();
            this.renderer.setElementClass(modal, 'anim', false);
            setTimeout(function () {
                body.cssText = '';
                _this.openModals = val;
                _this.afterend.emit();
            }, 290);
        }
        else {
            this.beforestart.emit();
            this.openModals = val;
            this.renderer.setElementStyle(this.modalInner.nativeElement, 'transfrom', 'scale(.2) translate3d(2241px, 1400px, 0)');
            setTimeout(function () {
                body.cssText = 'overflow: hidden; padding-right: 19px;';
                // this.renderer.setElementStyle(this.modalInner.nativeElement, 'transfrom', '');
                _this.renderer.setElementClass(modal, 'anim', true);
            }, 2);
            this.afterstart.emit();
        }
    };
    NguModalComponent.prototype.confirm = function (m, message) {
        return new Promise(function (resolve) {
            return resolve(window.confirm(message || 'Is it OK?'));
        });
    };
    NguModalComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'ngu-modal',
                    template: "<div #modal class=\"modal\" [class.in]=\"openModals\"><div class=\"main\"><div class=\"innerdiv\"><div #modalInner class=\"innerMain\"><ng-content></ng-content></div></div><div class=\"overlay\" (click)=\"backdrop()\"></div></div></div>",
                    styles: ["\n    .in {\n      display: table !important;\n    }\n\n    .modal.anim .main .overlay {\n      opacity: 0.48;\n    }\n    .modal.anim .main .innerdiv .innerMain {\n      transform: translateY(0px);\n      opacity: 1;\n    }\n\n    .modal {\n      position: fixed;\n      z-index: 1000;\n      pointer-events: none;\n      top: 0;\n      left: 0;\n      height: 100%;\n      width: 100%;\n      display: none;\n    }\n    .modal .main {\n      display: flex;\n      position: absolute;\n      z-index: 1000;\n      justify-content: center;\n      align-items: center;\n      pointer-events: none;\n      top: 0;\n      left: 0;\n      height: 100%;\n      width: 100%;\n    }\n    .modal .main .innerdiv {\n      z-index: 1000;\n      position: static;\n      pointer-events: auto;\n      top: 0;\n      left: 0;\n      transition: transform 0.3s ease;\n    }\n    .modal .main .innerdiv .innerMain {\n      box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);\n      display: block;\n      padding: 24px;\n      border-radius: 2px;\n      box-sizing: border-box;\n      overflow: auto;\n      max-width: 90vw;\n      max-height: 90vh;\n      margin: auto;\n      outline: 0;\n      width: 100%;\n      height: 100%;\n      background: #fff;\n      color: rgba(0, 0, 0, 0.87);\n      transform: translateY(60px);\n      opacity: 0;\n      transition: 0.3s ease all;\n    }\n    .modal .main .overlay {\n      position: absolute;\n      background: rgba(0, 0, 0, 0.4);\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      opacity: 0;\n      pointer-events: auto;\n      transition: 0.3s ease all;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    NguModalComponent.ctorParameters = function () { return [
        { type: NguModalService, },
        { type: _angular_core.ElementRef, },
        { type: _angular_core.Renderer, },
    ]; };
    NguModalComponent.propDecorators = {
        'MIndex': [{ type: _angular_core.Input },],
        'beforestart': [{ type: _angular_core.Output },],
        'afterstart': [{ type: _angular_core.Output },],
        'beforeend': [{ type: _angular_core.Output },],
        'afterend': [{ type: _angular_core.Output },],
        'modalMain1': [{ type: _angular_core.ViewChild, args: ['modal', { read: _angular_core.ElementRef },] },],
        'modalInner': [{ type: _angular_core.ViewChild, args: ['modalInner', { read: _angular_core.ElementRef },] },],
    };
    return NguModalComponent;
}());

var NguModalModule = /** @class */ (function () {
    function NguModalModule() {
    }
    NguModalModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [],
                    exports: [NguModalComponent],
                    declarations: [NguModalComponent],
                    providers: [NguModalService],
                },] },
    ];
    /** @nocollapse */
    NguModalModule.ctorParameters = function () { return []; };
    return NguModalModule;
}());

exports.NguModalService = NguModalService;
exports.NguModalModule = NguModalModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
