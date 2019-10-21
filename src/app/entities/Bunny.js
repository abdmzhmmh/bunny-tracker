"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var Bunny = /** @class */ (function () {
    function Bunny(name, gender, intakeDate, rescueType, intakeReason, id, surrenderName, dateOfBirth, description, spayDate, passedAwayDate) {
        this.name = name;
        this.gender = gender;
        this.intakeDate = intakeDate;
        this.rescueType = rescueType;
        this.intakeReason = intakeReason;
        this.id = id;
        this.surrenderName = surrenderName;
        this.dateOfBirth = dateOfBirth;
        this.description = description;
        this.spayDate = spayDate;
        this.passedAwayDate = passedAwayDate;
    }
    Bunny.from = function (formGroup, id) {
        return new Bunny(formGroup.controls.name.value, formGroup.controls.gender.value, formGroup.controls.intakeDate.value ? moment(formGroup.controls.intakeDate.value).startOf('day').toDate() : null, formGroup.controls.rescueType.value, formGroup.controls.intakeReason.value, id, formGroup.controls.surrenderName.value, formGroup.controls.dateOfBirth.value ? moment(formGroup.controls.dateOfBirth.value).startOf('day').toDate() : null, formGroup.controls.description.value, formGroup.controls.spayDate.value ? moment(formGroup.controls.spayDate.value).startOf('day').toDate() : null);
    };
    return Bunny;
}());
exports.default = Bunny;
//# sourceMappingURL=Bunny.js.map