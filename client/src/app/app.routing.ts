import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';
import { UserWard } from './services/user.ward';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'misdatos', component: UserEditComponent, canActivate: [UserWard]},
    {path: 'gente/:page', component: UsersComponent, canActivate: [UserWard]},
    {path: 'gente', component: UsersComponent, canActivate: [UserWard]},
    {path: 'timeline', component: TimelineComponent, canActivate: [UserWard]},
    {path: 'perfil/:id', component: ProfileComponent, canActivate: [UserWard]},
    {path: 'siguiendo/:id/:page', component: FollowingComponent, canActivate: [UserWard]},
    {path: 'seguidores/:id/:page', component: FollowedComponent, canActivate: [UserWard]},
    {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
