import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton';

const BallonTriangle = styled.View`
    width:0;
    height:0;
    borderLeftColor:transparent;
    borderLeftWidth:15;
    borderBottomWidth:15;
    borderBottomColor:#DDD;
    borderRightWidth:15;
    borderRightColor:transparent;
`;
const BallonArea = styled.View`
    width:90%;
    padding:20px;
    background-color:#DDD;
    border-radius:10px;
`;
const BallonBigText = styled.Text`
    font-size:15px;
    align-self:center;
`;
const ButtonText = styled.Text`
    color:#FFF;
    font-weight:bold;
`;
const BallonText = styled.Text`
    font-size:13px;
    align-self:center;
    margin-top:10px;
`;
const Strong = styled.Text`
    font-weight:bold;
`;
export default (props) => {

    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    let thisDate = new Date(today.getFullYear(), props.selectedMonth, props.selectedDay);

    let thisYear = thisDate.getFullYear();
    let thisMonth = thisDate.getMonth() + 1;
    let thisDay = thisDate.getDate();
    thisMonth = (thisMonth<10)?'0'+thisMonth:thisMonth;
    thisDay = (thisDay<10)?'0'+thisDay:thisDay;
    let dFormated = `${thisYear}-${thisMonth}-${thisDay}`;

    let dayOff = false;
    let isToday  = false;
    let isFuture = false;
    let isDone = false;

    if(!props.workoutDays.includes(thisDate.getDay())) {
        dayOff = true;
    } else if(thisDate.getTime() > today.getTime()) {
        isFuture = true;
    } else {
        if(props.dailyProgress.includes(dFormated)) {
            isDone = true;
        } else {
            isDone = false;
        }
    }

    if(thisDate.getTime() == today.getTime()) {
        isToday = true;
    }

    const setDone = () => {
        props.addProgress( dFormated );
    }

    const seUnDone = () => {
        props.delProgress( dFormated );
    }

    const [timeLeft , setTimeLeft] = useState('');

    useEffect(()=>{
        const timerFunction = () => {
            let now = Date.now();
            let endToday = new Date();
            endToday.setHours(23);
            endToday.setMinutes(59);
            endToday.setSeconds(59);
            endToday = endToday.getTime();
            let diff = endToday - now;

            let h = Math.floor(diff / (1000 * 60 * 60));
            let m = Math.floor((diff / (1000 * 60)) - (h * 60));
            let s = Math.floor( (diff / 1000) - (m*60) - ((h*60)*60) );

            h = h<10?'0'+h:h;
            m = m<10?'0'+m:m;
            s = s<10?'0'+s:s;

            setTimeLeft(`${h}h ${m}m ${s}s`);
        }
        let timer = setInterval(timerFunction, 1000);
        timerFunction();

        return ()=>clearInterval(timer)
    }, []);
    return (
        <>
            <BallonTriangle></BallonTriangle>
            <BallonArea>
                {dayOff &&
                    <BallonBigText>Dia de descanso!</BallonBigText>
                }
                {isFuture &&
                    <BallonBigText>Data no futuro</BallonBigText>
                }
                {!dayOff && !isFuture && isDone &&
                    <>
                        <BallonBigText><Strong>Parabens!</Strong> Voce Treinou!</BallonBigText>
                        <DefaultButton underlayColor="#4AC34E" onPress={seUnDone} bgcolor="#4AC34E" style={{marginTop:20}}>
                            <ButtonText>DESMARCAR</ButtonText>
                        </DefaultButton>
                    </>
                }
                {!dayOff && !isFuture && !isDone && !isToday && 
                    <>  
                        <BallonBigText><Strong>Fraco!</Strong> Voce falhou neste dia.</BallonBigText>
                        <DefaultButton underlayColor="#4AC34E" onPress={setDone} bgcolor="#4AC34E" style={{marginTop:20}}>
                            <ButtonText>MARCAR COMO FEITO</ButtonText>
                        </DefaultButton>
                    </>
                }
                {!dayOff && !isFuture && !isDone && isToday && 
                    <>  
                        <BallonBigText><Strong>HOJE TEM TREINO</Strong></BallonBigText>
                        <BallonText>Voce tem {timeLeft} para treinar</BallonText>
                        <DefaultButton underlayColor="#4AC34E" onPress={props.goToWorkout} bgcolor="#4AC34E" style={{marginTop:20}}>
                            <ButtonText>INICIAR TREINO</ButtonText>
                        </DefaultButton>
                    </>
                }
            </BallonArea>
        </>
    );
}