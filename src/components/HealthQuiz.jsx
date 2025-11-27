import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Sparkles, ArrowRight, RefreshCw } from 'lucide-react';

const HealthQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState('');

  const questions = [
    {
      id: 'lifestyle',
      question: 'How would you describe your lifestyle?',
      options: [
        { value: 'very-active', label: 'Very Active - Exercise 5+ days/week' },
        { value: 'moderately-active', label: 'Moderately Active - Exercise 2-4 days/week' },
        { value: 'lightly-active', label: 'Lightly Active - Occasional exercise' },
        { value: 'sedentary', label: 'Sedentary - Mostly sitting' }
      ]
    },
    {
      id: 'diet',
      question: 'What best describes your diet?',
      options: [
        { value: 'vegan', label: 'Vegan/Plant-based' },
        { value: 'vegetarian', label: 'Vegetarian' },
        { value: 'balanced', label: 'Balanced omnivore' },
        { value: 'limited', label: 'Limited variety' }
      ]
    },
    {
      id: 'goals',
      question: 'What are your main wellness goals?',
      options: [
        { value: 'energy', label: 'Boost energy and reduce fatigue' },
        { value: 'immunity', label: 'Strengthen immune system' },
        { value: 'general', label: 'Overall health maintenance' },
        { value: 'specific', label: 'Address specific deficiencies' }
      ]
    }
  ];

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [questions[step].id]: value });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      generateRecommendation();
    }
  };

  const generateRecommendation = () => {
    // Mock AI recommendation - will be replaced with actual API call
    const recommendations = {
      'very-active': 'Your active lifestyle means you need robust nutritional support. Frandy\'s B-Complex vitamins are perfect for energy metabolism and muscle recovery.',
      'vegan': 'As a plant-based eater, you\'ll love that Frandy is 100% vegan and provides essential vitamins that can be harder to get from plants alone, like B12 and D3.',
      'energy': 'Frandy\'s comprehensive B-vitamin complex and iron support are specifically designed to combat fatigue and boost natural energy levels throughout your day.',
      'immunity': 'With Vitamins C, D3, and Zinc, Frandy provides the immune-supporting nutrients your body needs to stay healthy year-round.',
      'default': 'Based on your lifestyle, Frandy Berry Blast gummies are an excellent choice! Our complete multivitamin formula with 15 essential nutrients will support your daily wellness goals.'
    };

    const primaryAnswer = answers.lifestyle || answers.diet || answers.goals || 'default';
    const recommendation = recommendations[primaryAnswer] || recommendations.default;

    setAiRecommendation(recommendation);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setShowResult(false);
    setAiRecommendation('');
  };

  if (showResult) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-3xl mx-auto border-2 shadow-xl">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center mx-auto">
                <Sparkles className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-3xl md:text-4xl font-bold" style={{ color: '#1e1919' }}>
                AI Recommendation: Frandy is Perfect for You!
              </h3>

              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6">
                <p className="text-lg leading-relaxed" style={{ color: '#1e1919' }}>
                  {aiRecommendation}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  onClick={() => document.getElementById('preorder-section').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-8 py-6 text-lg"
                >
                  Pre-Order Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="px-8 py-6 text-lg"
                >
                  <RefreshCw className="mr-2 w-5 h-5" />
                  Take Quiz Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">AI-Powered Health Quiz</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1e1919' }}>
          Is Frandy Right for You?
        </h2>
        <p className="text-xl" style={{ color: '#736c64' }}>
          Answer 3 quick questions and get personalized AI recommendations
        </p>
      </div>

      <Card className="max-w-2xl mx-auto border-2 shadow-xl">
        <CardContent className="p-8 md:p-12">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold" style={{ color: '#736c64' }}>
                Question {step + 1} of {questions.length}
              </span>
              <span className="text-sm font-semibold" style={{ color: '#61525a' }}>
                {Math.round(((step + 1) / questions.length) * 100)}% Complete
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-pink-600 transition-all duration-500"
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-8" style={{ color: '#1e1919' }}>
            {questions[step].question}
          </h3>

          <RadioGroup value={answers[questions[step].id]} onValueChange={handleAnswer}>
            <div className="space-y-4">
              {questions[step].options.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-red-300 hover:bg-red-50 ${answers[questions[step].id] === option.value
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200'
                    }`}
                  onClick={() => handleAnswer(option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label
                    htmlFor={option.value}
                    className="flex-1 cursor-pointer text-base font-medium"
                    style={{ color: '#1e1919' }}
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleNext}
              disabled={!answers[questions[step].id]}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-8 py-6 text-lg"
            >
              {step < questions.length - 1 ? 'Next Question' : 'Get AI Recommendation'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthQuiz;
