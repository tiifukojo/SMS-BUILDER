-- Seed data for testing
USE lab_sms_platform;

-- Insert sample patients
INSERT INTO patients (name, phone_number, email, date_of_birth) VALUES
('John Doe', '+1234567890', 'john.doe@email.com', '1985-06-15'),
('Jane Smith', '+1987654321', 'jane.smith@email.com', '1990-03-22'),
('Bob Johnson', '+1555123456', 'bob.johnson@email.com', '1978-11-08'),
('Alice Brown', '+1444987654', 'alice.brown@email.com', '1992-09-14'),
('Charlie Wilson', '+1333456789', 'charlie.wilson@email.com', '1980-12-03');

-- Insert sample billing records
INSERT INTO billing (patient_id, amount, status, due_date) VALUES
(1, 150.00, 'pending', '2024-02-15'),
(2, 200.50, 'paid', '2024-01-30'),
(3, 75.25, 'overdue', '2024-01-15'),
(4, 300.00, 'pending', '2024-02-20'),
(5, 125.75, 'pending', '2024-02-10');

-- Insert sample accessions
INSERT INTO accessions (patient_id, test_name, status, result_date) VALUES
(1, 'Blood Test', 'completed', '2024-01-25'),
(2, 'X-Ray', 'in_progress', NULL),
(3, 'MRI Scan', 'completed', '2024-01-20'),
(4, 'CT Scan', 'pending', NULL),
(5, 'Ultrasound', 'completed', '2024-01-22');

-- Insert sample SMS templates
INSERT INTO sms_templates (name, message_template, description, category) VALUES
('Patient Registration', 'Hello {{patient_name}}, welcome to our lab! Your registration is complete. Contact us at (555) 123-4567 for any questions.', 'Welcome message for new patients', 'registration'),
('Sample Collection Reminder', 'Hi {{patient_name}}, this is a reminder for your {{test_name}} sample collection scheduled for tomorrow. Please arrive fasting.', 'Reminder for sample collection', 'collection'),
('Billing Notice', 'Dear {{patient_name}}, your bill of ${{amount}} is due on {{due_date}}. Please make payment to avoid late fees.', 'Payment reminder for patients', 'billing'),
('Results Ready', 'Hello {{patient_name}}, your {{test_name}} results are ready for pickup. Available on {{result_date}}.', 'Notification when results are available', 'results'),
('Appointment Confirmation', 'Hi {{patient_name}}, your appointment for {{test_name}} is confirmed for {{appointment_date}}. See you then!', 'Appointment confirmation message', 'general');
