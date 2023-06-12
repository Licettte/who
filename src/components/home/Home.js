import React from 'react';
import dino from '../../img/dinoLove.svg';
import { Panel, PanelHeader, Button, Group, Div } from '@vkontakte/vkui';
import './Home.css';

const Home = ({ id, fetchedUser, go }) => {

	return (
		<Div className={'Container'}>
			<Panel id={id}>
				<PanelHeader >
					<h1>..о важном</h1>
				</PanelHeader>
				<Group className={'Container__greeting'} >
					<Div className={'Greeting'}>
						<img className={'Dino__img'} src={dino} alt='green dinosaur' />
						{fetchedUser && (

							<Div className='Greeting__text'>
								<p className='q'> {`привет, ${fetchedUser.first_name}`}</p>
								<p className='q'> сегодня поговорим о важном...</p>
								<p className='q'> насколько твои друзья любят котиков</p>
							</Div>
						)}
					</Div>
				</Group>

				<Div className='Button__position' size={'i '} sizey={'regular'}>
					<Button
						className='Button'
						onClick={go}
						data-to='chooseFriend'
						appearance={'positive'}
						size={'i'}
						stretched={false}
					>
						Поехали
					</Button>
				</Div>
			</Panel>
		</Div>
	);

}
export default Home;
