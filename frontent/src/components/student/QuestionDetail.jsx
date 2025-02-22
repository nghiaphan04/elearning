import React from "react";
import { assets } from '../../assets/assets';

const QuestionDetail = ({
  question,
  questionIndex,
  selectedAnswer,
  onSelect,
  onNext,
  onPrev,
  totalQuestions,
}) => {
  return (
    <div className="border p-4 rounded-md">
      <h2 className="font-semibold text-gray-700 mb-2">
        {questionIndex + 1}. {question.questionText}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {question.options.map((option, i) => (
          <label
            key={i}
            className="flex items-center space-x-2 cursor-pointer p-2 border rounded hover:bg-gray-100"
          >
            <input
              type="radio"
              name={`question-${questionIndex}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onSelect(questionIndex, option)}
              className="w-4 h-4"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      
      <div className="flex justify-between mt-4">
      {/* Nút Previous */}
      <button
        onClick={onPrev}
        disabled={questionIndex === 0}
        className="p-2 bg-gray-300 rounded-full disabled:opacity-50 flex items-center justify-center"
      >   
        <img src={assets.prev_icon} alt="Previous" className="w-6 h-6" />
        Trước
      </button>

      {/* Nút Next */}
      <button
        onClick={onNext}
        disabled={questionIndex === totalQuestions - 1}
        className="p-2 bg-blue-500 text-white rounded-full disabled:opacity-50 flex items-center justify-center"
      >
        Tiếp
        <img src={assets.next_icon} alt="Next" className="w-6 h-6" />      
      </button>
    </div>
    </div>
  );
};

export default QuestionDetail;
