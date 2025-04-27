/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useGetAllLogsQuery } from "../../../redux/features/Logs/logs.api";
import { Log } from "../../../types/project.types";

const Reminder = () => {
  const { user } = useSelector((state: any) => state.auth);

  // Fetch logs using the user's email
  const { data: getAllLogs = [] } = useGetAllLogsQuery(user?.email);

  const logs: Log[] = getAllLogs?.data || [];

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const thisWeekReminders = logs.filter((interaction) => {
    const interactionDate = new Date(interaction.date);
    return interactionDate >= today && interactionDate <= nextWeek;
  });

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">This Week's Reminders</h2>
      <ul className="space-y-2">
        {thisWeekReminders.map((interaction) => (
          <li key={interaction._id} className="border p-2 rounded shadow">
            <p className="font-semibold">Type: {interaction.interactionType}</p>
            <p>Date: {new Date(interaction.date).toLocaleDateString()}</p>
            {interaction.clientId && <p>Client: {interaction.clientId.name}</p>}
            {interaction.projectId && (
              <p>Project: {interaction.projectId.title}</p>
            )}
            <p className="text-sm text-gray-600">{interaction.notes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminder;
