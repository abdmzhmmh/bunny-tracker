import { Component, OnInit } from '@angular/core';
import Bunny from "../../entities/bunny.schema";
import { DatabaseService } from "../../providers/DatabaseService";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private bunnies: Bunny[];

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    console.log('component initialized');
    this.databaseService.addBunny(new Bunny("Mike!"));
    this.databaseService.getBunnies().subscribe((bunnies: Bunny[]) => (this.bunnies = bunnies));
  }

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
