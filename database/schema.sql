CREATE DATABASE IF NOT EXISTS chit_mitra;
USE chit_mitra;

-- Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) UNIQUE,
    kyc_status ENUM('PENDING', 'VERIFIED', 'REJECTED') DEFAULT 'PENDING',
    trust_score INT DEFAULT 500,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Roles Table
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- User Roles Junction Table
CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Chit Groups Table
CREATE TABLE chit_groups (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    total_amount DECIMAL(15, 2) NOT NULL,
    monthly_contribution DECIMAL(15, 2) NOT NULL,
    duration_months INT NOT NULL,
    max_members INT NOT NULL,
    current_members INT DEFAULT 0,
    status ENUM('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') DEFAULT 'OPEN',
    start_date DATE,
    end_date DATE,
    created_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Group Memberships Table
CREATE TABLE group_memberships (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    group_id BIGINT NOT NULL,
    joined_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ACTIVE', 'DEFAULTED', 'COMPLETED') DEFAULT 'ACTIVE',
    UNIQUE KEY user_group_unique (user_id, group_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES chit_groups(id) ON DELETE CASCADE
);

-- Monthly Auctions / Bids Table
CREATE TABLE auctions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    group_id BIGINT NOT NULL,
    month_number INT NOT NULL,
    auction_date DATETIME NOT NULL,
    status ENUM('SCHEDULED', 'ACTIVE', 'COMPLETED') DEFAULT 'SCHEDULED',
    winner_id BIGINT,
    winning_bid_amount DECIMAL(15, 2),
    dividend_per_member DECIMAL(15, 2),
    FOREIGN KEY (group_id) REFERENCES chit_groups(id) ON DELETE CASCADE,
    FOREIGN KEY (winner_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Contributions (Payments) Table
CREATE TABLE contributions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    membership_id BIGINT NOT NULL,
    auction_id BIGINT NOT NULL,
    amount_due DECIMAL(15, 2) NOT NULL,
    amount_paid DECIMAL(15, 2) DEFAULT 0,
    due_date DATE NOT NULL,
    payment_date DATETIME,
    status ENUM('PENDING', 'PAID', 'LATE', 'DEFAULTED') DEFAULT 'PENDING',
    FOREIGN KEY (membership_id) REFERENCES group_memberships(id) ON DELETE CASCADE,
    FOREIGN KEY (auction_id) REFERENCES auctions(id) ON DELETE CASCADE
);

-- Wallets Table
CREATE TABLE wallets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    balance DECIMAL(15, 2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'INR',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Transactions Table
CREATE TABLE transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    wallet_id BIGINT NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    type ENUM('DEPOSIT', 'WITHDRAWAL', 'CONTRIBUTION_PAYMENT', 'PRIZE_MONEY_RECEIPT', 'DIVIDEND_RECEIPT') NOT NULL,
    status ENUM('PENDING', 'COMPLETED', 'FAILED') DEFAULT 'PENDING',
    reference_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE CASCADE
);

-- KYC Details Table
CREATE TABLE kyc_details (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    document_type ENUM('AADHAAR', 'PAN', 'PASSPORT', 'VOTER_ID') NOT NULL,
    document_number VARCHAR(50) NOT NULL UNIQUE,
    document_url VARCHAR(255),
    verified_by BIGINT,
    verified_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Insert Default Roles
INSERT INTO roles (name) VALUES ('ROLE_USER'), ('ROLE_ADMIN');
