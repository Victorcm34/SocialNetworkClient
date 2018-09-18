import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [UserService]
})

export class LoginComponent implements OnInit {
    public title: string;
    public user: User;
    public status: string;
    public identity;
    public token;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.title = 'Identificate';
        this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
    }

    ngOnInit() {
        console.log('Componente de login cargado');
    }

    onSubmit() {
        // Loguear al usuario y conseguir sus datos
        this._userService.singup(this.user).subscribe(
            response => {
                this.identity = response.user;
                if (!this.identity || !this.identity._id) {
                    this.status = 'error';
                } else {
                    // Persistir datos del usuario
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                    // Conseguir el token
                    this.getToken();
                }
                console.log(response.user);
                this.status = 'success';
            },
            error => {
                const errorMessage = <any>error;
                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        );

    }

    getToken() {
        this._userService.singup(this.user, 'true').subscribe(
            response => {
                this.token = response.token;

                if (this.token.length <= 0) {
                    this.status = 'error';
                } else {
                    // Persistir datos del usuario
                    localStorage.setItem('token', JSON.stringify(this.token));
                    // Conseguir los contadores o estadísticas
                    this.getCounters();
                }
                this.status = 'success';
            },
            error => {
                // tslint:disable-next-line:prefer-const
                let errorMessage = <any>error;
                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        );
    }

    getCounters() {
        this._userService.getCounters(this.identity._id).subscribe(
            response => {
                localStorage.setItem('stats', JSON.stringify(response));
                this.status = 'success';
                this._router.navigate(['/']);
            },
            error => {
                console.log(error);
            }
        );
    }
}
