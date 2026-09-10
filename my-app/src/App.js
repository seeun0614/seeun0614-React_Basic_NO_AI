import { useState } from 'react';

//제목 컴포넌트 / 문제 배경 컴포넌트 / 문제 제시 컴포넌트 / 답안 선택 컴포넌트 / 


function ShowQuizTitle () {
  return(
    <h2>Frontend Developer Roadmap Project #1</h2>
  );
}

function QuizBackground () {
  return (
    <div className="quizbackground">
      <QuizProblems></QuizProblems>
    </div>
  )
}

function QuizProblems (){
  const [problemIndex, setProblemIndex] = useState(0);
  const mockProblems = ["리액트에서 컴포넌트의 성능을 최적화 하는데 사용되는 훅은?", "HTML, CSS와 함께 웹 페이지를 동적으로 만들기 위해 사용하는 프로그래밍 언어는?", "내가 키우는 강아지 이름은?"];
  const mockAnswers = [{a1:"useState()", a2:"useEffect()", a3:"useMemo()", a4:"useContext()", answer:"a3"}, {a1:"C", a2:"C++", a3:"Java", a4:"JavaScript", answer:"a4"}, {a1:"코니", a2:"초코", a3:"브라우니", a4:"해피", answer:"a1"}]
  function handleClick(){
    if (problemIndex <= 1) {
      setProblemIndex( i => i+1 );
    }
  }
  return(
    <div>
      <div>
        {mockProblems[problemIndex]}
      </div>
      <div>
        <QuizAnswerButtons problemIndex= {problemIndex} answers={mockAnswers} onClick={()=>handleClick()}/>
      </div>
    </div>
  )
}

function QuizAnswerButtons (props){
  const answers = props.answers;
  return (
    <>
      <button onClick={props.onClick}>{answers[props.problemIndex].a1}</button>
      <button onClick={props.onClick}>{answers[props.problemIndex].a2}</button>
      <button onClick={props.onClick}>{answers[props.problemIndex].a3}</button>
      <button onClick={props.onClick}>{answers[props.problemIndex].a4}</button>
    </>
    
  )
}




export default function App(){
  return (
    <>
      <div>
        <ShowQuizTitle/>
      </div>
      <div>
        <QuizBackground/>
      </div>
    </>
    
  );
}