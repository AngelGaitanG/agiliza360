import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../../../layouts/main/services/main-layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  brandId: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private layoutService: LayoutService
  ) {}
  
  ngOnInit(): void {
    // Obtenemos el ID una sola vez al iniciar el componente
    this.route.params.subscribe(params => {
      this.brandId = params['id'];
      
      // Verificamos si el brandId almacenado es diferente antes de actualizar
      const storedBrandId = localStorage.getItem('brandId');
      if (storedBrandId !== this.brandId) {
        this.layoutService.setBrandId(this.brandId);
      }
    });
  }
}
