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
                const response = await axios.get(`https://38.180.23.221:3000/api/users/getUser/${user.id}`);
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
                const now = new Date().getTime();
                const endTime = farmingStartTime + 8 * 60 * 60 * 1000; 

                if (now < endTime) {
                    setFarmBalance(prevBalance => prevBalance + FARMING_AMOUNT);
                    const timeDiff = endTime - now;
                    setTimeRemaining(formatTimeDiff(timeDiff));
                } else {
                    clearInterval(interval);
                    setFarmingStartTime(null);
                    setRewardAvailable(true);
                    setTimeRemaining(null);
                }
            }, FARMING_INTERVAL);
        };

        if (farmingStartTime) {
            const now = new Date().getTime();
            const elapsedTime = now - farmingStartTime;
            const earnedAmount = (elapsedTime / FARMING_INTERVAL) * FARMING_AMOUNT;
            setFarmBalance(earnedAmount);

            startFarmingInterval();

            return () => {
                clearInterval(interval);
            };
        }
    }, [farmingStartTime]);

    const startFarming = async () => {
        if (!farmingStartTime && !rewardAvailable) {
            const farmingStartTime = new Date().toISOString();
            try {
                await axios.post('https://38.180.23.221:3000/api/farming/startFarming', {
                    id: user.id,
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
                await axios.post('https://38.180.23.221:3000/api/farming/claimReward', {
                    id: user.id,
                    amount: farmBalance.toFixed(3)
                });

                await axios.post('https://38.180.23.221:3000/api/farming/startFarming', {
                    id: user.id,
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
