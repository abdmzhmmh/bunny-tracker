"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ngx_electron_1 = require("ngx-electron");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var ipcEvents_1 = require("../ipcEvents");
var DatabaseService = /** @class */ (function () {
    function DatabaseService(electronService) {
        this.electronService = electronService;
    }
    DatabaseService.prototype.getBunny = function (id) {
        return rxjs_1.of(this.electronService.ipcRenderer.sendSync(ipcEvents_1.default.getBunny, id)).pipe(operators_1.catchError(function (error) { return rxjs_1.throwError(error.json); }));
    };
    DatabaseService.prototype.getAllBunnies = function () {
        return rxjs_1.of(this.electronService.ipcRenderer.sendSync(ipcEvents_1.default.getBunnies)).pipe(operators_1.catchError(function (error) { return rxjs_1.throwError(error.json); }));
    };
    DatabaseService.prototype.addBunny = function (bunny) {
        return rxjs_1.of(this.electronService.ipcRenderer.sendSync(ipcEvents_1.default.addBunny, bunny)).pipe(operators_1.catchError(function (error) { return rxjs_1.throwError(error.json); }));
    };
    DatabaseService.prototype.getGenders = function () {
        return rxjs_1.of(this.electronService.ipcRenderer.sendSync(ipcEvents_1.default.getGenders)).pipe(operators_1.catchError(function (error) { return rxjs_1.throwError(error.json); }));
    };
    DatabaseService.prototype.getRescueTypes = function () {
        if (!this.rescueTypesCache) {
            return rxjs_1.of(this.electronService.ipcRenderer.sendSync(ipcEvents_1.default.getRescueTypes)).pipe(operators_1.catchError(function (error) { return rxjs_1.throwError(error.json); }));
        }
        else {
            return rxjs_1.of(this.rescueTypesCache);
        }
    };
    DatabaseService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ngx_electron_1.ElectronService])
    ], DatabaseService);
    return DatabaseService;
}());
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=DatabaseService.js.map