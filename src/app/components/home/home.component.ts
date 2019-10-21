import { Component, OnInit } from '@angular/core';
import Bunny from '../../entities/Bunny';
import { DatabaseService } from '../../providers/DatabaseService';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GenderOption, RescueTypeOption } from '../add-bunny/add-bunny.component';
import * as moment from 'moment';
import { AlertService } from '../../providers/AlertService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  autoSuggest = new FormControl();
  bunnies: Bunny[] = [];
  filteredBunnies: Observable<Bunny[]>;
  selectedBunny: Bunny;
  data: FormGroup;
  allGenders: GenderOption[];
  allRescueTypes: RescueTypeOption[];
  generalMinDate = moment().subtract(15, 'years').startOf('day');
  todaysDate = moment().startOf('day');

  constructor(private databaseService: DatabaseService, private alertService: AlertService) {

  }

  private _filter(bunnyName: string): Bunny[] {
    if (!bunnyName) {
      return this.bunnies;
    }

    let filterValue = bunnyName.toLowerCase();

    return this.bunnies.filter(bunny => bunny.name.toLowerCase().includes(filterValue));
  }

  public pickBunny(optionSelected: MatAutocompleteSelectedEvent) {
    this.selectedBunny = this.bunnies.find((value: Bunny) => {
      return value.id === +optionSelected.option.id;
    });

    this.data = new FormGroup({
      name: new FormControl(this.selectedBunny.name),
      surrenderName: new FormControl(this.selectedBunny.surrenderName),
      gender: new FormControl(this.selectedBunny.gender),
      intakeDate: new FormControl(this.selectedBunny.intakeDate ? moment(this.selectedBunny.intakeDate, 'YYYY/MM/DD HH:mm:ss.SSS') : null),
      description: new FormControl(this.selectedBunny.description),
      spayDate: new FormControl(this.selectedBunny.spayDate ? moment(this.selectedBunny.spayDate, 'YYYY/MM/DD HH:mm:ss.SSS') : null),
      dateOfBirth: new FormControl(this.selectedBunny.dateOfBirth ? moment(this.selectedBunny.dateOfBirth, 'YYYY/MM/DD HH:mm:ss.SSS') : null),
      intakeReason: new FormControl(this.selectedBunny.intakeReason),
      rescueType: new FormControl(this.selectedBunny.rescueType),
    });
  }

  public onSubmit() {
    this.databaseService.updateBunny(Bunny.from(this.data, this.selectedBunny.id)).subscribe({
      complete: () => {
        this.alertService.databaseSuccessSavingBunny(this.data.controls.name.value);
        this.data.reset();
        this.autoSuggest.reset();
        this.databaseService.getAllBunnies().subscribe((bunnies: Bunny[]) => {
          this.bunnies = bunnies;
        }, (error) => {
          this.alertService.databaseErrorFetching(error);
        });
      },
      error: (error) => {
        this.alertService.databaseErrorSavingBunny(this.data.controls.name.value, error);
      }
    });

  }

  ngOnInit(): void {
    this.filteredBunnies = this.autoSuggest.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.databaseService.getAllBunnies().subscribe((bunnies: Bunny[]) => {
      this.bunnies = bunnies;
    }, (error) => {
      this.alertService.databaseErrorFetching(error);
    });
    this.databaseService.getGenders().subscribe({
      next: (genders: GenderOption[]) => {
        this.allGenders = genders;
      }
    });
    this.databaseService.getRescueTypes().subscribe({
      next: (rescueTypeOptions: RescueTypeOption[]) => {
        this.allRescueTypes = rescueTypeOptions;
      }
    });
  }

  /**
   * Check to see if any data on the form has changed.
   * this.selectedBunny is the "original state"
   * this.data.controls[controlName].value contains the value to compare the original state against
   * If they're different then the form is good for submission
   *
   * Unfortunately we have to jump through a ton of hoops here because the form stores all the data as strings
   * It also turns null -> to empty string '' if a text field that was null was modified to empty string
   * so in that case null.isEqual('') is true because to the form they're the same
   */
  public valid(): boolean {
    return this.areNondatesUnequal('name') ||
      this.areNondatesUnequal('gender') ||
      this.areDatesUnequal('intakeDate') ||
      this.areNondatesUnequal('rescueType') ||
      this.areNondatesUnequal('intakeReason') ||
      this.areNondatesUnequal('surrenderName') ||
      this.areDatesUnequal('dateOfBirth') ||
      this.areNondatesUnequal('description') ||
      this.areDatesUnequal('spayDate');
  }

  private areDatesUnequal(value: string) {
    if (this.undefinedOrNull(this.selectedBunny[value]) && this.undefinedOrNull(this.data.controls[value].value)) {
      return false;
    } else if (this.undefinedOrNull(this.data.controls[value].value)) {
      return true;
    }
    return this.selectedBunny[value] !== this.data.controls[value].value.format('YYYY/MM/DD HH:mm:ss.SSS');
  }

  private areNondatesUnequal(value: string) {
    if (this.emptyStringOrNull(this.selectedBunny[value]) && this.emptyStringOrNull(this.data.controls[value].value)) {
      return false;
    }
    return this.selectedBunny[value] !== this.data.controls[value].value;
  }

  private undefinedOrNull(variable?) {
    return variable === null || variable === undefined;
  }

  private emptyStringOrNull(variable?: string) {
    return variable === null || variable === '';
  }
}
