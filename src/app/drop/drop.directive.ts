import { Directive, HostListener, Output, EventEmitter, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDrop]'
})
export class DropDirective {
  @Output() fileDropped = new EventEmitter<any>();
  @HostBinding('style.background-color') private background = '#070526';
  // Dragover Event
  @HostListener('dragover', ['$event']) dragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#16143B';
  }
  // Dragleave Event
  @HostListener('dragleave', ['$event']) public dragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#16143B';
  }
  // Drop Event
  @HostListener('drop', ['$event']) public drop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#070526';
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
