export interface OrdenTrabajoBackend {
    orden_trabajo_id: number;
    id_usuario:number;
    usuario_nombre: string;
    sector_nombre: string;
    edificio_nombre: string;
    ubicacion_nombre: string;
    piso_nombre: string;
    tarea_descripcion: string;
    activo_tipo: string;
    tipo_tarea:string;
    codigo_unico:string;
    observaciones:string;
    fecha:string;
    estado:boolean;
    tiempo_empleado:number;
  }