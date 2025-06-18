
import React from 'react';

interface CourseCreationStepsProps {
  currentStep: number;
  totalSteps?: number;
  stepNames?: string[];
}

const CourseCreationSteps = ({
  currentStep,
  totalSteps = 3,
  stepNames = ['Category', 'Topic & Desc', 'Options']
}: CourseCreationStepsProps) => {
  return (
    <div>
      <div className="flex justify-center mb-2">
        <div className="flex items-center">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <React.Fragment key={index}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${currentStep >= index + 1 
                    ? 'bg-brand-purple text-white' 
                    : 'bg-muted text-muted-foreground'
                  }`}
              >
                {index + 1}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`h-1 w-16 ${
                    currentStep > index + 1 ? 'bg-brand-purple' : 'bg-muted'
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grid w-full max-w-md" style={{ gridTemplateColumns: `repeat(${totalSteps}, 1fr)` }}>
          {stepNames.map((name, index) => (
            <div key={index} className="text-center text-sm font-medium">
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCreationSteps;
