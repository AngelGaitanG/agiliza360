import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainLayoutHeaderComponent } from './components/main-layout-header/main-layout-header.component';
import { MainSidebarComponent } from './components/main-sidebar/main-sidebar.component';

@Component({
  selector: 'app-main-layout-desktop',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainSidebarComponent, MainLayoutHeaderComponent],
  templateUrl: './main-layout-desktop.component.html',
  styleUrls: ['./main-layout-desktop.component.scss']
})
export class MainLayoutDesktopComponent {}
