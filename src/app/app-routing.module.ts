import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    {
                        path: 'home',
                        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
                        canActivate: [AppRouteGuard],
                    },
                    {
                        path: 'PatientAdmission',
                        loadChildren: () => import('./PatientAdmission/PatientAdmission.module').then((m) => m.PatientAdmissionModule),
                        canActivate: [AppRouteGuard],
                    },
                    {
                        path: 'Doctors',
                        loadChildren: () => import('./Doctors/doctors.module').then((m) => m.DoctorsModule),
                        canActivate: [AppRouteGuard],
                    },
                      {
                        path: 'Patients',
                        loadChildren: () => import('./Patients/Patients.module').then((m) => m.PatientsModule),
                        canActivate: [AppRouteGuard],
                    },
                       {
                        path: 'rooms',
                        loadChildren: () => import('./rooms/rooms.module').then((m) => m.RoomsModule),
                        canActivate: [AppRouteGuard],
                    },
                     {
                        path: 'Bed',
                        loadChildren: () => import('./Bed/bed.module').then((m) => m.BedModule),
                        canActivate: [AppRouteGuard],
                    },

                    {
                        path: 'about',
                        loadChildren: () => import('./about/about.module').then((m) => m.AboutModule),
                        canActivate: [AppRouteGuard],
                    },
                    {
                        path: 'users',
                        loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
                        data: { permission: 'Pages.Users' },
                        canActivate: [AppRouteGuard],
                    },
                    {
                        path: 'roles',
                        loadChildren: () => import('./roles/roles.module').then((m) => m.RolesModule),
                        data: { permission: 'Pages.Roles' },
                        canActivate: [AppRouteGuard],
                    },
                   
                    {
                        path: 'tenants',
                        loadChildren: () => import('./tenants/tenants.module').then((m) => m.TenantsModule),
                        data: { permission: 'Pages.Tenants' },
                        canActivate: [AppRouteGuard],
                    },
                    {
                        path: 'update-password',
                        loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
                        canActivate: [AppRouteGuard],
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
