import React, { useState } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import HomeMonthScroll from '../components/HomeMonthScroll';
import HomeDaysScroll from '../components/HomeDaysScroll'
import HomeDayStatus from '../components/HomeDayStatus'; 

import ConfigButton from '../components/ConfigButton';

const Container = styled.SafeAreaView`
    align-items:center;
`;
const Legend = styled.View`
    width:90%;
    align-items:flex-start;
    margin-top:30px;
`;
const LegendText = styled.Text`
    color:#555;
`;
const LegendItem = styled.View`
    flex-direction:row;
    align-items:center;
    margin-top:5px;
`;
const LegendBox = styled.View`
    width:15px;
    height:15px;
    background-color:#CCC;
    margin-right:5px;
`;
const Page = function(props) {  
    let today = new Date();

    const [ selectedMonth, setSelectedMonth ] = useState(today.getMonth());
    const [ selectedDay, setSelectedDay ] = useState(today.getDate()) 
        
    return (
        <Container>
            <HomeMonthScroll
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
            />
            <HomeDaysScroll 
                selectedMonth={selectedMonth}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}

                dailyProgress={props.dailyProgress}
                workoutDays={props.workoutDays}
            />
            <HomeDayStatus 
                selectedMonth={selectedMonth}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                dailyProgress={props.dailyProgress}
                workoutDays={props.workoutDays}

                addProgress={props.addProgress}
                delProgress={props.delProgress}
                goToWorkout={()=>props.navigation.navigate('WorkoutStack')}
            />   

            <Legend>
                <LegendText>Legenda:</LegendText>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#B5EEFF'}}></LegendBox>    
                    <LegendText>Hoje</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#B5FFB8'}}></LegendBox>    
                    <LegendText>Treino feito</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#FFB5B5'}}></LegendBox>    
                    <LegendText>Treino perdido</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#F4F4F4', opacity:0.2}}></LegendBox>    
                    <LegendText>Dia de descanso</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox style={{backgroundColor:'#DDD'}}></LegendBox>    
                    <LegendText>Dia futuro</LegendText>
                </LegendItem>    
            </Legend>    
        </Container>
    );
}

Page.navigationOptions = ({navigation}) => {

      return {
        title:'Seu progresso diário',
        headerRight:<ConfigButton navigation={navigation} />,
        headerRightContainerStyle:{
            marginRight:10
        }        
    }
}


const mapStateToProps = (status) => {
    return {
        dailyProgress:status.auth.dailyProgress,
        workoutDays:status.auth.workoutDays
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProgress:(date)=>dispatch({type:'ADD_PROGRESS', payload:{date}}),
        delProgress:(date)=>dispatch({type:'DEL_PROGRESS', payload:{date}}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Page);
