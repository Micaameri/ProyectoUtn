# Documentación del Frontend

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 18.2.7.

## Configuracion inicial

Inicializar el servidor

```bash
npm install
ng serve
```

Dependencias

```bash
@angular/animations : ^18.2.0
@angular/common : ^18.2.0
@angular/compiler : ^18.2.0
@angular/core : ^18.2.0
@angular/forms : ^18.2.0
@angular/platform-browser : ^18.2.0
@angular/platform-browser-dynamic : ^18.2.0
@angular/platform-server : ^18.2.0
@angular/router : ^18.2.0
@angular/ssr : ^18.2.7
express : ^4.18.2
front : file:
rxjs : ~7.8.0
tslib : ^2.3.0
zone.js : ~0.14.10
```

## Estructura del Proyecto

- `public/`
- `src/`
  - `app/`
    - `components/`
    - `guars/`
    - `interfaces/`
    - `services/`
    - `app.component.html`
    - `app.component.css`
    - `app.component.ts`
    - `app.config.ts`
    - `app.modules.ts`
    - `app.routes.ts`
  - `assets/`
  - `index.html`
  - `style.css`
  - `main.ts`
- `angular.json`
- `README.md`
- `package.json`
- `tsconfig.json`
- `tsconfig.app.json`

## Componentes

- **AppComponent**
  - Ruta: src/app/app.component.ts
  - Selector: app-root
  - Standalone: true
  - Imports: RouterOutlet, CommonModule, LoginComponent
  - Funcion: Componente principal
- **DashboardAdminComponent**
  - Ruta: src/app/components/dashboard-admin/dashboard-admin.component.ts
  - Selector: app-dashboard-admin
  - Standalone: true
  - Funcion: Panel de control del administrador
- **DashboardOperarioComponent**
  - Ruta: src/app/components/dashboard-operario/dashboard-operario.component.ts
  - Selector: app-dashboard-operario
  - Standalone: true
  - Imports: CommonModule
  - Funcion: Panel de control del operario
- **HistorialComponent**
  - Ruta: src/app/components/historial/historial.component.ts
  - Selector: app-historial
  - Standalone: true
  - Imports: CommonModule, FormsModule
  - Funcion: Mostrar historial de ordenes de trabajo y permitir filtar por activo, operario, fecha y estado de la orden
- **LoginComponent**
  - Ruta: src/app/components/login/login.component.ts
  - Selector: app-login
  - Standalone: true
  - Funcion: Pagina principal del sistema
- **LoginFormComponent**
  - Ruta: src/app/components/login-form/login-form.component.ts
  - Selector: app-login-form
  - Standalone: true
  - Imports: CommonModule, FormsModule
  - Funcion: Formulario de login
- **OrdenTrabajoFormComponent**
  - Ruta: src/app/components/orden-trabajo-form/orden-trabajo-form.component.ts
  - Selector: app-orden-trabajo-form
  - Standalone: true
  - Imports: FormsModule CommonModule
  - Funcion: Formulario para cargar una orden de trabajo
- **RegistroComponent**
  - Ruta: src/app/components/registro/registro.component.ts
  - Selector: app-registro
  - Standalone: true
  - Imports: FormsModule CommonModule
  - Funcion: Formulario de registro
- **GestionComponent**
  - Ruta: src/app/components/gestion/gestion.component.ts
  - Selector: app-gestion
  - Standalone: true
  - Funcion: Panel para gestionar activos, edificios, pisos, sectores, ubicaciones y usuarios

## Servicios

- **ActivoService**
  - Ruta: src/app/services/activo.service.ts
  - Endpoint: /api/activos 
- **ActivoTareaService**
  - Ruta: src/app/services/activo-tarea.service.ts
  - Endpoint: /api/activoTareas
- **AuthService**
  - Ruta: src/app/services/auth.service.ts
  - Endpoint: /api/login 
- **EdificioService**
  - Ruta: src/app/services/edificio.service.ts
  - Endpoints: /api/lista-edificios
- **OrdenTrabajoService**
  - Ruta: src/app/services/orden-trabajo.service.ts
  - Endpoint: api/orden-trabajo
- **PisoService**
  - Ruta: src/app/services/piso.service.ts
  - Endpoint: /api/lista-pisos
- **SectorService**
  - Ruta: src/app/services/sector.service.ts
  - Endpoint: /api/sectores
- **TareaService**
  - Ruta: src/app/services/tarea.service.ts
  - Endpoint: /api/tareas
- **UbicacionService**
  - Ruta: src/app/services/ubicacion.service.ts
  - Endpoint: /api/lista-ubi-activos
- **UserService**
  - Ruta: src/app/services/user.service.ts
  - Endpoints: /api/lista-usuarios - /api/operarios

