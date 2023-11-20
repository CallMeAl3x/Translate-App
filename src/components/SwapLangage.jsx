const SwapLangage = (selectedButtonInput, selectedButtonOutput, VoiceAccentInput, VoiceAccentOutput, setSelectedButtonInput, setSelectedButtonOutput, setVoiceAccentInput, setVoiceAccentOutput, setLangInput, setLangOutput, buttons_input, buttons_output) => {
    const currentInput = selectedButtonInput;
    const currentOutput = selectedButtonOutput;
    const currentVoiceInput = VoiceAccentInput;
    const currentVoiceOutput = VoiceAccentOutput;
  
    // Trouver les boutons correspondants dans les tableaux
    const newInputButton = buttons_output.find(button => button.code === currentOutput);
    const newOutputButton = buttons_input.find(button => button.code === currentInput);
    
    setSelectedButtonInput(currentOutput);
    setSelectedButtonOutput(currentInput);
    setVoiceAccentInput(currentVoiceOutput);
    setVoiceAccentOutput(currentVoiceInput);
    setLangInput(newInputButton.code);
    setLangOutput(newOutputButton.code);
  }

  export default SwapLangage;