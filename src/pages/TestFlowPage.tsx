import TestPage from './TestPage';
import TestResultPage from './TestResultPage';
import {useState} from 'react';
import {steps} from '../constant';

const TestFlowPage = () => {
  const [step, setStep] = useState(0);

  return (
    <div>
      {step < steps.length ? (
        <TestPage
          step={step}
          onNext={() => setStep(step + 1)}
          onPrev={() => setStep(step - 1)}
        />
      ) : (
        <TestResultPage />
      )}
    </div>
  );
};

export default TestFlowPage;
