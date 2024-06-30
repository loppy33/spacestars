import './achivment.sass';
import FrendPlus from '../../../../assets/icons/frendPlus.png';
import frendPrem from '../../../../assets/icons/frenPrem.png';
import Money100 from '../../../../assets/m100.png';
import Money200 from '../../../../assets/m200.png';
import Money500 from '../../../../assets/m500.png';
import Money1000 from '../../../../assets/m1000.png';
import axios from 'axios';
import { useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';

export default function Achivment({ setBalance }) {
    const userId = window.Telegram.WebApp.initDataUnsafe.user.id;


    const { data: userStatus, refetch: refetchUserStatus } = useQuery(['userStatus', userId], async () => {
        const response = await axios.get(`https://38.180.23.221:3000/api/users/status/${userId}`);
        return response.data;
    });

    const claimAchievement = useMutation(
        async ({ rewardType }) => {
            const response = await axios.post(`https://38.180.23.221:3000/api/farming/claimAchievement`, { id: userId, rewardType });
            return response.data;
        },
        {
            onSuccess: () => {
                refetchUserStatus(); // Refresh user status after claiming reward
            },
        }
    );

    const getRewardClass = (rewardType, requiredReferrals) => {
        if (!userStatus) {
            return '';
        }

        if (userStatus.rewardsClaimed.includes(rewardType)) {
            return 'active';
        } else if (
            (rewardType.includes('premium') && userStatus.premiumReferrals >= requiredReferrals) ||
            (rewardType.includes('regular') && userStatus.regularReferrals >= requiredReferrals)
        ) {
            return 'canGet';
        } else {
            return '';
        }
    };

    const handleClaimReward = (rewardType) => {
        const rewardClass = getRewardClass(rewardType, parseInt(rewardType.split('_')[0]));
        if (rewardClass === 'canGet') {
            claimAchievement.mutate({ rewardType });
            const rewardAmounts = {
                '10_regular': 100,
                '20_regular': 200,
                '50_regular': 500,
                '100_regular': 1000,
                '10_premium': 100,
                '20_premium': 200,
                '50_premium': 500,
                '100_premium': 1000
            };
            setBalance(prevBal => prevBal + rewardAmounts[rewardType]);
        }
    };

    useEffect(() => {
        refetchUserStatus();
    }, [refetchUserStatus]);

    if (!userStatus) {
        return <p>Loading...</p>;
    }

    return (
        <div className="Achivment">
            <h2>Invite bonus</h2>
            <ul>
                <li>
                    <div className='infoContainer'>
                        <div>
                            <img src={FrendPlus} alt="" />
                            <p>Invite frens</p>
                        </div>
                        <span>{userStatus.regularReferrals}</span>
                    </div>
                    <ul>
                        <li className={getRewardClass('10_regular', 10)} onClick={() => handleClaimReward('10_regular')}>
                            <img className='money' src={Money100} alt="" />
                            <span><img src={FrendPlus} alt="" /> 10</span>
                        </li>
                        <li className={getRewardClass('20_regular', 20)} onClick={() => handleClaimReward('20_regular')}>
                            <img className='money' src={Money200} alt="" />
                            <span><img src={FrendPlus} alt="" /> 20</span>
                        </li>
                        <li className={getRewardClass('50_regular', 50)} onClick={() => handleClaimReward('50_regular')}>
                            <img className='money' src={Money500} alt="" />
                            <span><img src={FrendPlus} alt="" /> 50</span>
                        </li>
                        <li className={getRewardClass('100_regular', 100)} onClick={() => handleClaimReward('100_regular')}>
                            <img className='money' src={Money1000} alt="" />
                            <span><img src={FrendPlus} alt="" /> 100</span>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className='infoContainer'>
                        <div>
                            <img src={frendPrem} alt="" />
                            <p>Invite frens</p>
                        </div>
                        <span>{userStatus.premiumReferrals}</span>
                    </div>
                    <ul>
                        <li className={getRewardClass('10_premium', 10)} onClick={() => handleClaimReward('10_premium')}>
                            <img className='money' src={Money100} alt="" />
                            <span><img src={FrendPlus} alt="" /> 10</span>
                        </li>
                        <li className={getRewardClass('20_premium', 20)} onClick={() => handleClaimReward('20_premium')}>
                            <img className='money' src={Money200} alt="" />
                            <span><img src={FrendPlus} alt="" /> 20</span>
                        </li>
                        <li className={getRewardClass('50_premium', 50)} onClick={() => handleClaimReward('50_premium')}>
                            <img className='money' src={Money500} alt="" />
                            <span><img src={FrendPlus} alt="" /> 50</span>
                        </li>
                        <li className={getRewardClass('100_premium', 100)} onClick={() => handleClaimReward('100_premium')}>
                            <img className='money' src={Money1000} alt="" />
                            <span><img src={FrendPlus} alt="" /> 100</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
