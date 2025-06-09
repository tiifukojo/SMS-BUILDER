-- Create the database and tables for the SMS messaging platform
CREATE DATABASE IF NOT EXISTS lab_sms_platform;
USE lab_sms_platform;

-- Patients table (existing)
CREATE TABLE IF NOT EXISTS patients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  date_of_birth DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Billing table (existing)
CREATE TABLE IF NOT EXISTS billing (
  id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'paid', 'overdue') DEFAULT 'pending',
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- Accessions table (existing)
CREATE TABLE IF NOT EXISTS accessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT NOT NULL,
  test_name VARCHAR(255) NOT NULL,
  status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
  result_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- SMS Templates table
CREATE TABLE IF NOT EXISTS sms_templates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  message_template TEXT NOT NULL,
  description TEXT,
  category ENUM('registration', 'collection', 'billing', 'results', 'general') DEFAULT 'general',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- SMS Schedules table
CREATE TABLE IF NOT EXISTS sms_schedules (
  id INT PRIMARY KEY AUTO_INCREMENT,
  template_id INT NOT NULL,
  recipient_type ENUM('single', 'multiple', 'all') NOT NULL,
  recipient_ids JSON, -- Array of patient IDs for multiple recipients
  send_at DATETIME NOT NULL,
  frequency ENUM('once', 'daily', 'weekly', 'monthly') DEFAULT 'once',
  status ENUM('pending', 'sent', 'failed', 'cancelled') DEFAULT 'pending',
  created_by VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (template_id) REFERENCES sms_templates(id)
);

-- SMS Logs table
CREATE TABLE IF NOT EXISTS sms_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  template_id INT,
  schedule_id INT,
  patient_id INT,
  billing_id INT,
  accession_id INT,
  phone_number VARCHAR(20) NOT NULL,
  parsed_message TEXT NOT NULL,
  status ENUM('sent', 'failed', 'pending') DEFAULT 'pending',
  error_message TEXT,
  sent_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (template_id) REFERENCES sms_templates(id),
  FOREIGN KEY (schedule_id) REFERENCES sms_schedules(id),
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (billing_id) REFERENCES billing(id),
  FOREIGN KEY (accession_id) REFERENCES accessions(id)
);
