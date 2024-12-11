export interface ActivoTarea {
    id_activo:string,
    id_tarea: string; 
    tipo: string; 
    tarea: string; 
    tipo_tarea:'inspeccion' | 'prev-planif' | 'pranif-no-period' | 'no-planif';
    tag_diminutivo: string; 
}
