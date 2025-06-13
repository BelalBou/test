import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  constructor(private http: HttpClient) {}

  async redirectToCheckout(cart: any[]) {
    const stripe = await loadStripe(
      'pk_test_51Qm0WHCA9knPbVsZxnBtZPGytdHPv7hdlYS0LcQtsHu7GShMVFSdeFtTThSoZV1KitUSpJdYe27dt5E5t5SLMPmx00ZqcySYKw'
    );

    this.http
      .post<{ sessionId: string }>('http://localhost:3000/orders', { cart }) // ✅ URL absolue
      .subscribe({
        next: async (res) => {
          console.log('✅ Session reçue :', res);
          if (stripe) {
            await stripe.redirectToCheckout({ sessionId: res.sessionId });
          }
        },
        error: (err) => {
          console.error('❌ Erreur Stripe Checkout :', err);
        },
      });
  }
}
