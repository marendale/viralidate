/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import decisionTree from './decision_tree_model.json'; // Adjust the path as necessary
import symptomQuestions from './symptom_questions.json'; // Import the symptom questions
import diseaseUrgency from './disease_urgency.json';
import Navbar from '../navbar/Navbar';
import './Questionnaire.css';

const Questionnaire = () => {
  const [currentNode, setCurrentNode] = useState(decisionTree);
  const [diagnosis, setDiagnosis] = useState('');
  const [urgency, setUrgency] = useState('');

  useEffect(() => {
    // If currentNode has a disease property, we've reached a diagnosis
    if (currentNode.hasOwnProperty('disease')) {
      setDiagnosis(currentNode.disease); // Assuming diagnosis format needs adjustment
      setUrgency(diseaseUrgency[currentNode.disease]);
    }
  }, [currentNode]);

  const handleAnswer = (answer) => {
    const nextNode = answer ? currentNode.yes : currentNode.no;
    setCurrentNode(nextNode);
  };

  // Helper function to get the question for the current symptom
  const getQuestionForSymptom = (symptom) => {
    return symptomQuestions[symptom];
  };

  if (currentNode.hasOwnProperty('disease')) {
    return (
      <div>
        <Navbar />
        <div className="diagnosis-container">
          <h2>Diagnosis:</h2>
          <p className="diagnosis">{diagnosis}</p>
          <h2>Urgency:</h2>
          <p className="urgency">{urgency}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="question">
      <Navbar />
      <div className="question-container">
        <h2>{getQuestionForSymptom(currentNode.symptom)}</h2>
        <button id="sym-button" onClick={() => handleAnswer(true)}>Yes</button>
        <button id="sym-button" onClick={() => handleAnswer(false)}>No</button>
      </div>
    </div>
  );
};

export default Questionnaire;
