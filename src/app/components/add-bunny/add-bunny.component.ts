import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-bunny',
  templateUrl: './add-bunny.component.html',
  styleUrls: ['./add-bunny.component.scss']
})
export class AddBunnyComponent implements OnInit {
  data: any = {};

  genders = ['Male', 'Female'];

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    alert(JSON.stringify(this.data));
  }

}
