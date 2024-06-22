import './Farm.sass';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FARMING_INTERVAL = 500; // Interval in milliseconds (0.5 seconds)
const FARMING_AMOUNT = 0.001; // Amount earned per interval

export default function Farm({ setBalance }) {
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    const [farmingStartTime, setFarmingStartTime] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [rewardAvailable, setRewardAvailable] = useState(false);
    const [farmBalance, setFarmBalance] = useState(0)

    useEffect(() => {
        const fetchFarmingData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/users/getUser/1234`);
                const { farmingTime } = response.data;

                if (farmingTime) {
                    setFarmingStartTime(new Date(farmingTime).getTime());
                }
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        fetchFarmingData();
    }, []);

    useEffect(() => {
        let interval;

        const startFarmingInterval = () => {
            interval = setInterval(() => {
                setFarmBalance(prevBalance => prevBalance + FARMING_AMOUNT);
            }, FARMING_INTERVAL);
        };

        const stopFarmingInterval = () => {
            clearInterval(interval);
        };

        if (farmingStartTime) {
        
            const endTime = new Date(farmingStartTime);
            // endTime.setHours(endTime.getHours() + 8); // 1 minute farming time
            endTime.setSeconds(endTime.getSeconds() + 5); // 1 minute farming time

            const checkTime = () => {
                const now = new Date();

                if (now < endTime) {
                    const timeDiff = endTime - now;
                    setTimeRemaining(formatTimeDiff(timeDiff));
                } else {
                    stopFarmingInterval();
                    setFarmingStartTime(null);
                    setRewardAvailable(true);
                }
            };

            const farmingStartTimeDate = new Date(farmingStartTime);
            const currentTime = new Date();
            const elapsedTime = currentTime - farmingStartTimeDate;
            const earnedAmount = (elapsedTime / FARMING_INTERVAL) * FARMING_AMOUNT;
            setFarmBalance(earnedAmount);

            startFarmingInterval();

            const timer = setInterval(checkTime, 1000);

            return () => {
                clearInterval(timer);
                stopFarmingInterval();
            };
        }
    }, [farmingStartTime]);

    const startFarming = async () => {
        if (!farmingStartTime && !rewardAvailable) {
            const farmingStartTime = new Date().toISOString();
            try {
                await axios.post('http://localhost:3000/api/farming/startFarming', {
                    id: 1234,
                    farmingTime: farmingStartTime
                });
                setFarmingStartTime(new Date(farmingStartTime).getTime());
                setRewardAvailable(false);
            } catch (error) {
                console.error('Error starting farming', error);
            }
        }
    };

    const claimReward = async () => {
        if (rewardAvailable && farmBalance > 0) {
            try {
                await axios.post('http://localhost:3000/api/farming/claimReward', {
                    id: 1234,
                    amount: farmBalance.toFixed(3)
                });

                await axios.post('http://localhost:3000/api/farming/startFarming', {
                    id: 1234,
                    farmingTime: null
                });
                setFarmingStartTime(null);
                setBalance(prevBalance => prevBalance + farmBalance)
                setFarmBalance(0);
                setRewardAvailable(false);

            } catch (error) {
                console.error('Error claiming reward', error);
            }
        }
    };

    const formatTimeDiff = (timeDiff) => {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div className="Farm">
            {!farmingStartTime && !rewardAvailable && (
                <div className="startFarming" onClick={startFarming}>
                    <h2>Start Farming</h2>
                </div>
            )}
            {farmingStartTime && (
                <div className="farming">
                    <h2>Farming {farmBalance.toFixed(3)}</h2>
                    <h2>{timeRemaining}</h2>
                </div>
            )}
            {rewardAvailable && farmBalance > 0 && (
                <div className="claimReward" onClick={claimReward}>
                    <h2>Claim {farmBalance.toFixed(3)} PN</h2>
                </div>
            )}
        </div>
    );
}
