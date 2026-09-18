"use client";

import * as React from "react";
import { Check, ChevronLeft, ChevronRight, Loader2, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export interface StepItem {
  id: string;
  title: string;
  description?: string;
  component: React.ReactNode;
}

export interface MultiStepFormProps {
  steps: StepItem[];
  onComplete?: (formData: Record<string, any>) => Promise<void> | void;
  className?: string;
}

export function MultiStepForm({ steps, onComplete, className }: MultiStepFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = async () => {
    if (isLastStep) {
      setIsSubmitting(true);
      try {
        if (onComplete) {
          await onComplete({});
        }
        setIsCompleted(true);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <Card className={cn("w-full max-w-xl mx-auto border border-border shadow-card", className)}>
        <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 animate-in zoom-in-50 duration-300">
            <Check className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-foreground">İşlem Başarıyla Tamamlandı!</h3>
            <p className="text-sm text-muted-foreground">
              Tüm adımlar başarıyla doğrulandı ve kaydedildi.
            </p>
          </div>
          <Button onClick={handleReset} variant="outline" className="mt-4 gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Yeniden Başlat</span>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full max-w-2xl mx-auto border border-border shadow-card", className)}>
      {/* Üst Adım Başlığı ve İlerleme Göstergesi */}
      <CardHeader className="space-y-6 pb-4">
        {/* Adımlar Barı */}
        <div className="relative flex items-center justify-between w-full">
          {/* Adımlar Arası Çizgi */}
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 h-0.5 bg-muted -z-0" />
          <div
            className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 bg-primary transition-all duration-300 -z-0"
            style={{
              width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
            }}
          />

          {steps.map((step, index) => {
            const isDone = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => {
                    if (index < currentStepIndex) setCurrentStepIndex(index);
                  }}
                  disabled={index > currentStepIndex}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-200 ring-4 ring-background",
                    isDone && "bg-primary text-primary-foreground",
                    isCurrent && "bg-primary text-primary-foreground shadow-md scale-110 ring-primary/20",
                    !isDone && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                >
                  {isDone ? <Check className="h-4 w-4" /> : index + 1}
                </button>
              </div>
            );
          })}
        </div>

        {/* Geçerli Adım Metin Bilgisi */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-semibold text-primary uppercase tracking-wider">
            Adım {currentStepIndex + 1} / {steps.length}
          </div>
          <h2 className="text-lg font-semibold text-foreground">{currentStep?.title}</h2>
          {currentStep?.description && (
            <p className="text-xs text-muted-foreground">{currentStep.description}</p>
          )}
        </div>
      </CardHeader>

      {/* Adım İçeriği */}
      <CardContent className="py-2">
        <div key={currentStep?.id} className="animate-in fade-in-50 duration-200">
          {currentStep?.component}
        </div>
      </CardContent>

      {/* Alt Gezinti Butonları */}
      <CardFooter className="flex items-center justify-between border-t border-border pt-4 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={isFirstStep || isSubmitting}
          className="gap-1.5"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Geri</span>
        </Button>

        <Button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className="gap-1.5"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Kaydediliyor...</span>
            </>
          ) : isLastStep ? (
            <>
              <span>Tamamla</span>
              <Check className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>İleri</span>
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
