import { Component } from '@angular/core';

@Component({
  selector: 'auth-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [`
    #auth-page {
      height: 100vh;
    }
    .footer {
      position: absolute;
      bottom: 20px;
    }
  `]
})
export class LayoutPageComponent {

}
