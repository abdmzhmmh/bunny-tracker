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
var snack_bar_1 = require("@angular/material/snack-bar");
var forms_1 = require("@angular/forms");
var moment = require("moment");
var DatabaseService_1 = require("../../providers/DatabaseService");
var Bunny_1 = require("../../entities/Bunny");
var AddBunnyComponent = /** @class */ (function () {
    function AddBunnyComponent(databaseService, snackBar) {
        var _this = this;
        this.databaseService = databaseService;
        this.snackBar = snackBar;
        this.generalMinDate = moment().subtract(15, 'years');
        this.todaysDate = moment();
        this.data = new forms_1.FormGroup({
            name: new forms_1.FormControl(''),
            surrenderName: new forms_1.FormControl(''),
            gender: new forms_1.FormControl(''),
            intakeDate: new forms_1.FormControl(moment()),
            description: new forms_1.FormControl(''),
            spayDate: new forms_1.FormControl(),
            dateOfBirth: new forms_1.FormControl(),
            intakeReason: new forms_1.FormControl(''),
            rescueType: new forms_1.FormControl()
        });
        console.log('add bunny constructor running');
        databaseService.getGenders().subscribe({
            next: function (genders) {
                _this.allGenders = genders;
            }
        });
        databaseService.getRescueTypes().subscribe({
            next: function (rescueTypeOptions) {
                _this.allRescueTypes = rescueTypeOptions;
            }
        });
    }
    AddBunnyComponent.prototype.ngOnInit = function () {
    };
    AddBunnyComponent.prototype.onSubmit = function () {
        var _this = this;
        this.databaseService.addBunny(new Bunny_1.default(this.data.value.name, this.data.value.gender.value, moment(this.data.value.intakeDate).toDate(), this.data.value.rescueType.value, this.data.value.intakeReason, undefined, this.data.value.surrenderName, moment(this.data.value.dateOfBirth).toDate(), this.data.value.description, moment(this.data.value.spayDate).toDate())).subscribe({
            next: function (value) {
                _this.snackBar.open("The bunny " + value.name + " saved successfully!", undefined, {
                    duration: 2000,
                    panelClass: 'snackbar-message-success'
                });
                _this.data.reset();
                _this.data.get("intakeDate").setValue(moment());
            },
            error: function (error) {
                _this.snackBar.open("Failure occurred while trying to save bunny. Error was " + error, 'Dismiss', {
                    panelClass: 'snackbar-message-failure'
                });
            }
        });
    };
    AddBunnyComponent = __decorate([
        core_1.Component({
            selector: 'app-add-bunny',
            templateUrl: './add-bunny.component.html',
            styleUrls: ['./add-bunny.component.scss']
        }),
        __metadata("design:paramtypes", [DatabaseService_1.DatabaseService, snack_bar_1.MatSnackBar])
    ], AddBunnyComponent);
    return AddBunnyComponent;
}());
exports.AddBunnyComponent = AddBunnyComponent;
//# sourceMappingURL=add-bunny.component.js.map