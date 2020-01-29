import React, { Component } from 'react'
import * as Styles from './styles'

export default class User extends Component {
    render() {
        const { navigation } = this.props
        const perfil = navigation.getParam('perfil')

        return (
            <Styles.Container>
                <Styles.Usuario>
                    <Styles.Avatar source={{ uri: perfil.avatar_url }} />
                    <Styles.Name>{perfil.name}</Styles.Name>
                    <Styles.Bio>{perfil.bio}</Styles.Bio>
                </Styles.Usuario>
            </Styles.Container>
        )
    }
}

User.navigationOptions = {
    title: 'Usuários'
}