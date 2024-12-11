import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistroComponent } from './components/registro/registro.component';
import { OrdenTrabajoFormComponent } from './components/orden-trabajo-form/orden-trabajo-form.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardOperarioComponent } from './components/dashboard-operario/dashboard-operario.component';
import { GestionComponent } from './components/gestion/gestion.component';
import { GestionActivosComponent } from './components/gestion/gestion-activos/gestion-activos.component';
import { GestionEdificioComponent } from './components/gestion/gestion-edificio/gestion-edificio.component';
import { HistorialComponent } from './components/historial/historial.component';
import { AuthGuard } from './guards/auth.guard';
import { GestionSectoresComponent } from './components/gestion/gestion-sector/gestion-sector.component';
import { GestionPisoComponent } from './components/gestion/gestion-piso/gestion-piso.component';
import { GestionUbicacionComponent } from './components/gestion/gestion-ubicaciones/gestion-ubicaciones.component';
import { GestionUsuariosComponent } from './components/gestion/gestion-usuarios/gestion-usuarios.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'gestion', component: GestionComponent  , canActivate: [AuthGuard],   data: { role: 'administrativo' }  },
  { path: 'gestion-activos', component: GestionActivosComponent, 
    canActivate: [AuthGuard],   data: { role: 'administrativo' }   },
    { path: 'gestion-edificio', component: GestionEdificioComponent, 
      canActivate: [AuthGuard],   data: { role: 'administrativo' }   },
      { path: 'gestion-piso', component: GestionPisoComponent, 
        canActivate: [AuthGuard],   data: { role: 'administrativo' }   },
      { path: 'gestion-sector', component: GestionSectoresComponent, 
        canActivate: [AuthGuard],   data: { role: 'administrativo' }   },
        { path: 'gestion-ubicaciones', component: GestionUbicacionComponent, 
          canActivate: [AuthGuard],   data: { role: 'administrativo' }   },
          { path: 'gestion-usuarios', component: GestionUsuariosComponent, 
            canActivate: [AuthGuard],   data: { role: 'administrativo' }   },
  { path: 'login-form', component: LoginFormComponent  },
  { path: 'registro', component: RegistroComponent , 
    canActivate: [AuthGuard],   data: { role: 'administrativo' }  },
  { path: 'orden-trabajo-form', component: OrdenTrabajoFormComponent , 
    canActivate: [AuthGuard],   data: { role: 'administrativo' }  },
  { 
    path: 'dashboard-admin', 
    component: DashboardAdminComponent, 
    canActivate: [AuthGuard], 
    data: { role: 'administrativo' }  
  },
  { 
    path: 'dashboard-operario', 
    component: DashboardOperarioComponent, 
    canActivate: [AuthGuard], 
    data: { role: 'operario' }  
  },
  { path: 'historial', component: HistorialComponent , 
    canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

