import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'scl-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private _title: Title, private _translate: TranslateService) {}

  ngOnInit() {
    const contentKey = 'ui.header.home';
    const home = this._translate.instant(contentKey);
    this._title.setTitle(
      `Sanny Builder Library${home !== contentKey ? ' :: ' + home : ''}`
    );
  }
}
