import './App.css'
import '@vkontakte/vkui/dist/vkui.css';
import bridge from '@vkontakte/vk-bridge';
import React, { useState, useEffect } from 'react';
import { ChooseFriend } from './components/choosеFriend/СhooseFriend';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import Home from './components/home/Home';

const App = () => {

	const ROUTES = {
		HOME: 'home',
		CHOOSEFRIEND: 'chooseFriend',
	};

	const MAX_WIDTH = 750;

	const [activePanel, setActivePanel] = useState(ROUTES.HOME);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);


	useEffect(() => {

		async function fetchData() {
			try {
				const user = await bridge.send('VKWebAppGetUserInfo');
				setUser(user);
				setPopout(null);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();

	}, []);


	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol maxWidth={MAX_WIDTH}>
							<View activePanel={activePanel} popout={popout}>
								<Home id={ROUTES.HOME} fetchedUser={fetchedUser} go={go} />
								<ChooseFriend id={ROUTES.CHOOSEFRIEND} activePanel={activePanel} />
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
