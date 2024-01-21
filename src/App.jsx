import { useState } from "react";
import logo from "./assets/logo.svg";
import soundmax from "./assets/icons/sound_max_fill.svg";
import change from "./assets/icons/Horizontal_top_left_main.svg";
import A_Translate from "./assets/icons/Sort_alfa.svg";
import copy from "./assets/icons/Copy.svg";
import { Select } from "flowbite-react";
import SwapLangage from "./components/SwapLangage";

function App() {
  const speakinput = () => {
    window.responsiveVoice.speak(inputValue, VoiceAccentInput);
  };

  const speakoutput = () => {
    window.responsiveVoice.speak(outputValue, VoiceAccentOutput);
  };

  const [selectedButtonInput, setSelectedButtonInput] = useState("fr");
  const [selectedButtonOutput, setSelectedButtonOutput] = useState("en");
  const [VoiceAccentInput, setVoiceAccentInput] = useState("French Female");
  const [VoiceAccentOutput, setVoiceAccentOutput] =
    useState("UK English Female");
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setoutputValue] = useState("");
  const [LangInput, setLangInput] = useState("fr");
  const [LangOutput, setLangOutput] = useState("en");
  const [CountInput, setCountInput] = useState("0");

  const buttons_input = [
    { name: "French", code: "fr", voice: "French Female" },
    { name: "English", code: "en", voice: "UK English Female" },
    { name: "Spanish", code: "es", voice: "Spanish Female" },
    { name: "German", code: "de", voice: "Dutch Female" },
  ];

  const buttons_output = [
    { name: "English", code: "en", voice: "UK English Female" },
    { name: "French", code: "fr", voice: "French Female" },
    { name: "Spanish", code: "es", voice: "Spanish Female" },
    { name: "German", code: "de", voice: "Dutch Female" },
  ];

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setCountInput(event.target.value.length);
  };

  const handleCopyButtonInput = () => {
    navigator.clipboard
      .writeText(inputValue)
      .then(() => {
        console.log("Texte copié avec succès !");
      })
      .catch((err) => {
        console.error("Erreur lors de la copie du texte: ", err);
      });
  };

  const handleCopyButtonOutput = () => {
    navigator.clipboard
      .writeText(outputValue)
      .then(() => {
        console.log("Texte copié avec succès !");
      })
      .catch((err) => {
        console.error("Erreur lors de la copie du texte: ", err);
      });
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };

  const HandleLangInput = (button) => {
    setSelectedButtonInput(button.code);
    setLangInput(button.code);
    setVoiceAccentInput(button.voice);
    console.log("Mise à jour de selectedButtonInput avec :", button.code);
    console.log(`L'accent actuel est '${VoiceAccentInput}'`);
    console.log(`La langue traduite est '${LangInput}'`);
  };

  const HandleLangOutput = (button) => {
    setSelectedButtonOutput(button.code);
    setLangOutput(button.code);
    setVoiceAccentOutput(button.voice);
    console.log(`La langue traduite est '${LangOutput}'`);
  };

  // Fonction pour copier la valeur de l'input dans un autre état lors du clic sur le bouton
  const handleButtonClick = () => {
    if (CountInput < 500) {
      fetch(
        `https://api.mymemory.translated.net/get?q=${inputValue}&langpair=${LangInput}|${LangOutput}`
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setoutputValue(result.responseData.translatedText);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("You have more than 500 characters");
    }
  };

  return (
    <>
      <main className="text-text font-bold font flex flex-col items-center sm:justify-center">
        <div className="fixed top-0 left-0 bg-color"></div>
        <div className="flex justify-center w-full mt-12">
          <img src={logo} alt="" className="flex justify-center" />
        </div>
        <section className="flex-col lg:flex-row ml-auto mr-auto lg:max-w-4xl flex pb-60 sm:gap-4 mt-10 justify-center">
          <article className="flex flex-col items-center border-[0.25px] sm:p-6 sm:mt-6 m-1 p-3 rounded-3xl bg-firstarticle sm:min-w-[40vw] border-nonselected">
            <div
              className="flex flex-col w-fit sm:w-full sm:justify-start sm:flex-row gap-4 text-center justify-center mt-2 sm:ml-4 relative after:content{} sm:items-center 
          sm:flex text-nonselected sm:gap-4 sm:after:w-full after:h-[0.5px] after:bg-nonselected after:top-[150%] after:left-[-2%] after:absolute">
              <p className="text-nonselected mr-3">Detect Language</p>
              {buttons_input.map((button, index) => {
                // Si l'index est inférieur à 2, affichez un bouton
                if (index < 2) {
                  return (
                    <button
                      key={button.code} // Il est préférable d'utiliser button.code si c'est unique
                      className={`px-2 sm:px-4 py-1 sm:py-2 ${
                        selectedButtonInput === button.code
                          ? "bg-nonselected rounded-xl font-medium sm:px-3 sm:py-2 px-1.5 py-1 text-white"
                          : "text-nonselected"
                      }`}
                      onClick={() => HandleLangInput(button)}>
                      {button.name}
                    </button>
                  );
                } else if (index === 2) {
                  // Quand l'index est 2, commencez un `select`
                  return (
                    <Select
                      key="select-lang"
                      id="languages"
                      required
                      className={`px-4 py-2 ${
                        selectedButtonInput === "es" ||
                        selectedButtonInput === "de"
                          ? "bg-nonselected rounded-xl font-medium px-3 py-2 text-white"
                          : "bg-transparent border-none text-nonselected"
                      }`}
                      class="bg-transparent"
                      value={selectedButtonInput}
                      onChange={(e) => {
                        const newLangCode = e.target.value;
                        const button = buttons_input.find(
                          (b) => b.code === newLangCode
                        );
                        HandleLangInput(button);
                      }}>
                      <option value="">Other languages</option>
                      {buttons_input.slice(2).map((optionButton) => (
                        <option
                          key={optionButton.code}
                          value={optionButton.code}
                          className=" bg-transparent text-black">
                          {optionButton.name}
                        </option>
                      ))}
                    </Select>
                  );
                }
              })}
            </div>
            <div className="mt-4 sm:mt-12 w-[100%] sm:w-full items-center">
              <input
                type="text"
                name="text"
                id="text"
                rows={4}
                onKeyDown={handleEnter}
                value={inputValue}
                onChange={handleInputChange}
                className="appearance-none bg-transparent border-none outline-none pb-[30%] text-left p-0 w-full"
              />
            </div>

            <div className="flex sm:w-full sm:justify-end text-nonselected">
              <p>{CountInput}/500</p>
            </div>

            <div className="flex gap-2 justify-between sm:gap-0 mt-4 items-center w-full">
              <div className="flex justify-center gap-[0.5px]">
                <img
                  src={soundmax}
                  alt=""
                  onClick={speakinput}
                  className="h-[40px] w-[40px] ml-2 border-[3px] p-[0.35rem] rounded-xl border-nonselected"
                />
                <img
                  src={copy}
                  alt=""
                  className="h-[40px] w-[40px] ml-2 border-[3px] p-[0.35rem] rounded-xl border-nonselected"
                  onClick={handleCopyButtonInput}
                />
              </div>
              <div
                className="flex justify-center items-center p-4 py-3 px-7 border-nonselected border-1 rounded-xl bg-bgbutton"
                onClick={handleButtonClick}>
                <img src={A_Translate} alt="" className="mr-2 h-[30.5px]" />
                <p className="text-sm cursor-pointer">Translate</p>
              </div>
            </div>
          </article>

          <article className="flex flex-col items-center border-[0.25px] sm:p-6 sm:mt-6 m-1 p-3 rounded-3xl bg-firstarticle sm:min-w-[40vw] border-nonselected">
            <div className="flex flex-col w-fit lg:w-full lg:justify-between lg:flex-row gap-2 text-center justify-center mt-2 lg:ml-4 relative after:content{} lg:items-center sm:flex text-nonselected sm:gap-4 sm:after:w-full after:h-[0.5px] after:bg-nonselected after:top-[150%] after:left-[-2%] after:absolute">
              <div className="flex items-center">
                {buttons_output.map((button, index) => {
                  // Si l'index est inférieur à 2, affichez un bouton
                  if (index < 2) {
                    return (
                      <button
                        key={button.code} // Il est préférable d'utiliser button.code si c'est unique
                        className={`px-3 py-2 ${
                          selectedButtonOutput === button.code
                            ? "bg-nonselected rounded-xl font-medium px-3 py-2 text-white"
                            : "text-nonselected"
                        }`}
                        onClick={() => HandleLangOutput(button)}>
                        {button.name}
                      </button>
                    );
                  } else if (index === 2) {
                    // Quand l'index est 2, commencez un `select`
                    return (
                      <Select
                        key="select-lang"
                        id="languages"
                        required
                        className={`px-3 py-2 ${
                          selectedButtonOutput === "es" ||
                          selectedButtonOutput === "de"
                            ? "bg-nonselected rounded-xl font-medium px-3 py-2 text-white"
                            : "bg-transparent border-none text-nonselected"
                        }`}
                        class="bg-transparent"
                        value={selectedButtonOutput}
                        onChange={(e) => {
                          const newLangCodeOutput = e.target.value;
                          const button = buttons_output.find(
                            (b) => b.code === newLangCodeOutput
                          );
                          HandleLangOutput(button);
                        }}>
                        <option value="">Other languages</option>
                        {buttons_output.slice(2).map((optionButton) => (
                          <option
                            key={optionButton.code}
                            value={optionButton.code}>
                            {optionButton.name}
                          </option>
                        ))}
                      </Select>
                    );
                  }
                })}
              </div>

              <div className="flex justify-center sm:justify-start mr-6 sm:mr-0">
                <img
                  src={change}
                  alt=""
                  onClick={() =>
                    SwapLangage(
                      selectedButtonInput,
                      selectedButtonOutput,
                      VoiceAccentInput,
                      VoiceAccentOutput,
                      setSelectedButtonInput,
                      setSelectedButtonOutput,
                      setVoiceAccentInput,
                      setVoiceAccentOutput,
                      setLangInput,
                      setLangOutput,
                      buttons_input,
                      buttons_output
                    )
                  }
                  className="h-[35px] w-[35px] ml-2 border-[3px] p-[0.35rem] rounded-xl border-nonselected mr-4"
                />
              </div>
            </div>

            <div className="sm:mt-12 h-full pb-[30%] w-[100%] sm:w-full items-center">
              <p className="w-full">{outputValue}</p>
            </div>

            <div className="flex justify-between mt-12 items-center w-full">
              <div className="flex justify-center gap-[0.5px] cursor-pointer">
                <img
                  src={soundmax}
                  onClick={speakoutput}
                  alt=""
                  className="h-[40px] w-[40px] ml-2 border-[3px] p-[0.35rem] rounded-xl border-nonselected"
                />
                <img
                  src={copy}
                  alt=""
                  className="h-[40px] w-[40px] ml-2 border-[3px] p-[0.35rem] rounded-xl border-nonselected cursor-pointer"
                  onClick={handleCopyButtonOutput}
                />
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}

export default App;
