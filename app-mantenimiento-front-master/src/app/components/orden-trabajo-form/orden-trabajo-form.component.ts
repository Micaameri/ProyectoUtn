import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivoTareaService } from '../../services/activo-tarea.service';
import { UserService } from '../../services/user.service';
import { UbicacionService } from '../../services/ubicacion.service';
import { SectorService } from '../../services/sector.service';
import { PisoService } from '../../services/piso.service';
import { EdificioService } from '../../services/edificio.service';
import { OrdenTrabajoService } from '../../services/orden-trabajo.service';
import { OrdenTrabajo } from '../../interfaces/orden-trabajo';
import { ActivoService } from '../../services/activo.service';
import { CommonModule } from '@angular/common';
import { ActivoTarea } from '../../interfaces/activo-tarea';
import { User } from '../../interfaces/user';
import { Tarea } from '../../interfaces/tarea';
import { Edificio } from '../../interfaces/edificio';
import { Piso } from '../../interfaces/piso';
import { Sector } from '../../interfaces/sector';
import { UbicacionActivo } from '../../interfaces/ubicacion';

@Component({
  selector: 'app-orden-trabajo-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './orden-trabajo-form.component.html',
  styleUrls: ['./orden-trabajo-form.component.css']
})
export class OrdenTrabajoFormComponent implements OnInit {
  nuevaTarea: string = ''; 
  ordenTrabajo: OrdenTrabajo = {
    id:0,
    operario: '',
    edificio: '',
    piso: '',
    sector: '',
    ubicacion: '',
    id_activo_tarea: '' ,
    observaciones: '',
    estado: true,
    fecha: new Date().toISOString().split('T')[0]
  };

  activos: ActivoTarea[] = [];
  tarea: Tarea[] = [];
  operario: User[] = [];
  edificio: Edificio[] = [];
  piso: Piso[] = [];
  sector: Sector[] = [];
  ubicacion: UbicacionActivo[] = [];
  relaciones: ActivoTarea[] = [];

  constructor(
    private router: Router,
    private activoTareaService: ActivoTareaService, 
    private userService: UserService,
    private ubicacionService: UbicacionService,
    private sectorService: SectorService,
    private pisoService: PisoService,
    private edificioService: EdificioService,
    private ordenTrabajoService: OrdenTrabajoService,
    private activoService: ActivoService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      await this.obtenerDatos();
      await this.obtenerOperarios();
    } catch (error) {
      console.error('Error en ngOnInit:', error);
    }
  }

  private async obtenerDatos(): Promise<void> {
    await Promise.all([
      this.obtenerEdificios(),
      this.obtenerPisos(),
      this.obtenerSectores(),
      this.obtenerUbicaciones(),
      this.obtenerActivos()  
    ]);
  }

  goBack() {
    this.router.navigate(['/dashboard-admin']);
  }
  padLeft(value: string | number, length: number): string {
    return String(value).padStart(length, '0');
}
  async obtenerOperarios(): Promise<void> {
    try {
        this.operario = await this.userService.obtenerOperarios();
    } catch (error) {
        console.error('Error al obtener operarios:', error);
        this.operario = [];
    }
}

