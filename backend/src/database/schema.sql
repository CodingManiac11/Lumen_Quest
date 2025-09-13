CREATE DATABASE IF NOT EXISTS subscription_db;
USE subscription_db;

-- Drop tables if they exist (for clean setup)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS AI_Insights;
DROP TABLE IF EXISTS Logs;
DROP TABLE IF EXISTS Billing;
DROP TABLE IF EXISTS Usage;
DROP TABLE IF EXISTS Subscriptions;
DROP TABLE IF EXISTS Plans;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Discounts;
DROP TABLE IF EXISTS Notifications;
SET FOREIGN_KEY_CHECKS = 1;

-- Users table
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user','admin') DEFAULT 'user',
    status ENUM('active','inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status)
);

-- Plans table
CREATE TABLE Plans (
    plan_id INT PRIMARY KEY AUTO_INCREMENT,
    plan_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quota_sessions INT NOT NULL,
    validity_days INT DEFAULT 30,
    auto_renewal_allowed ENUM('Yes','No') DEFAULT 'Yes',
    description TEXT,
    status ENUM('Active','Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_price (price)
);

-- Subscriptions table
CREATE TABLE Subscriptions (
    sub_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    plan_id INT NOT NULL,
    type ENUM('prepaid','postpaid') DEFAULT 'prepaid',
    status ENUM('active','paused','expired','cancelled') DEFAULT 'active',
    start_date DATE NOT NULL,
    end_date DATE,
    last_billed_date DATE,
    last_renewed_date DATE,
    terminated_date DATE,
    grace_time INT DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES Plans(plan_id) ON DELETE RESTRICT,
    INDEX idx_user_id (user_id),
    INDEX idx_plan_id (plan_id),
    INDEX idx_status (status),
    INDEX idx_start_date (start_date),
    INDEX idx_end_date (end_date)
);

-- Usage table
CREATE TABLE Usage (
    usage_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    month DATE NOT NULL,
    sessions_attended INT DEFAULT 0,
    utilization_ratio DECIMAL(5,2) DEFAULT 0.00,
    renewal_status ENUM('renewed','not_renewed') DEFAULT 'renewed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_month (user_id, month),
    INDEX idx_user_id (user_id),
    INDEX idx_month (month),
    INDEX idx_utilization (utilization_ratio)
);

-- Billing table
CREATE TABLE Billing (
    billing_id INT PRIMARY KEY AUTO_INCREMENT,
    sub_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    discount_applied DECIMAL(5,2) DEFAULT 0,
    billing_date DATE NOT NULL,
    payment_status ENUM('paid','pending','failed') DEFAULT 'paid',
    payment_method ENUM('credit_card','debit_card','upi','cash') DEFAULT 'credit_card',
    transaction_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sub_id) REFERENCES Subscriptions(sub_id) ON DELETE CASCADE,
    INDEX idx_sub_id (sub_id),
    INDEX idx_billing_date (billing_date),
    INDEX idx_payment_status (payment_status)
);

-- Logs table
CREATE TABLE Logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    sub_id INT,
    user_id INT,
    current_status VARCHAR(50),
    next_status VARCHAR(50),
    action VARCHAR(100) NOT NULL,
    action_date DATE NOT NULL,
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    additional_data JSON,
    FOREIGN KEY (sub_id) REFERENCES Subscriptions(sub_id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL,
    INDEX idx_sub_id (sub_id),
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_action_date (action_date)
);

-- AI Insights table
CREATE TABLE AI_Insights (
    insight_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    churn_probability DECIMAL(5,2) DEFAULT 0.00,
    recommended_plan_id INT,
    recommendation_reason TEXT,
    confidence_score DECIMAL(5,2) DEFAULT 0.00,
    generated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_on TIMESTAMP NULL,
    status ENUM('active','expired','applied') DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (recommended_plan_id) REFERENCES Plans(plan_id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_churn_probability (churn_probability),
    INDEX idx_generated_on (generated_on)
);

-- Discounts table
CREATE TABLE Discounts (
    discount_id INT PRIMARY KEY AUTO_INCREMENT,
    discount_name VARCHAR(100) NOT NULL,
    discount_type ENUM('percentage','fixed_amount') DEFAULT 'percentage',
    discount_value DECIMAL(10,2) NOT NULL,
    applicable_plans JSON, -- Array of plan_ids
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    usage_limit INT DEFAULT 0, -- 0 means unlimited
    usage_count INT DEFAULT 0,
    status ENUM('active','inactive','expired') DEFAULT 'active',
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES Users(user_id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_date_range (start_date, end_date)
);

-- User Notifications table
CREATE TABLE Notifications (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('subscription','billing','recommendation','system') DEFAULT 'system',
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_type (type)
);