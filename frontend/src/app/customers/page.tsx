"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DataTable } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Modal, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Form, FormField, useForm, validationRules } from '@/components/ui/Form';

export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock customer data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active',
      subscription: 'Pro Plan',
      joinDate: '2024-01-15',
      lastPayment: '2024-03-15',
      totalSpent: 299.99,
      avatar: '👨‍💼'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'trial',
      subscription: 'Basic Plan',
      joinDate: '2024-02-20',
      lastPayment: '2024-02-20',
      totalSpent: 29.99,
      avatar: '👩‍💻'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      status: 'cancelled',
      subscription: 'Enterprise',
      joinDate: '2023-12-01',
      lastPayment: '2024-02-01',
      totalSpent: 899.99,
      avatar: '👨‍🔧'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      status: 'active',
      subscription: 'Pro Plan',
      joinDate: '2024-01-08',
      lastPayment: '2024-03-08',
      totalSpent: 599.99,
      avatar: '👩‍🎨'
    }
  ]);

  const { values, errors, touched, handleChange, handleBlur, validateAll, reset } = useForm(
    { name: '', email: '', subscription: 'Basic Plan' },
    {
      name: [validationRules.required],
      email: [validationRules.required, validationRules.email],
      subscription: [validationRules.required]
    }
  );

  const statusColors = {
    active: 'success',
    trial: 'warning',
    cancelled: 'error',
    suspended: 'default'
  };

  const tableColumns = [
    {
      key: 'avatar',
      label: '',
      render: (value) => <span className="text-2xl">{value}</span>
    },
    {
      key: 'name',
      label: 'Customer',
      render: (value, row) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{row.email}</div>
        </div>
      )
    },
    {
      key: 'subscription',
      label: 'Plan'
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge variant={statusColors[value]} className="capitalize">
          {value}
        </Badge>
      )
    },
    {
      key: 'totalSpent',
      label: 'Total Spent',
      render: (value) => `$${value.toFixed(2)}`
    },
    {
      key: 'lastPayment',
      label: 'Last Payment',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSelectedCustomer(row)}
          >
            View
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleEditCustomer(row)}
          >
            Edit
          </Button>
        </div>
      )
    }
  ];

  const handleAddCustomer = () => {
    if (!validateAll()) return;
    
    const newCustomer = {
      id: customers.length + 1,
      ...values,
      status: 'trial',
      joinDate: new Date().toISOString().split('T')[0],
      lastPayment: new Date().toISOString().split('T')[0],
      totalSpent: 0,
      avatar: '👤'
    };
    
    setCustomers([...customers, newCustomer]);
    setIsAddModalOpen(false);
    reset();
  };

  const handleEditCustomer = (customer) => {
    console.log('Edit customer:', customer);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    trial: customers.filter(c => c.status === 'trial').length,
    revenue: customers.reduce((sum, c) => sum + c.totalSpent, 0)
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Management</h1>
        <p className="text-gray-600">Manage customer profiles, subscriptions, and billing</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-2xl">🔄</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Trial</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.trial}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-600">${stats.revenue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Customer Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Customers</CardTitle>
            <div className="flex space-x-4">
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
                leftIcon="🔍"
              />
              <Button onClick={() => setIsAddModalOpen(true)}>
                Add Customer
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredCustomers}
            columns={tableColumns}
            searchable={false}
            paginated={true}
            pageSize={10}
          />
        </CardContent>
      </Card>

      {/* Add Customer Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Customer"
        description="Create a new customer account"
        size="md"
      >
        <ModalBody>
          <Form>
            <div className="space-y-4">
              <FormField
                name="name"
                label="Full Name"
                placeholder="Enter customer name"
                value={values.name}
                error={touched.name && errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              
              <FormField
                name="email"
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                value={values.email}
                error={touched.email && errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Initial Subscription Plan
                </label>
                <select
                  name="subscription"
                  value={values.subscription}
                  onChange={(e) => handleChange('subscription', e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Basic Plan">Basic Plan - $9.99/month</option>
                  <option value="Pro Plan">Pro Plan - $19.99/month</option>
                  <option value="Enterprise">Enterprise - $49.99/month</option>
                </select>
              </div>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddCustomer}>
            Add Customer
          </Button>
        </ModalFooter>
      </Modal>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <Modal
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          title={`${selectedCustomer.name} - Customer Details`}
          size="lg"
        >
          <ModalBody>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{selectedCustomer.avatar}</span>
                <div>
                  <h3 className="text-xl font-semibold">{selectedCustomer.name}</h3>
                  <p className="text-gray-600">{selectedCustomer.email}</p>
                  <Badge variant={statusColors[selectedCustomer.status]} className="mt-1 capitalize">
                    {selectedCustomer.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Current Plan</label>
                  <p className="text-lg">{selectedCustomer.subscription}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Join Date</label>
                  <p className="text-lg">{new Date(selectedCustomer.joinDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Payment</label>
                  <p className="text-lg">{new Date(selectedCustomer.lastPayment).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Spent</label>
                  <p className="text-lg font-semibold text-green-600">${selectedCustomer.totalSpent.toFixed(2)}</p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">Recent Activity</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>Payment received</span>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>Subscription renewed</span>
                    <span className="text-sm text-gray-500">1 week ago</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>Profile updated</span>
                    <span className="text-sm text-gray-500">2 weeks ago</span>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
              Close
            </Button>
            <Button onClick={() => handleEditCustomer(selectedCustomer)}>
              Edit Customer
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}