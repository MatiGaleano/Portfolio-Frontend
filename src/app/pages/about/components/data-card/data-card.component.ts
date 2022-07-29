import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Education } from 'src/app/models/education.interface';
import { Work } from 'src/app/models/works.interface';
import { environment } from 'src/environments/environment';

import * as AOS from 'aos';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.scss'],
})
export class DataCardComponent implements OnInit {
  @Input() data!: Work | Education;
  @Output() onEdit = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();
  API_URL = environment.API_URL;


  constructor() {}

  ngOnInit(): void {
    AOS.init();
    window.addEventListener('load', AOS.refresh);
  }
}
