import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const formatColors = (input) => {
  if(typeof input !== 'object') return input;
  if(input.hasOwnProperty('value')) {
    return {
      "$type": "color",
      "$value": input.value
    };
  }
  let res = {};
  for(let key in input) {
    res[key] = formatColors(input[key]);
  }
  return res;
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const TextArea = styled.textarea`
  width: 50%;
  height: 100%;
`;

const PreContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Pre = styled.pre`
  width: 100%;
  height: 85%;
  overflow: auto;
`;

const CopyButton = styled.button`
  margin: 10px;
`;

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const outputRef = useRef(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      const formatted = formatColors(parsed);
      setOutput(JSON.stringify(formatted, null, 2));
    } catch(err) {
      setOutput('Erreur: Entrée JSON invalide');
    }
  };

  const handleCopyClick = () => {
    if (outputRef.current) {
      navigator.clipboard.writeText(outputRef.current.textContent)
        .then(() => alert('JSON copié dans le presse-papiers'))
        .catch(err => alert('Erreur lors de la copie :', err));
    }
  };

  return (
    <Container>
      <TextArea value={input} onChange={handleInputChange} placeholder="Entrez le JSON ici"></TextArea>
      <PreContainer>
        <Pre ref={outputRef}>{output}</Pre>
        <CopyButton onClick={handleCopyClick}>Copier le JSON</CopyButton>
      </PreContainer>
    </Container>
  );
}

export default App;
