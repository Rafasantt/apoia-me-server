// src/main/adapters/webhook-adapter.ts
import type { Request, Response } from 'express'
import type Stripe from 'stripe'
import type { Controller } from '@/presentation/protocols'
import { stripe } from '@/infra/gateways/stripe/config/stripe-config'

// Este adaptador é exclusivo para a rota de webhook do Stripe.
export const adaptWebhookRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string
    const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET

    const payload = req.body
    // 1. Constrói o evento usando o payload raw. Se a assinatura for inválida, ele lança um erro.
    const event: Stripe.Event = stripe.webhooks.constructEvent(
      payload,
      sig,
      endPointSecret
    )

    // 2. Passa o evento validado para o controller
    const httpResponse = await controller.handle({ body: event })

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
