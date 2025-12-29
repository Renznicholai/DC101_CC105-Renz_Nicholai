<?php
include 'db.php';
$sql = "SELECT a.appointment_id, a.appointment_date, a.appointment_time, a.status, a.created_at,
               p.full_name as patient_name, d.full_name as doctor_name, dep.name as department_name, r.name as rep_name
        FROM appointments a
        LEFT JOIN patients p ON a.patient_id = p.patient_id
        LEFT JOIN doctors d ON a.doctor_id = d.doctor_id
        LEFT JOIN departments dep ON a.department_id = dep.dept_id
        LEFT JOIN representatives r ON a.representative_id = r.rep_id
        ORDER BY a.appointment_date DESC, a.appointment_time DESC";
$res = $conn->query($sql);
if($res->num_rows === 0){ echo "<div class='form-card'>No appointments.</div>"; exit; }
echo "<table class='table'><thead><tr><th>Patient</th><th>Doctor</th><th>Dept</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th></tr></thead><tbody>";
while($r = $res->fetch_assoc()){
    $id = intval($r['appointment_id']);
    $date = htmlspecialchars($r['appointment_date']);
    $time = htmlspecialchars(substr($r['appointment_time'],0,5));
    echo "<tr>
      <td>".htmlspecialchars($r['patient_name'])."</td>
      <td>".htmlspecialchars($r['doctor_name'])."</td>
      <td>".htmlspecialchars($r['department_name'])."</td>
      <td data-date='{$date}'>".$date."</td>
      <td>".$time."</td>
      <td>".htmlspecialchars($r['status'])."</td>
      <td>
        <button class='small-btn edit' data-edit='{$id}'>Edit</button>
        <button class='small-btn delete' data-delete='{$id}'>Delete</button>
      </td></tr>";
}
echo "</tbody></table>";
?>
