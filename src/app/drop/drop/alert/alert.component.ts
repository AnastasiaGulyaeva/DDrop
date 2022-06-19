import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Output() isVisible = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

 closeModal() {
    this.isVisible.emit(false);
  }

}
