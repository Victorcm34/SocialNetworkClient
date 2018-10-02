import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { ReceivedComponent } from './components/received/received.component';
import { SentComponent } from './components/sent/sent.component';
import { Routes, RouterModule } from '@angular/router';

const messagesRoutes: Routes = [
    {
        path: 'mensajes',
        component: MainComponent,
        children: [
            {path: '', redirectTo: 'recibidos', pathMatch: 'full'},
            {path: 'enviar', component: AddComponent},
            {path: 'enviados', component: SentComponent},
            {path: 'recibidos', component: ReceivedComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(messagesRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class MessagesRoutingModule {}
