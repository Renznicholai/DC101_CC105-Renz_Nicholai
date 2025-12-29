CREATE DATABASE IF NOT EXISTS hospital_appointment CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hospital_appointment;


CREATE TABLE departments (
  dept_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255)
);


CREATE TABLE representatives (
  rep_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  role VARCHAR(50)
);


CREATE TABLE patients (
  patient_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(120),
  phone VARCHAR(20),
  dob DATE,
  address VARCHAR(255)
);


CREATE TABLE doctors (
  doctor_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(120),
  phone VARCHAR(20),
  department_id INT,
  specialization VARCHAR(120),
  FOREIGN KEY (department_id) REFERENCES departments(dept_id) ON DELETE SET NULL
);


CREATE TABLE schedules (
  schedule_id INT AUTO_INCREMENT PRIMARY KEY,
  doctor_id INT NOT NULL,
  schedule_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  capacity INT DEFAULT 1,
  FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE
);


CREATE TABLE appointments (
  appointment_id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  doctor_id INT NOT NULL,
  schedule_id INT,
  department_id INT,
  representative_id INT,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status ENUM('Pending','Confirmed','Checked-in','Cancelled') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE,
  FOREIGN KEY (schedule_id) REFERENCES schedules(schedule_id) ON DELETE SET NULL,
  FOREIGN KEY (department_id) REFERENCES departments(dept_id) ON DELETE SET NULL,
  FOREIGN KEY (representative_id) REFERENCES representatives(rep_id) ON DELETE SET NULL
);


INSERT INTO departments (name, description) VALUES
('Cardiology','Heart related clinic'),
('Pediatrics','Child healthcare'),
('Psychiatry','Mental Health'),
('Oncology','Cancer'),
('Dermatology','Skin clinic');

INSERT INTO representatives (name, email, phone, role) VALUES
('Anna Santos','anna@hospital.com','09170001111','Receptionist'),
('Natsu Dragniel','dragneil@gmail.com','09789067089','Housekeeping Department'),
('Renz Orense','renzorense@gmail.com','09434056076','Pharmacy Department'),	
('Mark Reyes','mark@hospital.com','09170002222','Assistant');

INSERT INTO patients (full_name, email, phone, dob, address) VALUES
('Juan Dela Cruz','juan@gmail.com','09171234567','1995-01-15','123 Sampaguita St'),
('Neji Hyuga','neji@gmail.com','0967087939','2026-01-08','Konoha'),	
('Rock Lee','rocklee@gmail.com','09121012036','2026-06-08','Batanags'),	
('Maria Clara','maria@gmail.com','09179876543','1990-05-18','456 Mabini Ave');

INSERT INTO doctors (full_name, email, phone, department_id, specialization) VALUES
('Dr. Miguel Ramos','miguel@hospital.com','09170003333',1,'Interventional Cardiology'),
('Dr.Nicholai Angeles','nicholaiangeles@gmail.com','09708012150',1,'Neurology'),
('Dr. Liza Perez','liza@hospital.com','09170004444',2,'Pediatrics Specialist');

INSERT INTO schedules (doctor_id, schedule_date, start_time, end_time, capacity) VALUES
(1, '2025-11-20', '09:00:00', '12:00:00', 6),
(2,	'2026-01-01','05:00:00',  '18:50:00',8),
(3, '2025-11-20', '13:00:00', '16:00:00', 6);

INSERT INTO appointments (patient_id, doctor_id, schedule_id, department_id, representative_id, appointment_date, appointment_time) VALUES
(1,1,1,1,1,'2025-11-20','09:30:00'),
(2,2,2,2,2,'2025-11-20','14:00:00'),
(3,3,3,3,3,'2026-01-01','05:00:00');
