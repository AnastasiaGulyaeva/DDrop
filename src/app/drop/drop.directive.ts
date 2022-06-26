import { Directive, HostListener, Output, EventEmitter, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDrop]'
})
export class DropDirective {
  @Output() fileDropped = new EventEmitter<any>();
  @HostBinding('style.background-color') private background = 'rgba(255, 255, 255, 0)';
  // Dragover Event
  @HostListener('dragover', ['$event']) dragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = 'rgba(7, 5, 38, .6)';
  }
  // Dragleave Event
  @HostListener('dragleave', ['$event']) public dragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = 'rgba(255, 255, 255, 0)';
  }
  // Drop Event
  @HostListener('drop', ['$event']) public drop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = 'rgba(255, 255, 255, 0)';
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
