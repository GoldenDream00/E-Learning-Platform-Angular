import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';


@Injectable({
  providedIn: 'root'
})
export class GenderService {
  public gender: any = '';

  private _getGenders: any;
  constructor(private restangular: Restangular) {}
  getGenders(params: any): Promise<any> {
    if (this.gender) {
      console.log("asdf");
      return Promise.resolve(this.gender);
    }

    if (this._getGenders && typeof this._getGenders.then === 'function') {
      return this._getGenders;
    }

    this._getGenders = this.restangular
      .one('gender')
      .get(params)
      .toPromise()
      .then(resp => {
        this.gender = resp;
        return this.gender;
      });
    return this._getGenders;
  }

  search(params: any): Promise<any> {
    return this.restangular.one('tutors').get(params).toPromise();
  }
}
