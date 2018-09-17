import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    providers: [UserService]
})

export class RegisterComponent implements OnInit {
    public title: string;
    public user: User;
    public status: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.title = 'Registrate';
        this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
    }

    ngOnInit() {
        console.log('Componente de register cargado');
    }

    onSubmit(registerForm) {
        this._userService.register(this.user).subscribe(
            response => {
                if (response.user && response.user._id) {
                    // console.log(response.user);

                    this.status = 'success';
                    registerForm.reset();
                } else {
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}
