import {Component} from '@angular/core';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  totalPrice = 0;
  profitPercents = 0;
  firstPayment = 0;
  paymentCounts = 0;
  monthlyPayment = 0;

  constructor(private toastController: ToastController) {
  }

  calc() {
    if (!this.totalPrice || !this.profitPercents || !this.paymentCounts) {
      this.presentToast('وارد کردن مبلغ کل، درصد سود و تعداد اقساط اجباری میباشد.');
      return;
    }

    if (+this.totalPrice < +this.firstPayment) {
      this.presentToast('مبلغ کل نمیتواند کمتر از پرداخت اولیه باشد');
      return;
    }
    let remain = this.totalPrice - this.firstPayment;
    let res = remain * this.profitPercents / 100;
    res *= this.paymentCounts;
    res += remain;
    res /= this.paymentCounts;
    this.monthlyPayment = res;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    await toast.present();
  }
}
