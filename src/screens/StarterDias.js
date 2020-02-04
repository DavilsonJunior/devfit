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
const DaysArea = styled.View`
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:space-between;
`;

const Page = (props) => {

    const toggleDay = (d) => {
        let newWorkoutDays = [...props.workoutDays];
        if(!props.workoutDays.includes(d)) {
            newWorkoutDays.push(d);
        } else {
            newWorkoutDays = newWorkoutDays.filter(i=>i!=d)
        }
        props.setWorkoutDays(newWorkoutDays);
        props.navigation.setParams({workoutDays:newWorkoutDays})
    }

    let firstName = props.name.split(' ')[0];

    return (
        <Container>
            <HeaderText>Opa, <BoldText>{firstName}</BoldText>, tudo bem?</HeaderText>
            <HeaderText>Quais <BoldText>dias da semana</BoldText> você pretende treinar</HeaderText>
            
            <DaysArea>
                <DefaultButton bgcolor={props.workoutDays.includes(1)?'#A5E8BC':false} onPress={()=>toggleDay(1)} width={100} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Segunda</Text>
                </DefaultButton>
                <DefaultButton bgcolor={props.workoutDays.includes(2)?'#A5E8BC':false} onPress={()=>toggleDay(2)} width={100} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Terça</Text>
                </DefaultButton>
                <DefaultButton bgcolor={props.workoutDays.includes(3)?'#A5E8BC':false} onPress={()=>toggleDay(3)} width={100} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Quarta</Text>
                </DefaultButton>
                <DefaultButton bgcolor={props.workoutDays.includes(4)?'#A5E8BC':false} onPress={()=>toggleDay(4)} width={100} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Quinta</Text>
                </DefaultButton>
                <DefaultButton bgcolor={props.workoutDays.includes(5)?'#A5E8BC':false} onPress={()=>toggleDay(5)} width={100} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Sexta</Text>
                </DefaultButton>
                <DefaultButton bgcolor={props.workoutDays.includes(6)?'#A5E8BC':false} onPress={()=>toggleDay(6)} width={100} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Sábado</Text>
                </DefaultButton>
                <DefaultButton bgcolor={props.workoutDays.includes(0)?'#A5E8BC':false} onPress={()=>toggleDay(0)} width={100} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Domingo</Text>
                </DefaultButton>
            </DaysArea>
        </Container>
    );
}

Page.navigationOptions = ({navigation}) => {

    const nextAction = () => {
        if(!navigation.state.params || !navigation.state.params.workoutDays) {
            alert("Voce precisa treinar pelo menos 1 dia");
            return;
        }
        navigation.navigate('StarterNivel');
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
        name:status.auth.name,
        workoutDays:status.auth.workoutDays
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setName:(name)=>dispatch({type:'SET_NAME', payload:{name}}),
        setWorkoutDays:(workoutDays)=>dispatch({type:'SET_WORKOUTDAYS', payload:{workoutDays}})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Page);