onOperarioChange(event: Event) {
    const selectedOperario = (event.target as HTMLSelectElement).value;
    this.ordenTrabajo.operario = selectedOperario;
}


  async obtenerEdificios(): Promise<void> {
    try {
      this.edificio = await this.edificioService.obtenerEdificios(); 
    } catch (error) {
      console.error('Error al obtener edificios:', error);
      this.edificio = []; 
    }
  }

  async obtenerPisos(): Promise<void> {
    try {
      this.piso = await this.pisoService.obtenerPisos(); 
    } catch (error) {
      console.error('Error al obtener pisos:', error);
      this.piso = []; 
    }
  }

  async obtenerSectores(): Promise<void> {
    try {
      this.sector = await this.sectorService.obtenerSectores();
    } catch (error) {
      console.error('Error al obtener sectores:', error);
      this.sector = []; 
    }
  }

  async obtenerUbicaciones(): Promise<void> {
    try {
      this.ubicacion = await this.ubicacionService.obtenerUbicaciones();
    } catch (error) {
      console.error('Error al obtener ubicaciones:', error);
      this.ubicacion = []; 
    }
  }

  async obtenerActivos(): Promise<void> {
    try {
        const activos = await this.activoService.obtenerActivos();
        this.activos = activos.map(activo => ({
            id_activo: activo.id_activo,
            tipo: activo.tipo,
            tag_diminutivo: activo.tag_diminutivo , 
            id_tarea: '',
            tarea: '',
            tipo_tarea: 'inspeccion'
        }));
    } catch (error) {
        console.error('Error al obtener activos:', error);
        this.activos = [];
    }
}

  
  
  
  getUniqueEdificios(): Edificio[] {
    const uniqueNames = new Set(this.edificio.map(edificio => edificio.nombre));
    return Array.from(uniqueNames).map(nombre => 
      this.edificio.find(edificio => edificio.nombre === nombre) as Edificio
    );
  }
  
  getUniquePisos(): Piso[] {
    const uniquePisos = new Set(this.piso.map(piso => piso.piso));
    return Array.from(uniquePisos).map(piso => 
      this.piso.find(p => p.piso === piso) as Piso
    );
  }
  
  getUniqueSectores(): Sector[] {
    const uniqueSectores = new Set(this.sector.map(sector => sector.sector));
    return Array.from(uniqueSectores).map(sector => 
      this.sector.find(s => s.sector === sector) as Sector
    );
  }
  
  getUniqueUbicaciones(): UbicacionActivo[] {
    const uniqueUbicaciones = new Set(this.ubicacion.map(ubicacion => ubicacion.ubicacion));
    return Array.from(uniqueUbicaciones).map(ubicacion => 
      this.ubicacion.find(u => u.ubicacion === ubicacion) as UbicacionActivo
    );
  }
  getUniqueOperarios(): User[] {
    const uniqueOperarios = new Set(this.operario.map(operario => operario.nombre));
    return Array.from(uniqueOperarios).map(nombre => 
      this.operario.find(o => o.nombre === nombre) as User
    );
  }
  
  
  getUniqueTareas(): Tarea[] {
    const uniqueTareas = new Set(this.tarea.map(t => t.tarea));
    return Array.from(uniqueTareas).map(tarea => 
      this.tarea.find(t => t.tarea === tarea) as Tarea
    );
  }
  async onActivoChange(event: Event): Promise<void> {
    const selectedActivoId = (event.target as HTMLSelectElement).value;
    const selectedTipoTarea = this.ordenTrabajo.tipo_tarea;
  
   
    if (selectedActivoId && selectedTipoTarea === 'no-planif') {
      if (this.nuevaTarea && this.nuevaTarea.trim() !== '') {
        
        try {
          const nuevaRelacion = {
            id_activo: selectedActivoId,
            tarea: this.nuevaTarea,
            tipo_tarea: selectedTipoTarea,
          };
  
          const nuevaTareaRelacion = await this.activoTareaService.crearTareaYRelacion(nuevaRelacion);
  
          if (nuevaTareaRelacion && nuevaTareaRelacion.id_activo_tarea) {
            this.ordenTrabajo.id_activo_tarea = nuevaTareaRelacion.id_activo_tarea || '';
            this.ordenTrabajo.tag_diminutivo = nuevaTareaRelacion.tag_diminutivo || 'UNKN';
            this.ordenTrabajo.id_activo = selectedActivoId; 
            
            console.log('Nueva tarea y relación creada:', nuevaTareaRelacion);
        
            this.ordenTrabajo.codigo_unico = this.generarCodigo();
          
          } else {
            console.error('No se recibió un ID válido de activo-tarea.');
            this.ordenTrabajo.id_activo_tarea = '';
          }
        } catch (error) {
          console.error('Error al crear la tarea y la relación activo-tarea:', error);
          this.ordenTrabajo.id_activo_tarea = '';
        }
      } else {
        console.error('Debe ingresar una tarea válida para "no-planif".');
      }
    } 
     else if (selectedActivoId && selectedTipoTarea) {
      try {
        const tareasParaActivo = await this.activoTareaService.obtenerTareas(selectedActivoId, selectedTipoTarea);
        this.tarea = tareasParaActivo;
  
        if (this.tarea.length > 0) {
          this.ordenTrabajo.id_activo_tarea = this.tarea[0].id_activo_tarea || '';
          this.ordenTrabajo.tag_diminutivo = this.tarea[0].tag_diminutivo || 'UNKN';
          this.ordenTrabajo.id_activo = selectedActivoId; 
      
        } else {
          this.ordenTrabajo.id_activo_tarea = '';
          this.ordenTrabajo.tag_diminutivo = 'UNKN';
        }
      
        console.log('Tareas cargadas:', this.tarea);
        console.log('Tag del activo:', this.ordenTrabajo.tag_diminutivo);
      } catch (error) {
        console.error('Error al obtener tareas del activo:', error);
        this.tarea = [];
        this.ordenTrabajo.id_activo_tarea = '';
        this.ordenTrabajo.tag_diminutivo = 'UNKN';
      }
    } 
  }
  

  generarCodigo(): string {
    console.log('ID de tarea asignado:', this.ordenTrabajo.id_activo_tarea);
  
    const activoSeleccionado = this.activos.find(
      activo => String(activo.id_activo) === this.ordenTrabajo.id_activo
    );
  
    const tag = activoSeleccionado?.tag_diminutivo || 'UNKN';
    console.log('Tag del activo (antes de generar el código):', tag);
    const codigo = `${tag}${this.padLeft(this.ordenTrabajo.edificio, 3)}${this.padLeft(this.ordenTrabajo.piso, 3)}${this.padLeft(this.ordenTrabajo.sector, 3)}${this.padLeft(this.ordenTrabajo.id_activo_tarea, 3)}${this.padLeft(this.ordenTrabajo.ubicacion, 3)}`;

    
  
    console.log('Código generado:', codigo);
  
    return codigo;
  }
        
  async onTareaChange(event: Event): Promise<void> {
    const selectedTareaId = (event.target as HTMLSelectElement).value;
  
      this.ordenTrabajo.id_activo_tarea = selectedTareaId;
    
  }
  
  
  onEdificioChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Edificio seleccionado:', this.ordenTrabajo.edificio);
    this.ordenTrabajo.edificio = selectedValue;
  }

  onPisoChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.ordenTrabajo.piso = selectedValue;
  }

  onSectorChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.ordenTrabajo.sector = selectedValue;
  }

  onUbicacionChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.ordenTrabajo.ubicacion = selectedValue;
    console.log('Operario:', this.ordenTrabajo.operario);
console.log('Edificio:', this.ordenTrabajo.edificio);
console.log('Piso:', this.ordenTrabajo.piso);
console.log('Sector:', this.ordenTrabajo.sector);
console.log('Ubicación:', this.ordenTrabajo.ubicacion);
console.log('ID Activo Tarea:', this.ordenTrabajo.id_activo_tarea);
console.log('Código único:', this.ordenTrabajo.codigo_unico);
  }

  async enviarSolicitud(): Promise<void> {
    try {
    
      this.ordenTrabajo.codigo_unico = this.generarCodigo();
        console.log('Datos enviados:', this.ordenTrabajo);

        
        const response = await this.ordenTrabajoService.crearOrdenTrabajo(this.ordenTrabajo);
        console.log('Orden de trabajo creada:', response);
        this.router.navigate(['/dashboard-admin']);
    } catch (error) {
        console.error('Error al crear la orden de trabajo:', error);
    }
}





 
}
