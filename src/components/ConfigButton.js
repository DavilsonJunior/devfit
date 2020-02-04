import React from 'react';
import styled from 'styled-components/native';

const ConfigButtonArea = styled.TouchableHighlight`
    width:30px;
    height:30px;
    justify-content:center;
    align-items:center;
`;
const ConfigButtonImage = styled.Image`
    width:25px;
    height:25px;
`;

export default (props) => {  

    const btnAction = () => {
        props.navigation.navigate('HomeConfig');
    }
    return (
        <ConfigButtonArea underlayColor="transparente" onPress={btnAction}>
            <ConfigButtonImage source={require('../assets/config.png')} />
        </ConfigButtonArea>
    );  
}
