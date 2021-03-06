import { Component, OnInit } from '@angular/core';
import Bunny from '../../entities/Bunny';
import { DatabaseService } from '../../providers/DatabaseService';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  DateOfBirthExplanationOption,
  GenderOption,
  RescueTypeOption,
  SpayExplanationOption
} from '../add-bunny/add-bunny.component';
import * as moment from 'moment';
import { AlertService } from '../../providers/AlertService';
import { emptyStringOrNullOrUndefined, translateDateToMoment, undefinedOrNull } from '../../functions';

import { isEqual } from 'lodash-es';

export interface BunnyBondOption {
  display: string, value: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bunniesAvailableToBondOptions: BunnyBondOption[] = [];
  preselectedBondedBunnies: string[] = [];
  bunnies: Bunny[] = [];
  selectedBunnyAutoSuggest = new FormControl();
  selectedBunnyAutoSuggestFilteredBunnies: Observable<Bunny[]>;
  selectedBunny: Bunny;
  data: FormGroup;
  allGenders: GenderOption[];
  allDateOfBirthExplanations: DateOfBirthExplanationOption[];
  allSpayExplanations: SpayExplanationOption[];
  allRescueTypes: RescueTypeOption[];
  generalMinDate = moment('2010-01-01 00:00:00.000');
  todaysDate = moment().startOf('day');

  constructor(private databaseService: DatabaseService, private alertService: AlertService) {

  }

  private _filter(bunnyName: string): Bunny[] {
    if (!bunnyName) {
      return this.bunnies;
    }

    const filterValue = bunnyName.toLowerCase();

    return this.bunnies.filter(bunny => bunny.name.toLowerCase().includes(filterValue));
  }

  public onSelectedBondsChanged(optionSelected: any) {
    console.log(optionSelected);
  }

  public pickBunny(optionSelected: MatAutocompleteSelectedEvent) {
    console.log('Bunny picked!');
    this.selectedBunny = this.bunnies.find((value: Bunny) => {
      return value.id === +optionSelected.option.id;
    });

    this.preselectedBondedBunnies = this.selectedBunny.bondedBunnyIds.map<string>(value => value.toString(10));

    this.bunniesAvailableToBondOptions = this.bunnies.reduce((previousValue: Bunny[], currentValue: Bunny): Bunny[] => {
      // Don't let the user bond a bunny to itself
      if (currentValue.id !== this.selectedBunny.id) {
        previousValue.push(currentValue);
      }
      return previousValue;
    }, []).map(value => {
      return {
        display: `${value.name} ${(value.intakeDate + '').slice(0, 4)}`,
        value: value.id + ''
      };
    });

    this.data = new FormGroup({
      name: new FormControl(this.selectedBunny.name),
      surrenderName: new FormControl(this.selectedBunny.surrenderName),
      gender: new FormControl(this.selectedBunny.gender),
      intakeDate: new FormControl(translateDateToMoment(this.selectedBunny.intakeDate)),
      description: new FormControl(this.selectedBunny.description),
      spayDate: new FormControl(translateDateToMoment(this.selectedBunny.spayDate)),
      dateOfBirth: new FormControl(translateDateToMoment(this.selectedBunny.dateOfBirth)),
      intakeReason: new FormControl(this.selectedBunny.intakeReason),
      rescueType: new FormControl(this.selectedBunny.rescueType),
      passedAwayDate: new FormControl(translateDateToMoment(this.selectedBunny.passedAwayDate)),
      passedAwayReason: new FormControl(this.selectedBunny.passedAwayReason),
      dateOfBirthExplanation: new FormControl(this.selectedBunny.dateOfBirthExplanation),
      spayExplanation: new FormControl(this.selectedBunny.spayExplanation),
      bondedBunnies: new FormControl()
    });
  }

  public onSubmit() {
    this.databaseService.updateBunny(Bunny.from(this.data, this.selectedBunny.id)).subscribe({
      complete: () => {
        this.alertService.databaseSuccessSavingBunny(this.data.controls.name.value);
        this.data.reset();
        this.selectedBunnyAutoSuggest.reset();
        this.databaseService.getAllBunnies().subscribe((bunnies: Bunny[]) => {
          this.bunnies = bunnies;
          this.bunniesAvailableToBondOptions = [];
          this.preselectedBondedBunnies = [];
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
    this.selectedBunnyAutoSuggestFilteredBunnies = this.selectedBunnyAutoSuggest.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.databaseService.getAllBunnies().subscribe((bunnies: Bunny[]) => {
      this.bunnies = bunnies;
    }, (error) => {
      this.alertService.databaseErrorFetching(error);
    });
    this.databaseService.getDateOfBirthExplanations().subscribe({
      next: (dateOfBirthExplanations: DateOfBirthExplanationOption[]) => {
        this.allDateOfBirthExplanations = dateOfBirthExplanations;
      }
    });
    this.databaseService.getGenders().subscribe({
      next: (genders: GenderOption[]) => {
        this.allGenders = genders;
      }
    });
    this.databaseService.getSpayExplanations().subscribe({
      next: (spayExplanationOptions: SpayExplanationOption[]) => {
        this.allSpayExplanations = spayExplanationOptions;
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
  public hasStateChanges(): boolean {
    return this.areNondatesUnequal('name') ||
      this.areNondatesUnequal('gender') ||
      this.areDatesUnequal('intakeDate') ||
      this.areNondatesUnequal('rescueType') ||
      this.areNondatesUnequal('intakeReason') ||
      this.areNondatesUnequal('surrenderName') ||
      this.areDatesUnequal('dateOfBirth') ||
      this.areNondatesUnequal('description') ||
      this.areDatesUnequal('spayDate') ||
      this.areDatesUnequal('passedAwayDate') ||
      this.areNondatesUnequal('passedAwayReason') ||
      this.areNondatesUnequal('dateOfBirthExplanation') ||
      this.areNondatesUnequal('spayExplanation') ||
      this.areNondatesUnequal('bondedBunnies');
  }

  private areDatesUnequal(value: string) {
    if (undefinedOrNull(this.selectedBunny[value]) && undefinedOrNull(this.data.controls[value].value)) {
      return false;
    } else if (undefinedOrNull(this.data.controls[value].value)) {
      return true;
    }
    return this.selectedBunny[value] !== this.data.controls[value].value.format('YYYY/MM/DD HH:mm:ss.SSS');
  }

  private areNondatesUnequal(value: string): boolean {
    if (emptyStringOrNullOrUndefined(this.selectedBunny[value]) && emptyStringOrNullOrUndefined(this.data.controls[value].value)) {
      return false;
    }
    if (value === 'bondedBunnies') {
      // Create new copies so we don't mutate what's in the UI
      const originalBunnyIds: number[] = [...this.selectedBunny.bondedBunnyIds];
      const interfaceBunnyIds: number[] = [...this.data.controls[value].value].map((interfaceBunnyId: string) => Number.parseInt(interfaceBunnyId, 10));
      originalBunnyIds.sort();
      interfaceBunnyIds.sort();
      return !isEqual(originalBunnyIds, interfaceBunnyIds);
    }
    return this.selectedBunny[value] !== this.data.controls[value].value;
  }

}
