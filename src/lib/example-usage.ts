import { createNotification, createAuditLog } from './notifications';

/**
 * Example function to create a notification when a high-risk employee is detected
 */
export async function notifyHighRiskEmployee(
  userId: string,
  employeeId: string,
  employeeName: string,
  riskScore: number
) {
  // Create a notification
  await createNotification(
    userId,
    'High Risk Employee Detected',
    `${employeeName} has been identified as a high-risk employee with a risk score of ${riskScore}.`,
    'high_risk',
    employeeId,
    `/employees/${employeeId}`
  );

  // Create an audit log entry
  await createAuditLog(
    userId,
    'prediction',
    `High risk prediction for employee ${employeeName} (ID: ${employeeId}) with risk score ${riskScore}`,
    employeeId,
    { riskScore, threshold: 0.7 }
  );
}

/**
 * Example function to create a notification for an upcoming evaluation
 */
export async function notifyUpcomingEvaluation(
  userId: string,
  employeeId: string,
  employeeName: string,
  evaluationDate: Date
) {
  const formattedDate = evaluationDate.toLocaleDateString();
  
  // Create a notification
  await createNotification(
    userId,
    'Upcoming Employee Evaluation',
    `${employeeName} has an evaluation scheduled for ${formattedDate}.`,
    'evaluation',
    employeeId,
    `/employees/${employeeId}/evaluations`
  );

  // Create an audit log entry
  await createAuditLog(
    userId,
    'employee_edit',
    `Scheduled evaluation for ${employeeName} (ID: ${employeeId}) on ${formattedDate}`,
    employeeId,
    { evaluationDate: evaluationDate.toISOString() }
  );
}

/**
 * Example function to create a notification for system maintenance
 */
export async function notifySystemMaintenance(
  userId: string,
  maintenanceDate: Date,
  duration: string
) {
  const formattedDate = maintenanceDate.toLocaleDateString();
  
  // Create a notification
  await createNotification(
    userId,
    'System Maintenance Scheduled',
    `The system will be undergoing maintenance on ${formattedDate} for approximately ${duration}.`,
    'system'
  );

  // Create an audit log entry
  await createAuditLog(
    userId,
    'data_upload',
    `System maintenance scheduled for ${formattedDate} with duration of ${duration}`,
    undefined,
    { maintenanceDate: maintenanceDate.toISOString(), duration }
  );
} 