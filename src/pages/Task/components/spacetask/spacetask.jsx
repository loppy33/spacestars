import './spacetask.sass';
import Succes from "../../../../assets/icons/succes.png";
import Twitter from "../../../../assets/icons/twitter.png";
import Telegram from "../../../../assets/icons/teleg.png";
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

const userId = window.Telegram.WebApp.initDataUnsafe.user.id;


export default function SpaceTask() {
    // Fetch user tasks
    const { data: completedTasks = [], refetch: refetchTasks } = useQuery(
        'userTasks',
        async () => {
            const response = await axios.get(`http://38.180.23.221:3000/api/users/getUser/${userId}`);
            return response.data.tasks || [];
        }
    );

    // Mutation for completing tasks
    const completeTaskMutation = useMutation(
        ({ task }) => axios.post('http://38.180.23.221:3000/api/farming/completeTask', { id: userId, task }),
        {
            onSuccess: () => {
                refetchTasks(); // Refresh tasks after completing
            }
        }
    );

    const handleCompleteTask = async (task) => {
        try {
            await completeTaskMutation.mutateAsync({ task });
        } catch (error) {
            console.error('Error completing task', error);
        }
    };

    return (
        <div className="SpaceTask">
            <h2>Basic Tasks</h2>
            <ul>
                <TaskItem
                    id="followTwitter"
                    icon={Twitter}
                    text="Follow on Twitter (X)"
                    reward="+ 400 PN"
                    completedTasks={completedTasks}
                    handleCompleteTask={handleCompleteTask}
                />
                <TaskItem
                    id="joinChannel"
                    icon={Telegram}
                    text="Join News channel"
                    reward="+ 400 PN"
                    completedTasks={completedTasks}
                    handleCompleteTask={handleCompleteTask}
                />
            </ul>
            <h2>Daily Tasks</h2>
            <ul>
                <TaskItem
                    id="dailyFollowTwitter"
                    icon={Twitter}
                    text="Follow on Twitter (X)"
                    reward="+ 400 PN"
                    completedTasks={completedTasks}
                    handleCompleteTask={handleCompleteTask}
                />
                <TaskItem
                    id="dailyJoinChannel"
                    icon={Telegram}
                    text="Join News channel"
                    reward="+ 400 PN"
                    completedTasks={completedTasks}
                    handleCompleteTask={handleCompleteTask}
                />
            </ul>
        </div>
    );
}

// TaskItem component to render each task item
function TaskItem({ id, icon, text, reward, completedTasks, handleCompleteTask }) {
    const isCompleted = completedTasks.includes(id);

    return (
        <li>
            <div className="info" id={id}>
                <img className="icon" src={icon} alt="" />
                <p>{text} <br /> <span>{reward}</span></p>
            </div>
            {isCompleted ? (
                <img className="completed" src={Succes} alt="Completed" />
            ) : (
                <a
                    href={id === 'followTwitter' ? 'https://twitter.com' : 'https://telegram.org'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleCompleteTask(id)}
                >
                    Go
                </a>
            )}
        </li>
    );
}