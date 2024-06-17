import './spacetask.sass';
import Succes from "../../../../assets/icons/succes.png";
import Twitter from "../../../../assets/icons/twitter.png";
import Telegram from "../../../../assets/icons/teleg.png";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SpaceTask() {
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        const fetchUserTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/getUser/1234`);
                setCompletedTasks(response.data.tasks || []);
            } catch (error) {
                console.error('Error fetching user tasks', error);
            }
        };

        fetchUserTasks();
    }, []);

    const handleCompleteTask = async (task) => {
        try {
            const response = await axios.post('http://localhost:3000/completeTask', {
                id: 1234,
                task
            });

            setCompletedTasks(response.data);
        } catch (error) {
            console.error('Error completing task', error);
        }
    };

    return (
        <div className="SpaceTask">
            <h2>Basic Tasks</h2>
            <ul>
                <li>
                    <div className="info" id='followTwitter'>
                        <img className='icon' src={Twitter} alt="" />
                        <p>Follow on twitter(X) <br /> <span>+ 400 PN</span></p>
                    </div>
                    {completedTasks.includes('followTwitter') ? (
                        <img className='completed' src={Succes} alt="" />
                    ) : (
                        <a href="https://twitter.com" onClick={() => handleCompleteTask('followTwitter')}>Go</a>
                    )}
                </li>
                <li>
                    <div className="info" id='joinChannel'>
                        <img className='icon' src={Telegram} alt="" />
                        <p>Join News channel <br /> <span>+ 400 PN</span></p>
                    </div>
                    {completedTasks.includes('joinChannel') ? (
                        <img className='completed' src={Succes} alt="" />
                    ) : (
                        <a href="https://telegram.org" onClick={() => handleCompleteTask('joinChannel')}>Go</a>
                    )}
                </li>
            </ul>
            <h2>Daily Tasks</h2>
            <ul>
                <li>
                    <div className="info" id='dailyFollowTwitter'>
                        <img className='icon' src={Twitter} alt="" />
                        <p>Follow on twitter(X) <br /> <span>+ 400 PN</span></p>
                    </div>
                    {completedTasks.includes('dailyFollowTwitter') ? (
                        <img className='completed' src={Succes} alt="" />
                    ) : (
                        <a href="https://twitter.com" onClick={() => handleCompleteTask('dailyFollowTwitter')}>Go</a>
                    )}
                </li>
                <li>
                    <div className="info" id='dailyJoinChannel'>
                        <img className='icon' src={Telegram} alt="" />
                        <p>Join News channel <br /> <span>+ 400 PN</span></p>
                    </div>
                    {completedTasks.includes('dailyJoinChannel') ? (
                        <img className='completed' src={Succes} alt="" />
                    ) : (
                        <a href="https://telegram.org" onClick={() => handleCompleteTask('dailyJoinChannel')}>Go</a>
                    )}
                </li>
            </ul>
        </div>
    );
}
