import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  onContentChange(event: string) {
    document.getElementById('text-output').innerHTML = event;
  }

}