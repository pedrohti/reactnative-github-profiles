import React, { Component } from 'react'
import { Button, Text } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'

import * as Styles from './styles'

export default class Main extends Component {
	state = {
		newUser: '',
		users: []
	}

	async componentDidMount() {
		const users = await AsyncStorage.getItem('users')
		if (users) this.setState({ users: JSON.parse(users) })
	}

	componentDidUpdate(_, prevState) {
		const { users } = this.state
		if(prevState.users != users) AsyncStorage.setItem('users', JSON.stringify(users))
	}

	clearAsyncStorage = async () => {
		AsyncStorage.clear();
		this.setState({users:''})
		console.log("Cleared")
	}

	handleSubmit = async () => {
		try{
			const { newUser, users } = this.state
			const { data } = await api.get(`/users/${newUser}`)
			// const { data } = await api.get(`films/${newUser}`)
			// const { data } = await api.get(`/users/pedrohti`)

			console.log(data)

			const user = {
				login: data.login,
				name: data.name,
				bio: data.bio,
				avatar: data.avatar_url
			}

			// const user = {
			// 	producer: data.producer,
			// 	name: data.title,
			// 	director: data.director,
			// 	data: data.release_date,
			// 	episode: data.episode_id
			// }

			this.setState({
				users: [...users, data],
				newUser:''
			})

			} catch (err) {
				console.warn(err.message)
			}
	}

	handleDelete = user => {
		const { users } = this.state
		users.splice(users.indexOf(user), 1)
		this.setState({users})
	}

	render(){
		const {users} = this.state
		const {navigate} = this.props.navigation

		return(
			<Styles.Container>
				<Styles.Form>
					<Styles.Input
						autoCapitalize='none'
						placeholder='Adicionar o usuário'
						placeholderTextColor='#fff'
						autoCorrect={false}
						onChangeText={txt => this.setState({newUser: txt})}
					/>
					<Button title='add' onPress={() => this.handleSubmit()} />
				</Styles.Form>
				<Button title='ClearStorage' onPress={this.clearAsyncStorage} />
				<Styles.UsersList
					data={users}
					keyExtractor={user => user.login}
					renderItem={({ item }) => (
						<Styles.User>
							<Styles.Avatar source={{ uri: item.avatar_url }} />
							<Styles.Name>{item.name}</Styles.Name>
							<Styles.Bio>{item.bio}</Styles.Bio>
							<Button title='Visualizar Perfil' onPress={() => navigate('User', { perfil: item })} />
							<Button title='Excluir' onPress={() => this.handleDelete(item)} />
						</Styles.User>
						// <Styles.User>
						// 	<Styles.Name>{item.title}</Styles.Name>
						// 	<Styles.Bio>{item.director}</Styles.Bio>
						// 	<Styles.Bio>{item.producer}</Styles.Bio>
						// 	<Styles.Bio>{item.release_date}</Styles.Bio>
						// 	<Button title='Visualizar Perfil' onPress={() => navigate('User', { perfil: item })} />
						// 	<Button title='Excluir' onPress={() => this.handleDelete(item)} />
						// </Styles.User>
					)}
				/>
			</Styles.Container>
		)
	}
}

Main.navigationOptions = {
	title: 'Usuários do Github'
}