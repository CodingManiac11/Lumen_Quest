"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Form, FormField, useForm, validationRules } from '@/components/ui/Form';
import { Modal, ModalBody, ModalFooter } from '@/components/ui/Modal';

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);

  // Subscription plans
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      billing: 'month',
      description: 'Perfect for individuals getting started',
      features: [
        '✅ Up to 5 projects',
        '✅ 1GB storage',
        '✅ Email support',
        '✅ Basic analytics',
        '❌ Priority support',
        '❌ Advanced features'
      ],
      popular: false,
      color: 'blue'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 19.99,
      billing: 'month',
      description: 'Most popular choice for small teams',
      features: [
        '✅ Up to 25 projects',
        '✅ 10GB storage',
        '✅ Priority email support',
        '✅ Advanced analytics',
        '✅ Team collaboration',
        '✅ API access'
      ],
      popular: true,
      color: 'purple'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 49.99,
      billing: 'month',
      description: 'For large teams and organizations',
      features: [
        '✅ Unlimited projects',
        '✅ 100GB storage',
        '✅ 24/7 phone support',
        '✅ Advanced analytics',
        '✅ Team collaboration',
        '✅ API access',
        '✅ Custom integrations',
        '✅ SLA guarantee'
      ],
      popular: false,
      color: 'green'
    }
  ];

  const { values, errors, touched, handleChange, handleBlur, validateAll, reset } = useForm(
    {
      email: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: '',
      billingAddress: '',
      city: '',
      country: '',
      zipCode: ''
    },
    {
      email: [validationRules.required, validationRules.email],
      cardNumber: [validationRules.required],
      expiryDate: [validationRules.required],
      cvv: [validationRules.required, validationRules.minLength(3)],
      cardName: [validationRules.required],
      billingAddress: [validationRules.required],
      city: [validationRules.required],
      country: [validationRules.required],
      zipCode: [validationRules.required]
    }
  );

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
    setPaymentStep(1);
  };

  const handlePayment = () => {
    if (paymentStep === 1) {
      if (values.email) {
        setPaymentStep(2);
      }
    } else if (paymentStep === 2) {
      if (validateAll()) {
        // Process payment (mock)
        setTimeout(() => {
          alert('Payment successful! Welcome to ' + selectedPlan.name + ' plan!');
          setIsPaymentModalOpen(false);
          setPaymentStep(1);
          reset();
        }, 1000);
      }
    }
  };

  const formatPrice = (price, billing) => {
    return `$${price.toFixed(2)}/${billing}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            ✨ Choose Your Plan
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Start your subscription journey with the perfect plan for your needs
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-lg border border-gray-200">
            <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium">
              Monthly
            </button>
            <button className="px-4 py-2 rounded-md text-gray-500 text-sm font-medium">
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge variant="primary" className="px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /{plan.billing}
                  </span>
                </div>
                <p className="mt-2 text-gray-500">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={() => handleSelectPlan(plan)}
                  variant={plan.popular ? 'primary' : 'outline'}
                  fullWidth
                  size="lg"
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Compare Plans
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              See what's included in each subscription tier
            </p>
          </div>

          <Card>
            <CardContent className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-left text-sm font-medium text-gray-500">Feature</th>
                    <th className="py-3 text-center text-sm font-medium text-gray-500">Basic</th>
                    <th className="py-3 text-center text-sm font-medium text-gray-500">Pro</th>
                    <th className="py-3 text-center text-sm font-medium text-gray-500">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 text-sm text-gray-900">Projects</td>
                    <td className="py-4 text-center text-sm text-gray-500">5</td>
                    <td className="py-4 text-center text-sm text-gray-500">25</td>
                    <td className="py-4 text-center text-sm text-gray-500">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-4 text-sm text-gray-900">Storage</td>
                    <td className="py-4 text-center text-sm text-gray-500">1GB</td>
                    <td className="py-4 text-center text-sm text-gray-500">10GB</td>
                    <td className="py-4 text-center text-sm text-gray-500">100GB</td>
                  </tr>
                  <tr>
                    <td className="py-4 text-sm text-gray-900">Support</td>
                    <td className="py-4 text-center text-sm text-gray-500">Email</td>
                    <td className="py-4 text-center text-sm text-gray-500">Priority Email</td>
                    <td className="py-4 text-center text-sm text-gray-500">24/7 Phone</td>
                  </tr>
                  <tr>
                    <td className="py-4 text-sm text-gray-900">API Access</td>
                    <td className="py-4 text-center text-sm text-gray-500">❌</td>
                    <td className="py-4 text-center text-sm text-gray-500">✅</td>
                    <td className="py-4 text-center text-sm text-gray-500">✅</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedPlan && (
        <Modal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          title={`Subscribe to ${selectedPlan.name} Plan`}
          size="lg"
        >
          <ModalBody>
            {paymentStep === 1 ? (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{selectedPlan.name} Plan</h3>
                      <p className="text-gray-600">{selectedPlan.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{formatPrice(selectedPlan.price, selectedPlan.billing)}</div>
                    </div>
                  </div>
                </div>

                <Form>
                  <FormField
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    value={values.email}
                    error={touched.email && errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Total Amount</span>
                    <span className="text-xl font-bold">{formatPrice(selectedPlan.price, selectedPlan.billing)}</span>
                  </div>
                </div>

                <Form>
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      name="cardNumber"
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                      value={values.cardNumber}
                      error={touched.cardNumber && errors.cardNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        name="expiryDate"
                        label="Expiry Date"
                        placeholder="MM/YY"
                        value={values.expiryDate}
                        error={touched.expiryDate && errors.expiryDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      
                      <FormField
                        name="cvv"
                        label="CVV"
                        placeholder="123"
                        value={values.cvv}
                        error={touched.cvv && errors.cvv}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <FormField
                      name="cardName"
                      label="Cardholder Name"
                      placeholder="John Doe"
                      value={values.cardName}
                      error={touched.cardName && errors.cardName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <FormField
                      name="billingAddress"
                      label="Billing Address"
                      placeholder="123 Main St"
                      value={values.billingAddress}
                      error={touched.billingAddress && errors.billingAddress}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        name="city"
                        label="City"
                        placeholder="New York"
                        value={values.city}
                        error={touched.city && errors.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      
                      <FormField
                        name="zipCode"
                        label="ZIP Code"
                        placeholder="10001"
                        value={values.zipCode}
                        error={touched.zipCode && errors.zipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                </Form>
              </div>
            )}
          </ModalBody>
          
          <ModalFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                if (paymentStep === 2) {
                  setPaymentStep(1);
                } else {
                  setIsPaymentModalOpen(false);
                }
              }}
            >
              {paymentStep === 2 ? 'Back' : 'Cancel'}
            </Button>
            <Button onClick={handlePayment}>
              {paymentStep === 1 ? 'Continue' : `Pay ${formatPrice(selectedPlan.price, selectedPlan.billing)}`}
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}