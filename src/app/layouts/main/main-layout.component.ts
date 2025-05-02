import { Component, OnInit } from "@angular/core";
import { MainLayoutDesktopComponent } from "./main-layout-desktop/main-layout-desktop.component";
import { NgIf } from "@angular/common";

@Component({
    selector: 'app-main-layout',
    styles: [``],
    imports: [
        MainLayoutDesktopComponent,
        NgIf
    ],
    template: `
        <app-main-layout-desktop *ngIf="!isMobileView"></app-main-layout-desktop>
        `,
})
export class MainLayoutComponent implements OnInit {
    isMobileView: boolean = false;
  
    ngOnInit() {
      console.log('ngOnInit');
      this.checkScreenSize();
      window.addEventListener('resize', () => this.checkScreenSize());
    }
  
    private async checkScreenSize() {
      const width = window.innerWidth;
      this.isMobileView = width < 768;
      console.log(this.isMobileView);
      console.log(width);
    }
  }