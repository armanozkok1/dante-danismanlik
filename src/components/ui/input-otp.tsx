"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InputOTPContextValue {
  value: string;
  maxLength: number;
  focusedIndex: number | null;
  setFocusedIndex: (index: number | null) => void;
  disabled?: boolean;
  onSlotInput: (index: number, char: string) => void;
  onSlotKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSlotPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
}

const InputOTPContext = React.createContext<InputOTPContextValue | null>(null);

function useInputOTP() {
  const context = React.useContext(InputOTPContext);
  if (!context) {
    throw new Error("useInputOTP must be used within an InputOTP provider");
  }
  return context;
}

export interface InputOTPProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  maxLength?: number;
  disabled?: boolean;
  autoFocus?: boolean;
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = "",
      onChange,
      onComplete,
      maxLength = 6,
      disabled = false,
      autoFocus = false,
      children,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const value = isControlled ? controlledValue : uncontrolledValue;

    const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const updateValue = React.useCallback(
      (nextValue: string) => {
        const sliced = nextValue.slice(0, maxLength);
        if (!isControlled) {
          setUncontrolledValue(sliced);
        }
        onChange?.(sliced);
        if (sliced.length === maxLength) {
          onComplete?.(sliced);
        }
      },
      [isControlled, maxLength, onChange, onComplete]
    );

    const onSlotInput = React.useCallback(
      (index: number, char: string) => {
        if (disabled) return;
        const chars = value.split("");
        chars[index] = char;
        const nextValue = chars.join("");
        updateValue(nextValue);

        // Move to next slot
        if (index < maxLength - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      },
      [disabled, maxLength, updateValue, value]
    );

    const onSlotKeyDown = React.useCallback(
      (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return;

        if (e.key === "Backspace") {
          e.preventDefault();
          const chars = value.split("");
          if (chars[index]) {
            chars[index] = "";
            updateValue(chars.join(""));
          } else if (index > 0) {
            chars[index - 1] = "";
            updateValue(chars.join(""));
            inputRefs.current[index - 1]?.focus();
          }
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          if (index > 0) {
            inputRefs.current[index - 1]?.focus();
          }
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          if (index < maxLength - 1) {
            inputRefs.current[index + 1]?.focus();
          }
        } else if (e.key === "Delete") {
          e.preventDefault();
          const chars = value.split("");
          chars[index] = "";
          updateValue(chars.join(""));
        }
      },
      [disabled, maxLength, updateValue, value]
    );

    const onSlotPaste = React.useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (disabled) return;
        const pastedData = e.clipboardData.getData("text/plain").trim();
        if (!pastedData) return;
        updateValue(pastedData);
        const nextFocusIndex = Math.min(pastedData.length, maxLength - 1);
        inputRefs.current[nextFocusIndex]?.focus();
      },
      [disabled, maxLength, updateValue]
    );

    React.useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, [autoFocus]);

    return (
      <InputOTPContext.Provider
        value={{
          value,
          maxLength,
          focusedIndex,
          setFocusedIndex,
          disabled,
          onSlotInput,
          onSlotKeyDown,
          onSlotPaste,
          inputRefs,
        }}
      >
        <div
          ref={ref}
          className={cn("flex items-center gap-2 has-[:disabled]:opacity-50", className)}
          {...props}
        >
          {children}
        </div>
      </InputOTPContext.Provider>
    );
  }
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

export interface InputOTPSlotProps
  extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const {
      value,
      focusedIndex,
      setFocusedIndex,
      disabled,
      onSlotInput,
      onSlotKeyDown,
      onSlotPaste,
      inputRefs,
    } = useInputOTP();

    const char = value[index] || "";
    const isFocused = focusedIndex === index;

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 items-center justify-center border-y border-r border-border text-sm font-medium transition-all first:rounded-l-lg first:border-l last:rounded-r-lg bg-background",
          isFocused && "z-10 ring-2 ring-ring ring-offset-background border-ring",
          disabled && "cursor-not-allowed bg-muted/40",
          className
        )}
        {...props}
      >
        <input
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={char}
          disabled={disabled}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          onChange={(e) => {
            const nextChar = e.target.value.slice(-1);
            onSlotInput(index, nextChar);
          }}
          onKeyDown={(e) => onSlotKeyDown(index, e)}
          onPaste={onSlotPaste}
          className="absolute inset-0 h-full w-full opacity-0 cursor-default disabled:cursor-not-allowed"
          aria-label={`Digit ${index + 1}`}
        />
        {char}
        {isFocused && !char && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-pulse bg-foreground" />
          </div>
        )}
      </div>
    );
  }
);
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn("flex items-center text-muted-foreground px-1 text-sm font-bold", className)}
    {...props}
  >
    -
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