## Guards

- **AuthGuard**
  - Ruta: src/app/guards/auth.guard.ts

## Interfaces

- **ActivoTarea**

```bash
    id_activo:string,
    id_tarea: string; 
    tipo: string; 
    tarea: string; 
    tipo_tarea:'inspeccion' | 'prev-planif' | 'pranif-no-period' | 'no-planif';
    tag_diminutivo: string;
```

- **Activo**

```bash
  id_activo: string;
  tipo: string;
  tag_diminutivo: string;
```

- **Edificio**

```bash
  id_edificio?: number;
  nombre: string;
  direccion: string;
```

- **NuevoActivo**

```bash
  tipo: string;
  tag_diminutivo: string;
```

- **OrdenTrabajoBackend**

```bash
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
```

- **OrdenTrabajo**

```bash
    id: number;
    operario: string;
    sector: string;
    edificio: string;
    ubicacion: string;
    piso: string;
    id_activo_tarea: string; 
    id_activo?: string;  
    tipo_tarea?:string;
    tag_diminutivo?:string;
    codigo_unico?: string; 
    fecha:string;
    observaciones:string;
    estado:boolean;

```

- **Piso**

```bash
  id_piso?: number;
  piso: string;
```

- **Sector**

```bash
  id_sector?: number;
  sector: string;
```

- **Tarea**

```bash
   id_tarea: string;
    tarea: string;
    tipo_tarea:string;
    tag_diminutivo: string;
    id_activo_tarea?:string;
    id_activo?:string;
```

- **UbicacionActivo**

```bash
  idubicacion_activo: number;
  ubicacion: string;
```

- **User**

```bash
  id_usuario: string;
  nombre: string;
  area: string;
  email: string;
  contraseña: string;
  apellido: string;
```

# ¿Como usar el sistema?

## Seleccionar un perfil para ingresar

<p align="left">
  Elige el perfil asignado para acceder al sistema.
</p>

![Login](https://github.com/Micaameri/ProyectoUtn/blob/main/app-mantenimiento-front-master/public/interfaz/Login.png)

---

## Ingresar usuario y contraseña

<p align="left">
  Ingresa tus credenciales (usuario y contraseña) para autenticarse en el sistema como operario.
</p>

![Login](https://github.com/Micaameri/ProyectoUtn/blob/main/app-mantenimiento-front-master/public/interfaz/Login-op.png)

---

## Ingresar usuario y contraseña

<p align="left">
  Ingresa tus credenciales (usuario y contraseña) para autenticarse en el sistema como administrativo.
</p>

![Login](https://github.com/Micaameri/ProyectoUtn/blob/main/app-mantenimiento-front-master/public/interfaz/Login-admin.png)

---

## Panel de control operario

<p align="left">
  Una vez autenticado, los operarios tienen acceso a un panel personalizado que les permite gestionar sus ordenes de trabajo.
</p>

![Panel de control operario](https://github.com/Micaameri/ProyectoUtn/blob/main/app-mantenimiento-front-master/public/interfaz/Panel-op.png)

---

## Panel de control administrador

<p align="left">
  Los administradores tienen acceso a un panel avanzado con opciones para gestionar usuarios, solicitudes y ver el historial de OT.
</p>

![Panel de control administrador](https://github.com/Micaameri/ProyectoUtn/blob/main/app-mantenimiento-front-master/public/interfaz/Panel-admin.png)

---

## 1. Solicitar orden de trabajo

<p align="left">
  Los administradores pueden solicitar una orden de trabajo a través de un formulario.
</p>

![Solicitar OT](https://github.com/Micaameri/ProyectoUtn/blob/main/app-mantenimiento-front-master/public/interfaz/Generar-ot.png)

---

## 2. Registrar usuario

<p align="left">
  Los administradores tienen la posibilidad de registrar nuevos usuarios en el sistema mediante un formulario de registro.
</p>

![Registro](https://github.com/Micaameri/ProyectoUtn/blob/main/app-mantenimiento-front-master/public/interfaz/Registro.png)

---

## 3. Ver el historial de órdenes de trabajo

<p align="left">
  Los administradores pueden consulta el historial de órdenes de trabajo para obtener información sobre las ordenes registradas.
</p>

![Historial](https://github.com/Micaameri/ProyectoUtn/blob/main/app-mantenimiento-front-master/public/interfaz/Historial.png)

---

## 4. Gestionar infraestructura

<p align="left">
 Los administradores tienen la opcion de generar o eliminar activos, usuarios, edificios, pisos, sectores o ubicaciones.
</p>

![Ver OT](https://github.com/Micaameri/ProyectoUtn/blob/main/app-mantenimiento-front-master/public/interfaz/Gestion.png)
