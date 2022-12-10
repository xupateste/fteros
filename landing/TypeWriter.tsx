import * as React from "react";

interface ITypeWriter {
  typingDelay: number;
  erasingDelay: number;
  newTextDelay: number;
  textArray: Array<string>;
  loop: boolean;
}

interface IDelayText {
  text: string;
  delay: number;
}

const TypeWriter: React.FC<ITypeWriter> = ({
  typingDelay,
  erasingDelay,
  newTextDelay,
  textArray,
  loop
}) => {
  const [states, setStates] = React.useState<Array<IDelayText>>([]);
  const [stateIndex, setStateIndex] = React.useState(0);
  const [textContent, setTextContent] = React.useState("");
  const [typing, setTyping] = React.useState(false);

  // compose all text states and their delays and store them in an array
  // i.e. "" => "h" => "ha" => "har" => etc, etc
  const init = React.useCallback(() => {
    // create empty array
    const allStates: Array<IDelayText> = [];
    // iterate over all words
    textArray.forEach(word => {
      // push "h", "ha", etc
      for (let i = 1; i <= word.length; i++)
        allStates.push({
          text: word.substr(0, i),
          delay: typingDelay
        });
      // push "hard", "har", "ha", etc.
      for (let i = word.length - 1; i >= 0; i--)
        allStates.push({
          text: word.substr(0, i),
          delay: i === word.length - 1 ? newTextDelay : erasingDelay
        });
      // push blank text
      allStates.push({ text: "", delay: typingDelay });
    });
    setStates(allStates);
  }, [erasingDelay, typingDelay, newTextDelay, textArray]);

  // call init, exactly once
  React.useEffect(() => {
    init();
  }, [init]);

  // in the beginning, and if stateIndex has changes, set timeout
  // to schedule next text change
  React.useEffect(() => {
    // array not ready yet
    if (states.length === 0) return;
    const delay = states[stateIndex].delay;

    // calculate next states index
    const nextIndex = (stateIndex + 1) % states.length;

    // if final word is fully displayed, stop if loop is false
    const lastWordLength = textArray.slice(-1)[0].length;
    if (nextIndex === states.length - lastWordLength && !loop) return;

    // schedule next state
    const timeout = setTimeout(() => {
      const nextDelay = states[nextIndex].delay;
      setTyping(nextDelay === typingDelay || nextDelay === erasingDelay);
      // update displayed text
      setTextContent(states[stateIndex].text);
      // advance to next text state
      setStateIndex(nextIndex);
    }, delay);

    // cleanup
    return () => clearTimeout(timeout);
  }, [states, stateIndex, erasingDelay, typingDelay, loop, textArray]);

  // if we're typing, don't animate cursor

  return (
    <>
      {textContent}
    </>
  );
};

export default TypeWriter;
