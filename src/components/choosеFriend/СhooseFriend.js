import bridge from '@vkontakte/vk-bridge';
import { useState, useEffect, useRef } from 'react';
import {
    Panel,
    Button,
    Div,
    Avatar,
    HorizontalCell
} from '@vkontakte/vkui';
import { ProgressBar } from '../progressBar/ProgressBar.js';
import './ChooseFriend.css';

export function ChooseFriend(id) {
    const [fetchedFriend, setFriend] = useState([]);
    const [isPressed, setIsPressed] = useState(false);
    const [completed, setCompleted] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [status, setStatus] = useState(null);


    const fetchFriends = async () => {

        try {
            const friend = await bridge.send('VKWebAppGetFriends');
            setDisabled(false);
            setStatus('');
            setCompleted(0);
            setTimeout(() => {
                setFriend(friend.users[0]);
            }, 300);
        } catch (error) {
            console.log(error);
        }
    };


    const loader = () => {
        setDisabled(true);
        setIsPressed(true);
        setCompleted(Math.floor(Math.random() * (100 - 1)));
    };

    useEffect(() => {
        if (completed) {
            setTimeout(() => {
                completed < 50
                    ? setStatus(dontLoveFriend)
                    : setStatus(loveFriend);
            }, 1500);
        }
    }, [completed]);

    const name = fetchedFriend.first_name;
    const validName = name === null || name === undefined;
    const loveFriend = 'этого придется любить больше';
    const dontLoveFriend = 'это больше не наш друг';
    const FriendLies = 'врет, кажись. на 100% можно любить только картошечку';

    return (
        <Div className={'Container'}>
            <Panel id={id}>
                <Div className='Container__choose'>
                    <Div className='Button__position'>
                        <Button
                            className='Button'
                            onClick={fetchFriends}
                            data-to='home'
                            appearance={'positive'}
                            stretched={false}
                            size={'i '}
                            sizey={'regular'}
                        >
                            выбрать друга
                        </Button>
                    </Div>

                    {validName ? null : (
                        <>
                            <Div className='Amount__love'>
                                <h4> {`насколько, ${name} любит котиков`}</h4>
                            </Div>

                            <Div className='Person'>
                                <HorizontalCell size='s' header={name}>
                                    {fetchedFriend.photo_200 ? (
                                        <Avatar src={fetchedFriend.photo_200} />
                                    ) : null}
                                </HorizontalCell>
                            </Div>

                            <Div className='Button__position'>
                                <Button
                                    className='Button'
                                    onClick={loader}
                                    appearance={'positive'}
                                    size={'i'}
                                    stretched={false}
                                    disabled={disabled}
                                >
                                    узнать
                                </Button>
                            </Div>
                            {
                                <ProgressBar
                                    completed={isPressed ? completed : 0}
                                />
                            }
                            {status ? (
                                <Div className='Status'>{status}</Div>
                            ) : null}
                        </>
                    )}
                </Div>
            </Panel>
        </Div>
    );
}
