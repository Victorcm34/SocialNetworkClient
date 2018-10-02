import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Follow } from '../models/follow';
import {GLOBAL } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class FollowService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addFollow(token, follow): Observable<any> {
        const params = JSON.stringify(follow);
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('Authorization', token);

        return this._http.post( this.url + 'follow', params, {headers: headers});
    }

    deleteFollow(token, id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('Authorization', token);

        return this._http.delete(this.url + 'follow/' + id, {headers: headers});
    }

    getFollowing(token, userId= null, page = 1): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);

        if (userId != null) {
            return this._http.get(this.url + 'following/' + userId + '/' + page, {headers: headers});
        } else {
            return this._http.get(this.url + 'following', {headers: headers});
        }

    }

    getFollowed(token, userId= null, page = 1): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                            .set('Authorization', token);

        if (userId != null) {
            return this._http.get(this.url + 'followed/' + userId + '/' + page, {headers: headers});
        } else {
            return this._http.get(this.url + 'followed', {headers: headers});
        }
    }

    getMyFollows(token): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                            .set('Authorization', token);

    return this._http.get(this.url + 'get-my-follows/true', {headers: headers});
    }
}
