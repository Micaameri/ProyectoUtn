import { Component, OnInit } from '@angular/core';
import { SectorService } from '../../../services/sector.service';
import { Sector } from '../../../interfaces/sector';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-sector',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './gestion-sector.component.html',
  styleUrls: ['./gestion-sector.component.css'], 
})
export class GestionSectoresComponent implements OnInit {
  sectores: Sector[] = [];
  nuevoSector: { sector: string } = { sector: '' };

  constructor(private sectorService: SectorService,private router:Router) {}
  goBack() {
    this.router.navigate(['/gestion']);
  }
  ngOnInit(): void {
    this.cargarSectores();
  }

  async cargarSectores(): Promise<void> {
    try {
      this.sectores = await this.sectorService.obtenerSectores();
    } catch (error) {
      console.error('Error al cargar sectores:', error);
    }
  }
  async crearSector() {
    if (this.nuevoSector.sector.trim() === '') {
        alert('Por favor, ingresa un nombre para el sector.');
        return;
    }

    if (window.confirm('¿Estás seguro de que quieres crear este sector?')) {
        try {
            await this.sectorService.crearSector(this.nuevoSector);
            alert('Sector creado exitosamente.');
            this.cargarSectores();
            this.nuevoSector = { sector: '' }; 
        } catch (error) {
            console.error('Error al crear sector:', error);
        }
    }
}

async eliminarSector(id: number) {
    if (window.confirm('¿Estás seguro de que quieres eliminar este sector?')) {
        try {
            await this.sectorService.eliminarSector(id);
            alert('Sector eliminado exitosamente.');
            this.cargarSectores();
        } catch (error) {
            console.error('Error al eliminar sector:', error);
        }
    }
}

}
