import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class PayPalServiceAccount {
  constructor(private restangular: Restangular) {}
  createLinkToPayPal(params: any): Promise<any> {
    return this.restangular.one('payment').one('paypal/create-link').customPOST(params).toPromise();
  }
}
