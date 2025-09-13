USE subscription_db;

-- Insert sample users
INSERT INTO Users (name, email, phone, password_hash, role, status) VALUES
('Aman Raj', 'aman@example.com', '1234567890', '$2b$10$hashvalue1', 'user', 'active'),
('Rahul Singh', 'Rahul@example.com', '1234567891', '$2b$10$hashvalue2', 'user', 'active'),
('Admin User', 'admin@lumen.com', '1234567892', '$2b$10$hashvalue3', 'admin', 'active'),
('Lokesh Sahu', 'lokesh@example.com', '1234567893', '$2b$10$hashvalue4', 'user', 'active'),
('Harsh Pandey', 'harsh@example.com', '1234567894', '$2b$10$hashvalue5', 'user', 'active');

-- Insert sample plans
INSERT INTO Plans (plan_name, price, quota_sessions, validity_days, auto_renewal_allowed, description, status) VALUES
('Monthly Plan', 299.00, 10, 30, 'Yes', 'Basic plan with unlimited data per month', 'Active'),
('Quarterly Plan', 599.00, 25, 30, 'Yes', 'Premium plan with unlimited data per 3 month', 'Active'),
('Yearly Plan', 999.00, 50, 30, 'Yes', 'Enterprise plan with unlimited data per 12 month', 'Active'),
('Postpaid Plan', 199.00, 5, 30, 'Yes', 'Discounted plan for postpaid user', 'Active'),
('Top-up Plan', 99.00, 35, 30, 'Yes', 'Additional plan with 10 gb data per month', 'Active');

-- Insert sample subscriptions
INSERT INTO Subscriptions (user_id, plan_id, type, status, start_date, end_date) VALUES
(1, 1, 'prepaid', 'active', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY)),
(2, 2, 'prepaid', 'active', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY)),
(4, 3, 'prepaid', 'active', DATE_SUB(CURDATE(), INTERVAL 15 DAY), DATE_ADD(CURDATE(), INTERVAL 15 DAY)),
(5, 1, 'prepaid', 'expired', DATE_SUB(CURDATE(), INTERVAL 45 DAY), DATE_SUB(CURDATE(), INTERVAL 15 DAY));

-- Insert sample usage data
INSERT INTO Usage (user_id, month, sessions_attended, utilization_ratio, renewal_status) VALUES
(1, DATE_FORMAT(CURDATE(), '%Y-%m-01'), 8, 80.00, 'renewed'),
(2, DATE_FORMAT(CURDATE(), '%Y-%m-01'), 22, 88.00, 'renewed'),
(4, DATE_FORMAT(CURDATE(), '%Y-%m-01'), 45, 90.00, 'renewed'),
(5, DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01'), 3, 30.00, 'not_renewed');

-- Insert sample billing data
INSERT INTO Billing (sub_id, amount, discount_applied, billing_date, payment_status, payment_method, transaction_id) VALUES
(1, 299.00, 0.00, CURDATE(), 'paid', 'credit_card', 'TXN001'),
(2, 599.00, 10.00, CURDATE(), 'paid', 'upi', 'TXN002'),
(3, 999.00, 5.00, DATE_SUB(CURDATE(), INTERVAL 15 DAY), 'paid', 'debit_card', 'TXN003');

-- Insert sample discounts
INSERT INTO Discounts (discount_name, discount_type, discount_value, applicable_plans, start_date, end_date, usage_limit, status, created_by) VALUES
('New Year Offer', 'percentage', 20.00, '[1,2,3]', '2025-01-01', '2025-01-31', 100, 'active', 3),
('Student Discount', 'percentage', 15.00, '[4]', '2025-01-01', '2025-12-31', 0, 'active', 3),
('Premium Upgrade', 'fixed_amount', 100.00, '[2,3]', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), 50, 'active', 3);

-- Insert sample AI insights
INSERT INTO AI_Insights (user_id, churn_probability, recommended_plan_id, recommendation_reason, confidence_score, expires_on) VALUES
(1, 25.50, 2, 'User shows high engagement, recommend upgrade to Premium', 85.00, DATE_ADD(CURDATE(), INTERVAL 7 DAY)),
(5, 85.20, 1, 'User at risk of churning, recommend retention offer', 92.00, DATE_ADD(CURDATE(), INTERVAL 3 DAY)),
(4, 10.30, 3, 'User consistently exceeds quota, suggest Enterprise plan', 78.50, DATE_ADD(CURDATE(), INTERVAL 7 DAY));

-- Insert sample notifications
INSERT INTO Notifications (user_id, title, message, type, is_read) VALUES
(1, 'Plan Upgrade Recommendation', 'Based on your usage, we recommend upgrading to Premium Plan', 'recommendation', FALSE),
(2, 'Bill Generated', 'Your monthly bill of ₹599 has been generated', 'billing', FALSE),
(4, 'Subscription Renewal', 'Your subscription will expire in 5 days', 'subscription', FALSE),
(5, 'Special Offer', 'Get 20% off on your next subscription renewal', 'system', FALSE);

-- Insert sample logs
INSERT INTO Logs (sub_id, user_id, current_status, next_status, action, action_date, ip_address, user_agent) VALUES
(1, 1, 'inactive', 'active', 'subscription_created', CURDATE(), '192.168.1.1', 'Mozilla/5.0'),
(2, 2, 'inactive', 'active', 'subscription_created', CURDATE(), '192.168.1.2', 'Mozilla/5.0'),
(3, 4, 'inactive', 'active', 'subscription_created', DATE_SUB(CURDATE(), INTERVAL 15 DAY), '192.168.1.3', 'Mozilla/5.0');