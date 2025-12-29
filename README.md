Project Documentation — Hospital Appointment Management System
1. Introduction

The Hospital Appointment Management System is a web-based platform designed to simplify the process of scheduling and managing appointments between patients, representatives, doctors, and hospital departments.The main purpose of this system is to provide an organized, fast, and accessible way to handle hospital appointments without relying on manual paperwork.Through this system, administrators can manage departments, doctors, representatives, patients, schedules, and appointments using a simple dashboard. The system also stores all records in a database, allowing easy retrieval, updating, and deletion of information.This project demonstrates the integration of HTML, CSS, JavaScript, PHP, and MySQL to create a full CRUD (Create, Read, Update, Delete) system.

2. Database Design

2.1 Entity-Relationship (ER) Diagram – Text Description

ER Diagram

Departments

One department can have many doctors.


Doctors

Belongs to one department.

One doctor can have many schedules.

One doctor can have many appointments.

Patients

A patient can have many appointments.

Representatives

A representative can also have many appointments.

Schedules

A schedule belongs to one doctor.

A schedule can be used for many appointments.

Appointments

Connected to: doctors, patients, representatives, and schedules.

2.2 Database Tables and Descriptions

1. departments
Column		Type		Description
id		INT PK		Unique ID for each department
name		VARCHAR		Department name

2. doctors
Column		Type		Description
id		INT PK		Unique doctor ID
name		VARCHAR		Doctor full name
department_id	INT FK		Links doctor to a department

3. representatives
Column		Type		Description
id		INT PK		Unique representative ID
name		VARCHAR		Full name
email		VARCHAR		Email address
phone		VARCHAR		Contact number
role		VARCHAR		Position or responsibility

4. patients
Column		Type		Description
id		INT PK		Unique patient ID
name		VARCHAR		Full patient name
email		VARCHAR		Email address
phone		VARCHAR		Contact number
dob		DATE		Date of birth
address		VARCHAR		Home address

5. schedules
Column		Type		Description
id		INT PK		Unique schedule ID
doctor_id	INT FK		Assigned doctor
day		VARCHAR		Day of the week
time		VARCHAR		Time range

6. appointments
Column	  		Type			Description
id			INT PK		Appointment ID
patient_id		INT FK		Selected patient
representative_id	INT FK		Assigned representative
doctor_id		INT FK		Selected doctor
schedule_id		INT FK		Chosen schedule
status			VARCHAR		Appointment status (Pending/Approved/Cancelled)

3. Web Interface
3.1 Overview of Key Pages
 Dashboard Page
Displays totals: departments, doctors, patients, representatives, schedules, and appointments.
Shows quick statistics.
 Departments Page
Add, edit, and delete departments.
Displays a list of all existing departments.
 Doctors Page
Assign doctors to departments.
Update and delete doctor information.
View all doctors in a table.
 Representatives Page
Add new representatives.
Update representative details.
Delete representatives.
Displays a dynamic list from the database.
 Patients Page
Register patients.
Edit patient information.
Remove patient records.
Shows full patient list.
 Schedules Page
Assign schedules to doctors.
Update or delete schedules.
Access schedule list.
 Appointments Page
Create new appointments using dropdowns (patient, representative, doctor, schedule).
Edit and update appointment details.
Delete or cancel appointments.
View all appointment records.

4. Challenges and Learning

Challenges 

1.Managing multiple CRUD operations (departments, doctors, reps, patients, schedules, appointments) was complex because each module required separate PHP files.
2.Integrating PHP with JavaScript for fetching data was challenging, especially with asynchronous functions.
3.Debugging fetch errors due to incorrect file paths and missing PHP files.

Insights and Learnings

1.I learned how frontend and backend communicate using AJAX (Fetch API).
2.I gained experience in creating a modular PHP backend with clean CRUD scripts.
3.I now understand better how to structure a full web project folder.
4.I learned to debug by checking:
-Browser console logs

