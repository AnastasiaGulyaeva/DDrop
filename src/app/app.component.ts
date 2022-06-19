import { Component, OnInit, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'DDrop';

  isModalDialogVisible: boolean = true;

  constructor() {}

  ngOnInit(): void {
  }

  closeModal(isVisible: boolean) {
		this.isModalDialogVisible = isVisible;
	}

}
