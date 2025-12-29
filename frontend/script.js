// script.js
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  loadAllLists();
  attachForms();
});

function initNav(){
  document.querySelectorAll('.nav-link').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(n=>n.classList.remove('active'));
      a.classList.add('active');
      showSection(a.dataset.section);
    });
  });
}
function showSection(id){
  document.querySelectorAll('.section').forEach(s=> s.classList.remove('active-section'));
  const el = document.getElementById(id);
  if(el) el.classList.add('active-section');
}

async function loadAllLists(){
  await Promise.all([
    loadDepartments(),
    loadDoctors(),
    loadReps(),
    loadPatients(),
    loadSchedules(),
    loadAppointments(),
    loadDashboardCounts()
  ]);
}


async function loadDepartments(){
  try {
    const res = await fetch('get_departments.php');
    const data = await res.json();
    const container = document.getElementById('deptList');
    if(!Array.isArray(data)) return container.innerText = 'Error loading';
    if(data.length===0) container.innerHTML = '<div class="form-card">No departments</div>';
    else {
      let html = '<table class="table"><thead><tr><th>Name</th><th>Description</th><th>Actions</th></tr></thead><tbody>';
      data.forEach(d=>{
        html += `<tr>
          <td>${escapeHtml(d.name)}</td>
          <td>${escapeHtml(d.description||'')}</td>
          <td>
            <button class="small-btn edit" onclick="promptEditDept(${d.dept_id})">Edit</button>
            <button class="small-btn delete" onclick="deleteDept(${d.dept_id})">Delete</button>
          </td></tr>`;
      });
      html += '</tbody></table>';
      container.innerHTML = html;
    }
    // fill select
    const sel = document.getElementById('doc_dept');
    const apptDept = document.getElementById('appt_dept');
    sel.innerHTML = '<option value="">Select department</option>';
    apptDept.innerHTML = '<option value="">Select department</option>';
    data.forEach(d=>{
      sel.innerHTML += `<option value="${d.dept_id}">${escapeHtml(d.name)}</option>`;
      apptDept.innerHTML += `<option value="${d.dept_id}">${escapeHtml(d.name)}</option>`;
    });
  } catch(e){ console.error(e); }
}
document.getElementById?.('deptForm')?.addEventListener('submit', async (e)=>{
  if(e) e.preventDefault();
  const name = document.getElementById('dept_name').value.trim();
  const desc = document.getElementById('dept_desc').value.trim();
  if(!name) return alert('Name required');
  try {
    const res = await fetch('add_department.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,description:desc})});
    const data = await res.json();
    if(data.success){ alert('Added'); document.getElementById('deptForm').reset(); loadDepartments(); loadDashboardCounts(); }
    else alert(data.error||'Error');
  } catch(err){ console.error(err); alert('Network error'); }
});
async function promptEditDept(id){
  const name = prompt('New department name:');
  if(!name) return;
  const desc = prompt('New description (optional):');
  try {
    const res = await fetch('update_department.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({dept_id:id,name,description:desc})});
    const data = await res.json();
    if(data.success) { alert('Updated'); loadDepartments(); }
    else alert(data.error || 'Error');
  } catch(err){ console.error(err); }
}
async function deleteDept(id){
  if(!confirm('Delete department?')) return;
  try {
    const res = await fetch('delete_department.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({dept_id:id})});
    const data = await res.json();
    if(data.success){ alert('Deleted'); loadDepartments(); loadDashboardCounts(); }
    else alert(data.error||'Error');
  } catch(err){ console.error(err); }
}


async function loadDoctors(){
  try {
    const res = await fetch('get_doctors.php');
    const data = await res.json();
    const container = document.getElementById('doctorList');
    if(!Array.isArray(data)) return container.innerText = 'Error';
    if(data.length===0) container.innerHTML = '<div class="form-card">No doctors</div>';
    else {
      let html = '<table class="table"><thead><tr><th>Name</th><th>Dept</th><th>Spec</th><th>Contact</th><th>Actions</th></tr></thead><tbody>';
      data.forEach(d=>{
        html += `<tr>
          <td>${escapeHtml(d.full_name)}</td>
          <td>${escapeHtml(d.department_name||'')}</td>
          <td>${escapeHtml(d.specialization||'')}</td>
          <td>${escapeHtml(d.phone||'')}</td>
          <td>
            <button class="small-btn edit" onclick="promptEditDoctor(${d.doctor_id})">Edit</button>
            <button class="small-btn delete" onclick="deleteDoctor(${d.doctor_id})">Delete</button>
          </td></tr>`;
      });
      html += '</tbody></table>';
      container.innerHTML = html;
    }

   
    const sel = document.getElementById('sched_doctor');
    const apptDoc = document.getElementById('appt_doctor');
    sel.innerHTML = '<option value="">Select doctor</option>';
    apptDoc.innerHTML = '<option value="">Select doctor</option>';
    data.forEach(d=>{
      sel.innerHTML += `<option value="${d.doctor_id}">${escapeHtml(d.full_name)} (${escapeHtml(d.department_name||'')})</option>`;
      apptDoc.innerHTML += `<option value="${d.doctor_id}">${escapeHtml(d.full_name)}</option>`;
    });
  } catch(e){ console.error(e); }
}
document.getElementById?.('doctorForm')?.addEventListener('submit', async (e)=>{
  if(e) e.preventDefault();
  const full_name = document.getElementById('doc_name').value.trim();
  const email = document.getElementById('doc_email').value.trim();
  const phone = document.getElementById('doc_phone').value.trim();
  const department_id = document.getElementById('doc_dept').value || null;
  const specialization = document.getElementById('doc_spec').value.trim();
  if(!full_name) return alert('Name required');
  try {
    const res = await fetch('add_doctor.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({full_name,email,phone,department_id,specialization})});
    const data = await res.json();
    if(data.success){ alert('Doctor added'); document.getElementById('doctorForm').reset(); loadDoctors(); loadDashboardCounts(); }
    else alert(data.error||'Error');
  } catch(err){ console.error(err); alert('Network error'); }
});
async function promptEditDoctor(id){
  const name = prompt('Doctor name:');
  if(!name) return;
  const email = prompt('Email (optional):');
  const phone = prompt('Phone (optional):');
  
  const dept = prompt('Department ID (leave blank to keep):');
  const spec = prompt('Specialization (optional):');
  try {
    const payload = {doctor_id:id, full_name:name, email:email || null, phone:phone || null, department_id: dept?parseInt(dept):null, specialization: spec||null};
    const res = await fetch('update_doctor.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const data = await res.json();
    if(data.success){ alert('Updated'); loadDoctors(); }
    else alert(data.error||'Error');
  } catch(e){ console.error(e); }
}
async function deleteDoctor(id){
  if(!confirm('Delete doctor?')) return;
  try {
    const res = await fetch('delete_doctor.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({doctor_id:id})});
    const data = await res.json();
    if(data.success){ alert('Deleted'); loadDoctors(); loadDashboardCounts(); }
    else alert(data.error||'Error');
  } catch(e){ console.error(e); }
}


async function loadReps(){
  try {
    const res = await fetch('get_reps.php');
    const data = await res.json();
    const container = document.getElementById('repList');
    if(!Array.isArray(data)) return container.innerText='Error';
    if(data.length===0) container.innerHTML = '<div class="form-card">No reps</div>';
    else {
      let html = '<table class="table"><thead><tr><th>Name</th><th>Role</th><th>Contact</th><th>Actions</th></tr></thead><tbody>';
      data.forEach(r=>{
        html += `<tr><td>${escapeHtml(r.name)}</td><td>${escapeHtml(r.role||'')}</td><td>${escapeHtml(r.phone||'')}</td>
          <td><button class="small-btn edit" onclick="promptEditRep(${r.rep_id})">Edit</button>
          <button class="small-btn delete" onclick="deleteRep(${r.rep_id})">Delete</button></td></tr>`;
      });
      html += '</tbody></table>';
      container.innerHTML = html;
    }
    const sel = document.getElementById('appt_rep');
    sel.innerHTML = '<option value="">Select representative</option>';
    data.forEach(r=> sel.innerHTML += `<option value="${r.rep_id}">${escapeHtml(r.name)}</option>`);
  } catch(e){ console.error(e); }
}
document.getElementById('repForm')?.addEventListener('submit', async (e)=>{
  if(e) e.preventDefault();
  const name = document.getElementById('rep_name').value.trim();
  const email = document.getElementById('rep_email').value.trim();
  const phone = document.getElementById('rep_phone').value.trim();
  const role = document.getElementById('rep_role').value.trim();
  if(!name) return alert('Name required');
 try {
    const res = await fetch('add_rep.php', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({name,email,phone,role})
    });

    const resText = await res.text();  
    console.log('Server response:', resText);

    const data = JSON.parse(resText); 
    console.log('Parsed data:', data);

    if(data.success){
        alert('Added');
        document.getElementById('repForm').reset();
        loadReps();
    } else {
        alert(data.error || 'Error');
    }

} catch(e){
    console.error('Fetch error:', e);
    alert('Fetch error: ' + e.message);
}

});
async function promptEditRep(id){
  const name = prompt('Name:');
  if(!name) return;
  const email = prompt('Email:');
  const phone = prompt('Phone:');
  const role = prompt('Role:');
  try {
    const res = await fetch('update_rep.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({rep_id:id,name,email,phone,role})});
    const data = await res.json();
    if(data.success){ alert('Updated'); loadReps(); }
    else alert(data.error||'Error');
  } catch(e){ console.error(e); }
}
async function deleteRep(id){
  if(!confirm('Delete rep?')) return;
  try {
    const res = await fetch('delete_rep.php', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({rep_id:id})
    });

    const text = await res.text(); 
    console.log('Server response:', text);  

    const data = JSON.parse(text);  
    if(data.success) loadReps();
    else console.error(data.error || 'Error');

  } catch(e){ console.error(e); }
}



async function loadPatients(){
  try {
    const res = await fetch('get_patients.php');
    const data = await res.json();
    const container = document.getElementById('patientList');
    if(!Array.isArray(data)) return container.innerText='Error';
    if(data.length===0) container.innerHTML='<div class="form-card">No patients</div>';
    else {
      let html = '<table class="table"><thead><tr><th>Name</th><th>DOB</th><th>Contact</th><th>Actions</th></tr></thead><tbody>';
      data.forEach(p=>{
        html += `<tr><td>${escapeHtml(p.full_name)}</td><td>${escapeHtml(p.dob||'')}</td><td>${escapeHtml(p.phone||'')}</td>
          <td><button class="small-btn edit" onclick="promptEditPatient(${p.patient_id})">Edit</button>
          <button class="small-btn delete" onclick="deletePatient(${p.patient_id})">Delete</button></td></tr>`;
      });
      html += '</tbody></table>'; container.innerHTML = html;
    }
    const sel = document.getElementById('appt_patient');
    sel.innerHTML = '<option value="">Select patient</option>';
    data.forEach(p=> sel.innerHTML += `<option value="${p.patient_id}">${escapeHtml(p.full_name)}</option>`);
  } catch(e){ console.error(e); }
}
document.getElementById('patientForm')?.addEventListener('submit', async (e)=>{
  if(e) e.preventDefault();

  const full_name = document.getElementById('pat_name').value.trim();
  const email = document.getElementById('pat_email').value.trim();
  const phone = document.getElementById('pat_phone').value.trim();
  const dob = document.getElementById('pat_dob').value || null;
  const address = document.getElementById('pat_address').value.trim();

  if(!full_name) return alert('Name required');

  try {
    const res = await fetch('add_patient.php', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({full_name,email,phone,dob,address})
    });

    const data = await res.json(); 

    if(data.success){ 
        console.log('Patient added');
        document.getElementById('patientForm').reset();
        loadPatients();       
        loadDashboardCounts(); 
    } else {
        console.error(data.error);
    }

  } catch(e){ 
    console.error(e); 
  }
});


async function promptEditPatient(id){
  const name = prompt('Full name:');
  if(!name) return;
  const email = prompt('Email:');
  const phone = prompt('Phone:');
  const dob = prompt('DOB (YYYY-MM-DD):');
  const address = prompt('Address:');
  try {
    const res = await fetch('update_patient.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({patient_id:id,full_name:name,email,phone,dob,address})});
    const data = await res.json();
    if(data.success){ alert('Updated'); loadPatients(); }
    else alert(data.error||'Error');
  } catch(e){ console.error(e); }
}
async function deletePatient(id){   
  if(!confirm('Delete patient?')) return;
  try {
    const res = await fetch('delete_patient.php', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({patient_id:id})
    });

    const text = await res.text();
    console.log('Server response:', text);

    const data = JSON.parse(text);
    if(data.success) loadPatients();  
    else console.error(data.error || 'Error');

  } catch(e){ console.error(e); }
}


async function loadSchedules(){
  try {
    const res = await fetch('get_schedules.php');
    const data = await res.json();
    const container = document.getElementById('scheduleList');
    if(!Array.isArray(data)) return container.innerText='Error';
    if(data.length===0) container.innerHTML='<div class="form-card">No schedules</div>';
    else {
      let html = '<table class="table"><thead><tr><th>Doctor</th><th>Date</th><th>Time</th><th>Capacity</th><th>Actions</th></tr></thead><tbody>';
      data.forEach(s=>{
        html += `<tr><td>${escapeHtml(s.doctor_name)}</td><td>${escapeHtml(s.schedule_date)}</td><td>${escapeHtml(s.start_time.slice(0,5))} - ${escapeHtml(s.end_time.slice(0,5))}</td>
          <td>${s.capacity}</td>
          <td><button class="small-btn delete" onclick="deleteSchedule(${s.schedule_id})">Delete</button></td></tr>`;
      });
      html += '</tbody></table>'; container.innerHTML = html;
    }
    
    const sel = document.getElementById('appt_schedule');
    sel.innerHTML = '<option value="">-- choose schedule --</option>';
    data.forEach(s=> sel.innerHTML += `<option value="${s.schedule_id}" data-date="${s.schedule_date}" data-start="${s.start_time}">${escapeHtml(s.doctor_name)} — ${s.schedule_date} ${s.start_time.slice(0,5)}</option>`);
  } catch(e){ console.error(e); }
}
document.getElementById?.('scheduleForm')?.addEventListener('submit', async (e)=>{
  if(e) e.preventDefault();
  const doctor_id = document.getElementById('sched_doctor').value;
  const schedule_date = document.getElementById('sched_date').value;
  const start_time = document.getElementById('sched_start').value;
  const end_time = document.getElementById('sched_end').value;
  const capacity = parseInt(document.getElementById('sched_capacity').value) || 1;
  if(!doctor_id || !schedule_date || !start_time || !end_time) return alert('Fill required fields');
  try {
    const res = await fetch('add_schedule.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({doctor_id,schedule_date,start_time,end_time,capacity})});
    const data = await res.json();
    if(data.success){ alert('Schedule added'); document.getElementById('scheduleForm').reset(); loadSchedules(); }
    else alert(data.error||'Error');
  } catch(e){ console.error(e); }
});
async function deleteSchedule(id){
  if(!confirm('Delete schedule?')) return;
  try {
    const res = await fetch('delete_schedule.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({schedule_id:id})});
    const data = await res.json();
    if(data.success){ alert('Deleted'); loadSchedules(); }
    else alert(data.error||'Error');
  } catch(e){ console.error(e); }
}


async function loadAppointments(){
  try {
    const res = await fetch('get_appointments.php');
    const html = await res.text();
    document.getElementById('appointmentsList').innerHTML = html;
   
    document.querySelectorAll('[data-edit]').forEach(btn => btn.addEventListener('click', (e)=> openEditAppointment(e.target.dataset.edit)));
    document.querySelectorAll('[data-delete]').forEach(btn => btn.addEventListener('click', (e)=> deleteAppointment(e.target.dataset.delete)));
  } catch(e){ console.error(e); }
}

document.getElementById?.('appointmentForm')?.addEventListener('submit', async (e)=>{
  if(e) e.preventDefault();
  const patient_id = document.getElementById('appt_patient').value;
  const department_id = document.getElementById('appt_dept').value || null;
  const doctor_id = document.getElementById('appt_doctor').value;
  const schedule_id = document.getElementById('appt_schedule').value || null;
  const time = document.getElementById('appt_time').value || null;
  const rep_id = document.getElementById('appt_rep').value || null;
  const appointment_date = document.getElementById('appt_date').value;
  if(!patient_id || !doctor_id || !appointment_date) return alert('Fill required fields');
  try {
    const payload = {patient_id, department_id, doctor_id, schedule_id, appointment_time: time, representative_id: rep_id, appointment_date};
    const res = await fetch('add_appointment.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const data = await res.json();
    if(data.success){ alert('Appointment added'); document.getElementById('appointmentForm').reset(); loadAppointments(); loadDashboardCounts(); }
    else alert(data.error||'Error: ' + JSON.stringify(data));
  } catch(e){ console.error(e); alert('Network error'); }
});

async function openEditAppointment(id){
  try {
    const res = await fetch('get_appointment.php?id='+encodeURIComponent(id));
    const data = await res.json();
    if(!data.success) return alert('Not found');
    const a = data.appointment;
   
    const modal = document.getElementById('editModal');
    const mc = document.getElementById('modalContent');
    mc.innerHTML = `<h3>Edit Appointment</h3>
      <form id="editApptForm">
        <input type="hidden" id="edit_appointment_id" value="${a.appointment_id}">
        <label>Appointment Date</label><input id="edit_appt_date" type="date" value="${a.appointment_date}">
        <label>Appointment Time</label><input id="edit_appt_time" type="time" value="${a.appointment_time.slice(0,5)}">
        <label>Status</label>
        <select id="edit_status"><option ${a.status==='Pending'?'selected':''}>Pending</option><option ${a.status==='Confirmed'?'selected':''}>Confirmed</option><option ${a.status==='Checked-in'?'selected':''}>Checked-in</option><option ${a.status==='Cancelled'?'selected':''}>Cancelled</option></select>
        <div style="margin-top:12px"><button type="button" onclick="closeModal()">Cancel</button>
        <button type="submit">Save</button></div>
      </form>`;
    modal.setAttribute('aria-hidden','false');
    document.getElementById('editApptForm').addEventListener('submit', submitEditAppointment);
  } catch(e){ console.error(e); }
}
function closeModal(){ document.getElementById('editModal').setAttribute('aria-hidden','true'); }
async function submitEditAppointment(e){
  if(e) e.preventDefault();
  const appointment_id = document.getElementById('edit_appointment_id').value;
  const appointment_date = document.getElementById('edit_appt_date').value;
  const appointment_time = document.getElementById('edit_appt_time').value;
  const status = document.getElementById('edit_status').value;
  try {
    const res = await fetch('update_appointment.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({appointment_id,appointment_date,appointment_time,status})});
    const data = await res.json();
    if(data.success){ alert('Updated'); closeModal(); loadAppointments(); loadDashboardCounts(); }
    else alert(data.error||'Error');
  } catch(e){ console.error(e); }
}
async function deleteAppointment(id){
  if(!confirm('Delete appointment?')) return;
  try {
    const res = await fetch('delete_appointment.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({appointment_id:id})});
    const data = await res.json();
    if(data.success){ alert('Deleted'); loadAppointments(); loadDashboardCounts(); }
    else alert(data.error||'Error');
  } catch(e){ console.error(e); }
}


async function loadDashboardCounts(){
  try {
    const [aRes,dRes,pRes] = await Promise.all([fetch('get_appointments.php'), fetch('get_doctors.php'), fetch('get_patients.php')]);
    const aHtml = await aRes.text();
    const tmp = document.createElement('div'); tmp.innerHTML = aHtml;
    const rows = tmp.querySelectorAll('tbody tr').length;
    const doctors = (await dRes.json()).length || 0;
    const patients = (await pRes.json()).length || 0;
    document.getElementById('totalAppointments').textContent = rows;
    document.getElementById('totalDoctors').textContent = doctors;
    document.getElementById('totalPatients').textContent = patients;
  } catch(e){ console.error(e); }
}


function escapeHtml(s){ if(!s && s!==0) return ''; return String(s).replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function attachForms(){

  setInterval(()=> {
   
    loadDepartments(); loadDoctors(); loadReps(); loadPatients(); loadSchedules();
  }, 20000);
}
