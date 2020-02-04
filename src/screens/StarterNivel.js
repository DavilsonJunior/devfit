import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
    flex:1;
    align-items:center;
    background-color:#FFF;
    padding-left:20px;
    padding-right:20px;
    padding-top:50px;
`;
const HeaderText = styled.Text`
    font-size:16px;
    color:#333;
    text-align:center;
    margin-bottom:30px;
`;
const BoldText = styled.Text`
    font-weight:bold;
`;
const NextButton = styled.Button``;
const LevelArea = styled.View`
    width:100%;
`;

const Page = (props) => {

    const setMyLevel = (l) => {
        props.setLevel(l);
        props.navigation.setParams({level:l});
    }  

    let funnyPhrase = '';
    switch(props.workoutDays.length) {
        case 1:
            funnyPhrase = 'Só 1 dia não vai adiantar muito, mas...';
            break;
        case 2:
            funnyPhrase = '2 dias eu acho pouco, mas quem sou pra julgar?';    
            break;
        case 3:
            funnyPhrase = 'Legal, 3 dias dá pro gasto';
            break;
        case 4:
            funnyPhrase = 'Legal 4 dias vai ser TOP';
            break;
        case 5:
            funnyPhrase = 'É isso aí, 5 dias é o minimo, lets go';
            break;
        case 6:
            funnyPhrase = 'É, 6 dias não é para todo mundo...';
            break;
        case 7:
            funnyPhrase = 'Wooow! Todo dia?! WTF?!';
            break;                    
    }

    return (
        <Container>
            <HeaderText>{funnyPhrase}</HeaderText>
            <HeaderText><BoldText>Qual seu nível hoje?</BoldText></HeaderText>
            
            <LevelArea>
                <DefaultButton bgcolor={props.level=='beginner'?'#A5E8BC':false} onPress={()=>setMyLevel('beginner')} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Iniciante / Um frango</Text>
                </DefaultButton>
                <DefaultButton bgcolor={props.level=='intermediate'?'#A5E8BC':false} onPress={()=>setMyLevel('intermediate')} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Intermediario / Me viro bem</Text>
                </DefaultButton>
                <DefaultButton bgcolor={props.level=='advanced'?'#A5E8BC':false} onPress={()=>setMyLevel('advanced')} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Avançado / Primo do The Rock</Text>
                </DefaultButton>
            </LevelArea>
        </Container>
    );
}

Page.navigationOptions = ({navigation}) => {

    const nextAction = () => {
        if(!navigation.state.params || !navigation.state.params.level) {
            alert("Voce precisa escolher uma opção.");
            return;
        }
        navigation.navigate('StarterRecommendations');
    }
    
    
    return {
        title:'',
        headerRight:<NextButton title="Proximo" onPress={nextAction} />,
        headerRightContainerStyle:{
            marginRight:10
        }
    }
}


const mapStateToProps = (status) => {
    return {
        level:status.auth.level,
        workoutDays:status.auth.workoutDays
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLevel:(level)=>dispatch({type:'SET_LEVEL', payload:{level}}),
        setWorkoutDays:(workoutDays)=>dispatch({type:'SET_WORKOUTDAYS', payload:{workoutDays}})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Page);
