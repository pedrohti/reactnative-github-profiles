import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './pages/Main/Index';
import User from './pages/User/Index';

const Routes = createAppContainer(
	createStackNavigator({
		Main,
		User
	}, {
			headerLayoutPreset: 'center',
			headerBackTitleVisible: 'false',
			defaultNavigationOptions: {
				headerStyle: {
					backgroundColor: '#7159c1',
				},
				headerTintColor: '#FFF',
		}
	})
)

export default Routes