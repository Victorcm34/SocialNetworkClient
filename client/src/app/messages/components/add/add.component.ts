import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
    selector: 'app-add',
    templateUrl: 'add.component.html'
})
export class AddComponent implements OnInit {
    public title: string;

    constructor() {
        this.title = 'Enviar mensaje';
    }

    ngOnInit() {
        console.log('Main component cargado');
    }
}
