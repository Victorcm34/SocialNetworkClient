import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
    selector: 'app-sent',
    templateUrl: 'sent.component.html'
})
export class SentComponent implements OnInit {
    public title: string;

    constructor() {
        this.title = 'Mensajes enviados';
    }

    ngOnInit() {
        console.log('sent component cargado');
    }
}
