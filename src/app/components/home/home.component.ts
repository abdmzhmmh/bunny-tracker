import { Component, OnInit, EventEmitter } from '@angular/core';
import Bunny from '../../entities/Bunny';
import { DatabaseService } from '../../providers/DatabaseService';
import { MatSnackBar, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  autoSuggest = new FormControl();
  bunnies: Bunny[] = [];
  filteredBunnies: Observable<Bunny[]>;

  constructor(private databaseService: DatabaseService, private snackBar: MatSnackBar) {
  }

  private _filter(bunnyName: string): Bunny[] {
    const filterValue = bunnyName.toLowerCase();

    return this.bunnies.filter(bunny => bunny.name.toLowerCase().includes(filterValue));
  }

  public pickBunny(optionSelected: MatAutocompleteSelectedEvent) {
    const bunny = optionSelected.option.id;
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
      this.snackBar.open(`Failure occurred while trying to fetch all bunnies. Error was ${error}`, 'Dismiss', {
        panelClass: 'snackbar-message-failure'
      });
    });

    // addItem(): void {
    //   this.appservice.addItem(item).subscribe((items) => (this.itemList = items));
    // }

    // deleteItem(): void {
    //   const item = this.itemList[this.itemList.length - 1];
    //   this.appservice
    //     .deleteItem(item)
    //     .subscribe((items) => (this.itemList = items));
    // }
  }
}
