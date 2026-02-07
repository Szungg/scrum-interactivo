import { Routes } from '@angular/router';

import { CasoEstudioComponent } from './components/caso-estudio/caso-estudio.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PresentacionComponent } from './components/presentacion/presentacion.component';
import { QueEsComponent } from './components/que-es/que-es.component';
import { RolesComponent } from './components/roles/roles.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'inicio', pathMatch: 'full' },
	{ path: 'inicio', component: InicioComponent },
	{ path: 'que-es', component: QueEsComponent },
	{ path: 'roles', component: RolesComponent },
	{ path: 'eventos', component: EventosComponent },
	{ path: 'presentacion', component: PresentacionComponent },
	{ path: 'caso-estudio', component: CasoEstudioComponent }
];
